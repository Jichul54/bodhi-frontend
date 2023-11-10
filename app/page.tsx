"use client";
import React, { useRef } from "react";
import { usePostureAnalyser } from "../hooks/usePostureAnalyser";
import { useImageCapture } from "../hooks/useImageCapture";
import { usePostureDataApi } from "../hooks/usePostureDataApi";
import { usePostureAnalysisState } from "../hooks/usePostureAnalysisState";
import { StartCameraButton } from "../components/elements/StartCameraButton";
import { AnalyseToggleButton } from "../components/elements/AnalyseToggleButton";
import { CapturePhotoButton } from "../components/elements/CapturePhotoButton";
import { VideoDisplay } from "../components/elements/VideoDisplay";

const AnalysePosture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { image, setImage, startCamera, stopCamera, capturePhoto, cameraStarted } =
    useImageCapture();
  
  const {
    coordinates,
    movingAvgValues,
    isGoodPosture,
    updateAnalysisState,
    resetAnalysisState,
  } = usePostureAnalysisState();
  
  const { sendPostureData } = usePostureDataApi({ image, coordinates, movingAvgValues });

  const { isAnalysing, handleStartAnalyse, handleStopAnalyse } =
    usePostureAnalyser({
      image,
      setImage,
      capturePhoto,
      videoRef,
      coordinates,
      movingAvgValues,
      isGoodPosture,
      sendPostureData,
      updateAnalysisState,
      resetAnalysisState,
      stopCamera,
    });


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">姿勢分析</h1>

      {/* カメラ許可 */}
      {!cameraStarted && isGoodPosture && (
        <div className="w-full flex justify-evenly px-4 space-x-2">
          <StartCameraButton onStartCamera={() => startCamera(videoRef)} />
        </div>
      )}

      {/* 画面キャプチャ -> 分析開始 */}
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

      {/* 分析中 -> 分析停止 */}
      {cameraStarted && isAnalysing && (
        <div className="w-full flex justify-evenly px-4 space-x-2 items-center">
          <span className="text-lg font-semibold">
            AIがあなたの姿勢を分析しています...
          </span>
          <AnalyseToggleButton
            isAnalysing={isAnalysing}
            handleStopAnalyse={handleStopAnalyse}
            handleStartAnalyse={handleStartAnalyse}
          />
        </div>
      )}

      {/* ポストチャーが修正された場合 -> カメラ再開 */}
      {!isAnalysing && !cameraStarted && !isGoodPosture && (
        <div className="w-full flex justify-evenly px-4 space-x-2 items-center">
          <span className="text-lg font-semibold">
            姿勢が崩れました。姿勢を正しましょう！
          </span>
          <StartCameraButton
            onStartCamera={() => {
              resetAnalysisState();
              setImage(null);
              startCamera(videoRef);
            }}
          />
        </div>
      )}

      {/* キャプチャされた画像を表示 */}
      {!isAnalysing && image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Captured"
            className="rounded-lg shadow-lg"
            onLoad={(e) => {
              // 画像の読み込みが完了したら、その画像のObject URLを解除します。
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