import React from "react";

interface CameraStreamProps {
  ref: React.RefObject<HTMLVideoElement>;
}

const CameraStream: React.FC<CameraStreamProps> = React.forwardRef(
  (props, ref) => (
    <div className="bg-black rounded-lg overflow-hidden shadow-lg">
      <video
        ref={ref}
        width="640"
        height="480"
        autoPlay
        className="max-w-full h-auto"
      />
    </div>
  )
);

export default CameraStream;