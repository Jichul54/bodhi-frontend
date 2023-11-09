import React from "react";

interface AnalyseToggleButtonProps {
  isAnalysing: boolean;
  onToggleAnalyse: () => void; // 분석을 시작하거나 중지하는 함수
}

export const AnalyseToggleButton: React.FC<AnalyseToggleButtonProps> = ({
  isAnalysing,
  onToggleAnalyse,
}) => (
  <button
    onClick={onToggleAnalyse}
    className={`font-bold py-2 px-4 rounded-full mt-8 mb-8 transition-colors duration-200 ${
      isAnalysing
        ? "bg-red-500 hover:bg-red-700"
        : "bg-blue-500 hover:bg-blue-700"
    } text-white`}
  >
    {isAnalysing ? "Stop Analysing" : "Analyse Posture"}
  </button>
);
