"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { audioEngine } from "./AudioEngine";

export default function MusicController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTrackInfo, setShowTrackInfo] = useState(false);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const toggleMusic = () => {
    const active = audioEngine.toggleMusic();
    setIsPlaying(active);
    setShowTrackInfo(true);
    setTimeout(() => setShowTrackInfo(false), 3500);
  };

  return (
    <div
      className="fixed top-4 right-3 sm:top-6 sm:right-6 z-[70] select-none pointer-events-auto flex items-center gap-2"
      onTouchStart={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Track info pill on toggle / hover */}
      {showTrackInfo && (
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF9]/95 border border-goldFoil/40 shadow-md backdrop-blur-md text-[11px] font-playfair font-semibold text-charcoal-ink animate-fade-in">
          <span className="text-goldFoil">♫</span>
          <span>Kudmayi Reprise (Female)</span>
        </div>
      )}

      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
        title={isPlaying ? "Mute: Kudmayi Reprise (Female)" : "Play: Kudmayi Reprise (Female)"}
        className="group relative w-11 h-11 rounded-full bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] border border-goldFoil/50 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-charcoal-ink"
      >
        {/* Subtle Gold Outer Ring Glow */}
        <div
          className={`absolute inset-0 rounded-full border border-goldFoil/40 transition-opacity ${
            isPlaying ? "animate-pulse opacity-100" : "opacity-0"
          } pointer-events-none`}
        />

        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-goldFoil-dark animate-pulse" />
            {/* Animated sound wave dot */}
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
