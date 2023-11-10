import { useState, useCallback } from "react";

interface AnalysisState {
    coordinates: Record<string, any>;
    movingAvgValues: Record<string, any>;
    isGoodPosture: boolean;
}

// 초기 상태를 정의할 수 있습니다.
const initialAnalysisState: AnalysisState = {
    coordinates: {},
    movingAvgValues: {},
    isGoodPosture: true
};

export const usePostureAnalysisState = () => {
    const [coordinates, setCoordinates] = useState<AnalysisState["coordinates"]>(
        initialAnalysisState.coordinates
    );
    const [movingAvgValues, setMovingAvgValues] = useState<
        AnalysisState["movingAvgValues"]
    >(initialAnalysisState.movingAvgValues);
    const [isGoodPosture, setIsGoodPosture] = useState<AnalysisState["isGoodPosture"]>(
        initialAnalysisState.isGoodPosture
    );

    // 새로운 좌표와 이동 평균값을 설정하는 함수
    const updateAnalysisState = useCallback(
        (
            newCoordinates: AnalysisState["coordinates"],
            newMovingAvgValues: AnalysisState["movingAvgValues"],
            newIsGoodPosture: AnalysisState["isGoodPosture"]
        ) => {
            console.log("자세 " ,newIsGoodPosture);
            setCoordinates(newCoordinates);
            setMovingAvgValues(newMovingAvgValues);
            setIsGoodPosture(newIsGoodPosture);
        },
        []
    );

    // 상태를 초기화하는 함수
    const resetAnalysisState = useCallback(() => {
        setCoordinates(initialAnalysisState.coordinates);
        setMovingAvgValues(initialAnalysisState.movingAvgValues);
        setIsGoodPosture(initialAnalysisState.isGoodPosture);
    }, []);

    return {
        coordinates,
        movingAvgValues,
        isGoodPosture,
        updateAnalysisState,
        resetAnalysisState,
    };
};
