import React from "react";

interface AnalyseToggleButtonProps {
  isAnalysing: boolean;
  handleStopAnalyse: () => void; // 분석을 시작
  handleStartAnalyse: () => void; // 분석을 중지
}

export const AnalyseToggleButton: React.FC<AnalyseToggleButtonProps> = ({
  isAnalysing,
  handleStopAnalyse,handleStartAnalyse

}) => (
  <button
    onClick={() => (isAnalysing ? handleStopAnalyse() : handleStartAnalyse())}
    className={`font-bold py-2 px-4 rounded-full mt-8 mb-8 transition-colors duration-200 ${
      isAnalysing
        ? "bg-red-500 hover:bg-red-700"
        : "bg-blue-500 hover:bg-blue-700"
    } text-white`}
  >
    {isAnalysing ? "分析を中断する" : "姿勢を分析する"}
  </button>
);
