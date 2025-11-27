import React from 'react';

const LoadingSpinner = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lime-500 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
