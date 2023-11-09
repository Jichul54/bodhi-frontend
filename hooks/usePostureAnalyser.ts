import React, { useState } from "react";

interface UsePostureAnalyserProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const usePostureAnalyser = ({
  image,
  setImage,
}: UsePostureAnalyserProps) => {
  const [isAnalysing, setIsAnalysing] = useState(false);

  const handleStartAnalyse = () => {
    if (image) {
      setIsAnalysing(true);
      // 분석 시작 로직
    }
    setImage(null);
  };

  const handleStopAnalyse = () => {
    setIsAnalysing(false);
    // 분석 중지 로직
  };

  return { isAnalysing, handleStartAnalyse, handleStopAnalyse };
};
