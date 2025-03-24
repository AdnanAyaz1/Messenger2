import React from "react";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
      <div className="border-3 border-blue-600 size-8 rounded-full animate-spin border-b-0 "></div>
    </div>
  );
};

export default LoadingModal;
