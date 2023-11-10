import React, { useState, useCallback, useEffect } from "react";

interface AnalysisState {
  coordinates: Record<string, any>;
  movingAvgValues: Record<string, any>;
  isGoodPosture: boolean;
}

interface UsePostureAnalyserProps {
  image: Blob | null;
  setImage: React.Dispatch<React.SetStateAction<Blob | null>>;
  capturePhoto: (
    videoRef: React.RefObject<HTMLVideoElement>
  ) => Promise<Blob | null>;
  videoRef: React.RefObject<HTMLVideoElement>;
  coordinates: Record<string, any>;
  movingAvgValues: Record<string, any>;
  sendPostureData: (
    image: Blob | null,
    coordinates: Record<string, any>,
    movingAvgValues: Record<string, any>
  ) => Promise<any>;
  updateAnalysisState: (
    newCoordinates: AnalysisState["coordinates"],
    newMovingAvgValues: AnalysisState["movingAvgValues"],
    newIsGoodPosture: AnalysisState["isGoodPosture"]
  ) => void;
  resetAnalysisState: () => void;
  isGoodPosture: boolean;
}

export const usePostureAnalyser = ({
  image,
  setImage,
  capturePhoto,
  videoRef,
  coordinates,
  movingAvgValues,
  sendPostureData,
  updateAnalysisState,
  resetAnalysisState,
}: UsePostureAnalyserProps) => {
  const [isAnalysing, setIsAnalysing] = useState(false);

  const performAnalysis = useCallback(async () => {
    const capturedImage = await capturePhoto(videoRef); // 이미지 캡처
    if (capturedImage != null) {
      // 서버로 이미지와 데이터를 전송하고 결과를 받아옵니다.
      try {
        const data = await sendPostureData(
          capturedImage,
          coordinates,
          movingAvgValues
        );
        console.log("서버 응답:", data);
        console.log("자세:", data.posture_evaluation);

        // 서버로부터 받은 데이터를 상태에 반영합니다.
        updateAnalysisState(
          data.coordinates,
          data.moving_avg_values,
          data.posture_evaluation
        );
      } catch (error) {
        console.error("서버로 데이터를 보내는 중 에러 발생:", error);
      }
    }
  }, [capturePhoto, coordinates, movingAvgValues]);

  // 분석 시작
  useEffect(() => {
    if (isAnalysing) {
      const intervalId = setInterval(() => {
        performAnalysis();
      }, 10000); // 10초마다 분석을 수행합니다.

      // 분석 중지 시 인터벌을 해제합니다.
      return () => clearInterval(intervalId);
    }
  }, [isAnalysing, performAnalysis]);

  const handleStartAnalyse = () => {
    setIsAnalysing(true);
  };

  const handleStopAnalyse = () => {
    setIsAnalysing(false);
    setImage(null);
    resetAnalysisState();
  };

  return { isAnalysing, handleStartAnalyse, handleStopAnalyse };
};
