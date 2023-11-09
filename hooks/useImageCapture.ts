// useImageCapture.ts
import { useState, useCallback } from "react";

export const useImageCapture = () => {
  const [image, setImage] = useState<Blob | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);

  const startCamera = useCallback(
    async (videoRef: React.RefObject<HTMLVideoElement>) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraStarted(true);
        }
      } catch (error) {
        console.error("Error accessing the camera", error);
      }
    },
    []
  );

const capturePhoto = useCallback(
  (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setImage(blob);
          }
        }, "image/png");
      }
    }
  },
    []
  );

  return { image, setImage, startCamera, capturePhoto, cameraStarted };
};
