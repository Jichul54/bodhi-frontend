"use client";
import React, { useRef, useState } from "react";
import { startCamera, capturePhoto } from "../utils/cameraUtils";
import { StartCameraButton } from "../components/StartCameraButton";
import { StartAnalyseButton } from "../components/StartAnalyseButton";
import { CapturePhotoButton } from "../components/CapturePhotoButton";
import { VideoDisplay } from "../components/VideoDisplay";

const AnalysePosture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleStartAnalyse = () => {
    // 분석 시작 로직을 구현합니다.
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!cameraStarted && (
        <div className="w-full flex justify-evenly px-4 space-x-2">
          <StartCameraButton
            onStartCamera={() => startCamera(videoRef, setCameraStarted)}
          />
          <StartAnalyseButton onStartAnalyse={handleStartAnalyse} />
        </div>
      )}
      {cameraStarted && (
        <div className="w-full flex justify-evenly px-4 space-x-2">
          <CapturePhotoButton
            onCapturePhoto={() => capturePhoto(videoRef, setImage)}
          />
          <StartAnalyseButton onStartAnalyse={handleStartAnalyse} />
        </div>
      )}
      {image && (
        <div className="mt-4">
          <img src={image} alt="Captured" className="rounded-lg shadow-lg" />
        </div>
      )}
      <VideoDisplay videoRef={videoRef} isCameraStarted={cameraStarted} />
    </div>
  );
};

export default AnalysePosture;
