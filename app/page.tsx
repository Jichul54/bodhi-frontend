"use client";
import React, { useRef } from "react";
import { usePostureAnalyser } from "../hooks/usePostureAnalyser";
import { useImageCapture } from "../hooks/useImageCapture";
import { StartCameraButton } from "../components/elements/StartCameraButton";
import { AnalyseToggleButton } from "../components/elements/AnalyseToggleButton";
import { CapturePhotoButton } from "../components/elements/CapturePhotoButton";
import { VideoDisplay } from "../components/elements/VideoDisplay";

const AnalysePosture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { image, setImage, startCamera, capturePhoto, cameraStarted } =
    useImageCapture();
  const { isAnalysing, handleStartAnalyse, handleStopAnalyse } =
    usePostureAnalyser({ image, setImage });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">자세 분석</h1>

      {/* 카메라 허가 */}
      {!cameraStarted && (
        <div className="w-full flex justify-evenly px-4 space-x-2">
          <StartCameraButton onStartCamera={() => startCamera(videoRef)} />
        </div>
      )}

      {/* 화면 캡쳐 -> 분석 시작 */}
      {cameraStarted && !isAnalysing && (
        <div className="w-full flex justify-evenly px-4 space-x-2">
          <CapturePhotoButton onCapturePhoto={() => capturePhoto(videoRef)} />
          {image && (
            <AnalyseToggleButton
              isAnalysing={isAnalysing}
              handleStopAnalyse={handleStopAnalyse}
              handleStartAnalyse={handleStartAnalyse}
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
            handleStopAnalyse={handleStopAnalyse}
            handleStartAnalyse={handleStartAnalyse}
          />
        </div>
      )}

      {/* 캡쳐된 이미지를 표시합니다. */}
      {!isAnalysing && image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Captured"
            className="rounded-lg shadow-lg"
            onLoad={(e) => {
              // 이미지 로딩이 끝나면 해당 이미지의 Object URL을 해제합니다.
              URL.revokeObjectURL((e.target as HTMLImageElement).src);
            }}
          />
        </div>
      )}

      <VideoDisplay videoRef={videoRef} isCameraStarted={cameraStarted} />
    </div>
  );
};

export default AnalysePosture;