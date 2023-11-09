export const startCamera = async (
  videoRef: React.RefObject<HTMLVideoElement>,
  setCameraStarted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setCameraStarted(true);
    }
  } catch (error) {
    console.error("Error accessing the camera", error);
  }
};

export const capturePhoto = (
  videoRef: React.RefObject<HTMLVideoElement>,
  setImage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (videoRef.current) {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setImage(imageData);
    }
  }
};
