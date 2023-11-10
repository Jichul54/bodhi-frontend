import React, { useState, useCallback, useEffect } from "react";

interface UsePostureAnalyserProps {
  image: Blob | null;
  setImage: React.Dispatch<React.SetStateAction<Blob | null>>;
  capturePhoto: (
    videoRef: React.RefObject<HTMLVideoElement>
  ) => Promise<Blob | null>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const usePostureAnalyser = ({
  image,
  setImage,
  capturePhoto,
  videoRef,
}: UsePostureAnalyserProps) => {
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [movingAvgValues, setMovingAvgValues] = useState({});

  // 서버로 이미지와 관련 데이터를 전송하는 로직
  const sendPostureData = async (
    image: string | Blob,
    coordinates: {},
    movingAvgValues: {}
  ) => {
    // 서버로 이미지와 관련 데이터를 전송하는 로직
    const formData = new FormData();
    formData.append("file", image); // Assuming image is already a Blob
    formData.append(
      "data",
      JSON.stringify({
        coordinates: coordinates,
        moving_avg_values: movingAvgValues,
      })
    );

    // 서버로부터 응답을 받아옵니다.
    try {
      const response = await fetch("http://localhost:8000/analyze_posture", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server response error: ${response.status}`);
      }

      // Process the response data
      return await response.json();
    } catch (error) {
      console.error("Error sending data to the server:", error);
      throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 합니다.
    }
  };

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
        setCoordinates(data.coordinates);
        setMovingAvgValues(data.movingAvgValues);
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
      }, 10000);

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
    setCoordinates({});
    setMovingAvgValues({});
  };

  return { isAnalysing, handleStartAnalyse, handleStopAnalyse };
};
