"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
