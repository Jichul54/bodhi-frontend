import React from "react";

interface AnalyseButtonProps {
  isAnalysing: boolean;
  onClick: () => void;
}

const AnalyseButton: React.FC<AnalyseButtonProps> = ({
  isAnalysing,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-4 ${
      isAnalysing ? "opacity-50" : ""
    }`}
  >
    {isAnalysing ? "Stop Analysing" : "Start Analysing"}
  </button>
);

export default AnalyseButton;