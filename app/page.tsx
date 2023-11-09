"use client";
import React, { useRef, useState } from "react";
import { startCamera, capturePhoto } from "../utils/cameraUtils";
import { StartCameraButton } from "../components/StartCameraButton";
import { CapturePhotoButton } from "../components/CapturePhotoButton";
import { VideoDisplay } from "../components/VideoDisplay";

const AnalysePosture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!cameraStarted && (
        <StartCameraButton
          onStartCamera={() => startCamera(videoRef, setCameraStarted)}
        />
      )}
      {cameraStarted && (
        <CapturePhotoButton
          onCapturePhoto={() => capturePhoto(videoRef, setImage)}
        />
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
