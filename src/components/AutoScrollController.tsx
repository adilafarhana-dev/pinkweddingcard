"use client";

import React, { useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface AutoScrollControllerProps {
  isAutoScrolling: boolean;
  onToggle: () => void;
  onStop: () => void;
}

export default function AutoScrollController({
  isAutoScrolling,
  onToggle,
  onStop,
}: AutoScrollControllerProps) {
  const animationFrameRef = useRef<number | null>(null);

  // 60fps Smooth Continuous Downward Glide
  useEffect(() => {
    if (!isAutoScrolling) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const scrollStep = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // When reached bottom of the invitation
      if (window.scrollY >= maxScroll - 4) {
        onStop();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

      // Smooth gentle reading glide: ~1.25 pixels per frame (~75px per second)
      window.scrollBy(0, 1.25);
      animationFrameRef.current = requestAnimationFrame(scrollStep);
    };

    animationFrameRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isAutoScrolling, onStop]);

  // Gentle pause when user touches screen or uses mouse wheel to inspect
  useEffect(() => {
    const handleUserInteraction = () => {
      if (isAutoScrolling) {
        onStop();
      }
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [isAutoScrolling, onStop]);

  return (
    <div
      className="fixed top-4 left-3 sm:top-6 sm:left-6 z-[70] select-none pointer-events-auto"
      onTouchStart={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        onClick={onToggle}
        type="button"
        aria-label={isAutoScrolling ? "Pause Auto Tour" : "Start Auto Tour"}
        className={`group relative flex items-center gap-1.5 py-2 px-3 sm:px-3.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-playfair font-semibold tracking-wider uppercase ${
          isAutoScrolling
            ? "bg-[#D4AF37] text-white border-[#B8861B] shadow-[0_4px_20px_rgba(212,175,55,0.45)] ring-2 ring-[#D4AF37]/50 ring-offset-1"
            : "bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] text-[#2B2325] border-[#D4AF37]/50 shadow-md"
        }`}
      >
        {isAutoScrolling ? (
          <>
            <Pause className="w-3.5 h-3.5 fill-current animate-pulse text-white" />
            <span>Pause Tour</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-[#8C6D37] text-[#8C6D37] group-hover:scale-110 transition-transform" />
            <span>Auto Tour</span>
          </>
        )}
      </button>
    </div>
  );
}
