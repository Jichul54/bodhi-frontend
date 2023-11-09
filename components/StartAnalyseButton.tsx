import React from "react";

interface StartAnalyseButtonProps {
  onStartAnalyse: () => void; // 분석을 시작하는 함수
}

export const StartAnalyseButton: React.FC<StartAnalyseButtonProps> = ({
  onStartAnalyse,
}) => (
  <button
    onClick={onStartAnalyse}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 mb-8"
  >
    Analyse Posture
  </button>
);
