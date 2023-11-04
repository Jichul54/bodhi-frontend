"use client";
import React, { useRef, useCallback, useState, useEffect } from "react";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  // Todo: coordinates와 movingAvgValues의 메모리 관리
  // 축적된 값은 필요 없으므로 메모리에서 제거해야 합니다
  // 기존 이동평균값과 새로운 이동평균값만 필요합니다
  const [coordinates, setCoordinates] = useState({});
  const [movingAvgValues, setMovingAvgValues] = useState({});

  // 상태 업데이트 후에 실행되는 useEffect
  useEffect(() => {
    console.log(coordinates, movingAvgValues);
  }, [coordinates, movingAvgValues]);

  const analysePosture = async () => {
    setIsAnalysing(true);

    // 웹캠 이미지 캡처
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        // FormData를 사용해 파일과 데이터를 서버로 전송합니다
        const formData = new FormData();
        formData.append("file", blob, "frame.jpg");
        // coordinates와 moving_avg_values를 JSON 문자열로 변환하여 formData에 추가합니다
        formData.append(
          "data",
          JSON.stringify({
            coordinates: coordinates,
            moving_avg_values: movingAvgValues,
          })
        );

        try {
          // 서버에 이미지 전송
          const response = await fetch(
            "http://localhost:8000/analyze_posture",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error(`Server response error: ${response.status}`);
          }

          // 서버 응답 처리
          const data = await response.json();
          console.log(data);

          setCoordinates(data.coordinates);
          setMovingAvgValues(data.moving_avg_values);
        } catch (error) {
          console.error("Error sending the image to the server", error);
        } finally {
          setIsAnalysing(false); // 분석이 끝났음을 상태로 설정합니다
        }
      }, "image/jpeg");
    } else {
      setIsAnalysing(false); // 분석이 끝났음을 상태로 설정합니다
    }
  };

  const startCamera = useCallback(() => {
    if (navigator.mediaDevices.getUserMedia && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setCameraStarted(true); // 카메라가 시작되었다고 상태를 업데이트합니다.
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
      {!cameraStarted && (
        <button
          onClick={startCamera}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
        >
          📷 Start Camera
        </button>
      )}
      {cameraStarted && (
        <button
          onClick={analysePosture}
          disabled={isAnalysing}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-4 ${
            isAnalysing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isAnalysing ? "Analysing..." : "🔍 Analyse Posture"}
        </button>
      )}
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
