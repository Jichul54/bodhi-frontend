import React from "react";

interface StartCameraButtonProps {
  onStartCamera: () => void;
}

export const StartCameraButton: React.FC<StartCameraButtonProps> = ({
  onStartCamera,
}) => (
  <button
    onClick={onStartCamera}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 mb-8"
  >
    📷 Start Camera
  </button>
);
