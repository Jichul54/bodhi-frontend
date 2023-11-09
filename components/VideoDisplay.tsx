import React from "react";

interface VideoDisplayProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isCameraStarted: boolean;
}

export const VideoDisplay: React.FC<VideoDisplayProps> = ({
  videoRef,
  isCameraStarted,
}) => (
  <video
    ref={videoRef}
    style={{ display: isCameraStarted ? "block" : "none" }}
    width="640"
    height="480"
    autoPlay
  />
);
