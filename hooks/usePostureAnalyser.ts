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
  stopCamera: (videoRef: React.RefObject<HTMLVideoElement>) => void;
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
  stopCamera,
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

        // 서버로부터 받은 데이터를 상태에 반영합니다.
        updateAnalysisState(
          data.coordinates,
          data.moving_avg_values,
          data.posture_evaluation
        );

        // 자세가 불량할 때 handlePoorPosture 함수 호출
        if (!data.posture_evaluation) {
          handlePoorPosture();
        }
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
      }, 5000); // 5초마다 분석을 수행합니다.

      // 분석 중지 시 인터벌을 해제합니다.
      return () => clearInterval(intervalId);
    }
  }, [isAnalysing, performAnalysis]);

  // Analyse Posture 버튼을 누르면 호출되는 함수
  const handleStartAnalyse = () => {
    setIsAnalysing(true);
  };

  // Stop Analysing 버튼을 누르면 호출되는 함수
  const handleStopAnalyse = () => {
    setIsAnalysing(false);
    setImage(null);
    resetAnalysisState();
  };

  // 자세가 좋지 않을 때 (isGoodPosture = False) 호출되는 함수
  const handlePoorPosture = useCallback(() => {
    // 자세가 불량할 때 실행할 로직
    setIsAnalysing(false);
    stopCamera(videoRef);
  }, []);

  return { isAnalysing, handleStartAnalyse, handleStopAnalyse };
};
