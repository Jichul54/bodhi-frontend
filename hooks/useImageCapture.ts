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
  async (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return new Promise<void>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              setImage(blob);
            }
            resolve(); // 이미지 설정 후 프라미스를 완료합니다.
          }, "image/png");
        });
      }
    }
    // videoRef가 현재 상태가 아니거나 다른 조건으로 인해 조기에 함수가 종료되면,
    // 타입 기대를 만족시키기 위해 여전히 해결된 프라미스를 반환해야 합니다.
    return Promise.resolve();
  },
  [setImage]
);


  return { image, setImage, startCamera, capturePhoto, cameraStarted };
};
