// usePostureAnalyser.ts
import { useState } from "react";

export const usePostureAnalyser = () => {
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleStartAnalyse = () => {
    setIsAnalysing(true);
    setImage(null);
  };

  // 여기에 더 많은 분석 로직을 추가할 수 있습니다.

  return { isAnalysing, image, handleStartAnalyse, setImage };
};
