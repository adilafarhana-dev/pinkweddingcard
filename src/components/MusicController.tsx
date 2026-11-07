"use client";

import React, { useState } from "react";
import { Volume2, Music } from "lucide-react";
import { audioEngine } from "./AudioEngine";

export default function MusicController() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const active = audioEngine.toggleMusic();
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] select-none pointer-events-auto">
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
        className="group relative w-11 h-11 rounded-full bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] border border-goldFoil/50 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-charcoal-ink"
      >
        {/* Subtle Gold Outer Ring Glow */}
        <div className="absolute inset-0 rounded-full border border-goldFoil/30 animate-pulse pointer-events-none" />

        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-goldFoil-dark" />
            {/* Animated mini sound wave dot */}
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-goldFoil animate-ping" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            <Music className="w-5 h-5 text-charcoal-muted group-hover:text-goldFoil-dark transition-colors" />
          </div>
        )}
      </button>
    </div>
  );
}
