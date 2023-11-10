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

  const stopCamera = useCallback(async (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
      setCameraStarted(false);
    }
  }, []);

  const capturePhoto = useCallback(
    async (
      videoRef: React.RefObject<HTMLVideoElement>
    ): Promise<Blob | null> => {
      if (videoRef.current) {
        const video = videoRef.current;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          return new Promise<Blob | null>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                setImage(blob);
                resolve(blob);
              } else {
                reject(new Error("Unable to capture photo"));
              }
            }, "image/png");
          });
        }
      }
      return Promise.resolve(null);
    },
    []
  );

  return { image, setImage, startCamera, stopCamera, capturePhoto, cameraStarted };
};
