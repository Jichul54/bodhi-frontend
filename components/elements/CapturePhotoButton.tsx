import React from "react";

interface CapturePhotoButtonProps {
  onCapturePhoto: () => void;
}

export const CapturePhotoButton: React.FC<CapturePhotoButtonProps> = ({
  onCapturePhoto,
}) => (
  <button
    onClick={onCapturePhoto}
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-8 mb-8"
  >
    📸 キャプチャー写真を撮る
  </button>
);
