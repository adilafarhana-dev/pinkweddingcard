"use client";

import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export default function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <main className="min-h-screen w-full bg-[#FAF5F0] flex flex-col items-center overflow-x-hidden">
      {/* Seamless full-screen responsive container without device simulator frames */}
      <div className="w-full max-w-md sm:max-w-lg mx-auto flex flex-col items-center bg-[#FFFDF9] min-h-screen relative shadow-2xl border-x border-dustyRose-200/40">
        {children}
      </div>
    </main>
  );
}
