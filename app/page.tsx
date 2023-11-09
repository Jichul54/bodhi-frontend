"use client";
import React, { useRef, useState } from "react";
import { usePostureAnalyser } from "../hooks/usePostureAnalyser";
import { startCamera, capturePhoto } from "../utils/cameraUtils";
import { StartCameraButton } from "../components/StartCameraButton";
import { AnalyseToggleButton } from "../components/AnalyseToggleButton";
import { CapturePhotoButton } from "../components/CapturePhotoButton";
import { VideoDisplay } from "../components/VideoDisplay";

const AnalysePosture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const { isAnalysing, image, handleStartAnalyse, setImage } =
    usePostureAnalyser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">자세 분석</h1>

      {/* 카메라 허가 */}
      {!cameraStarted && (
        <div className="w-full flex justify-evenly px-4 space-x-2">
          <StartCameraButton
            onStartCamera={() => startCamera(videoRef, setCameraStarted)}
          />
        </div>
      )}

      {/* 화면 캡쳐 -> 분석 시작 */}
      {cameraStarted && !isAnalysing && (
        <div className="w-full flex justify-evenly px-4 space-x-2">
          <CapturePhotoButton
            onCapturePhoto={() => capturePhoto(videoRef, setImage)}
          />
          {image && (
            <AnalyseToggleButton
              isAnalysing={isAnalysing}
              onToggleAnalyse={handleStartAnalyse}
            />
          )}
        </div>
      )}

      {/* 분석 중 -> 분석 중지 */}
      {cameraStarted && isAnalysing && (
        <div className="w-full flex justify-evenly px-4 space-x-2 items-center">
          <span className="text-m font-semibold">
            AI가 당신의 자세를 분석 중입니다...
          </span>
          <AnalyseToggleButton
            isAnalysing={isAnalysing}
            onToggleAnalyse={handleStartAnalyse}
          />
        </div>
      )}

      {/* 캡쳐된 이미지를 표시합니다. */}
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