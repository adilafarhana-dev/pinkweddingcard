"use client";

import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export default function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <main className="min-h-screen w-full bg-[#FFFDF9] flex flex-col items-center overflow-x-hidden">
      {/* True full-screen responsive container: edge-to-edge on mobile, elegantly centered on desktop */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center bg-[#FFFDF9] min-h-screen relative px-0">
        {children}
      </div>
    </main>
  );
}
