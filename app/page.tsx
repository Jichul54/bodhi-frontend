'use client';
import React, { useRef, useCallback } from "react";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = useCallback(() => {
    if (navigator.mediaDevices.getUserMedia && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera", error);
        });
    } else {
      alert("Sorry, your browser does not support accessing the camera.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={startCamera}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
      >
        📷 Start Camera
      </button>
      <div className="bg-black rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          className="max-w-full h-auto"
        ></video>
      </div>
    </div>
  );
};

export default Camera;