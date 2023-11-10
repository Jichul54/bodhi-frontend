import { useCallback } from "react";

interface UsePostureDataApiProps {
  image: Blob|null;
  coordinates: Record<string, any>;
  movingAvgValues: Record<string, any>;
}

export const usePostureDataApi = ({
  image,
  coordinates,
  movingAvgValues,
}: UsePostureDataApiProps) => {
const sendPostureData: (image: Blob|null, coordinates: Record<string, any>, movingAvgValues: Record<string, any>) => Promise<any> = useCallback(async (image, coordinates, movingAvgValues) => {
    const formData = new FormData();
    if (image) {
        formData.append("file", image);
    }
    formData.append(
        "data",
        JSON.stringify({
            coordinates: coordinates,
            moving_avg_values: movingAvgValues,
        })
    );

    try {
      const response = await fetch("http://localhost:8000/analyze_posture", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server response error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending data to the server:", error);
      throw error;
    }
  }, [image, coordinates, movingAvgValues]);

  return {
    sendPostureData,
  };
};
