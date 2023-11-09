import React from "react";

interface CameraControlsProps {
  onStartCamera: () => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({ onStartCamera }) => (
  <button
    onClick={onStartCamera}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
  >
    📷 Start Camera
  </button>
);

export default CameraControls;