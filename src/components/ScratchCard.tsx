"use client";

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { audioEngine } from "./AudioEngine";

interface ScratchBoxProps {
  label: string;
  value: string;
  subValue?: string;
  isRevealed: boolean;
  onRevealed: () => void;
}

function ScratchBox({ label, value, subValue, isRevealed, onRevealed }: ScratchBoxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const isRevealedRef = useRef(isRevealed);
  isRevealedRef.current = isRevealed;

  // Initialize Canvas Gold Foil Layer
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Draw Gold Foil Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, "#F7E396");
    goldGrad.addColorStop(0.3, "#E5C255");
    goldGrad.addColorStop(0.65, "#CAA035");
    goldGrad.addColorStop(1, "#A87C1D");

    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 18);
    ctx.fill();

    // Stardust Texture Specks
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    for (let i = 0; i < 45; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const rsize = Math.random() * 2 + 0.8;
      ctx.beginPath();
      ctx.arc(rx, ry, rsize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Embossed "✦ Scratch ✦"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 11px 'Montserrat', sans-serif";
    ctx.letterSpacing = "1px";

    // Text Shadow
    ctx.fillStyle = "rgba(74, 52, 7, 0.4)";
    ctx.fillText("✦ Scratch ✦", width / 2, height / 2 + 1);

    // Main Text
    ctx.fillStyle = "#593E08";
    ctx.fillText("✦ Scratch ✦", width / 2, height / 2);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  const checkProgress = () => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;
    const sampleGap = 10 * Math.round(dpr);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    let transparentCount = 0;
    let totalSamples = 0;

    for (let y = 0; y < h; y += sampleGap) {
      for (let x = 0; x < w; x += sampleGap) {
        const index = (y * w + x) * 4;
        if (data[index + 3] < 64) transparentCount++;
        totalSamples++;
      }
    }

    const percent = Math.round((transparentCount / totalSamples) * 100);
    if (percent > 42 && !isRevealedRef.current) {
      onRevealed();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Scratch Box Card */}
      <div
        ref={containerRef}
        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-[0_10px_20px_-5px_rgba(212,175,55,0.35)] border border-goldFoil/30 bg-[#FFFDF9] flex items-center justify-center select-none"
      >
        {/* Revealed Secret Underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EE] text-center">
          <span className="font-playfair font-bold text-2xl sm:text-3xl text-charcoal-ink drop-shadow-sm">
            {value}
          </span>
          {subValue && (
            <span className="font-sans text-[9px] uppercase tracking-wider text-dustyRose-500 font-semibold mt-0.5">
              {subValue}
            </span>
          )}
        </div>

        {/* HTML5 Canvas Gold Foil Overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={(e) => {
            setIsScratching(true);
            scratch(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => {
            if (isScratching) scratch(e.clientX, e.clientY);
          }}
          onMouseUp={() => setIsScratching(false)}
          onMouseLeave={() => setIsScratching(false)}
          onTouchStart={(e) => {
            setIsScratching(true);
            scratch(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (isScratching) scratch(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={() => setIsScratching(false)}
          className={`absolute inset-0 z-10 cursor-pointer touch-none transition-opacity duration-500 rounded-2xl ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>

      {/* Label Beneath (DAY / MONTH / YEAR) */}
      <span className="font-playfair text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#8C6D37] uppercase mt-2.5">
        {label}
      </span>
    </div>
  );
}

export default function ScratchCard() {
  const [revealed, setRevealed] = useState({
    day: false,
    month: false,
    year: false,
  });

  const handleRevealBox = (box: "day" | "month" | "year") => {
    setRevealed((prev) => {
      const next = { ...prev, [box]: true };

      if (next.day && next.month && next.year) {
        setTimeout(() => {
          audioEngine.playCelebrationChime();
          confetti({
            particleCount: 80,
            spread: 85,
            origin: { y: 0.65 },
            colors: ["#D4AF37", "#F5E8C7", "#E8C5C8", "#FFFDF9", "#8B2635"],
            ticks: 180,
            gravity: 0.85,
          });
        }, 200);
      }
      return next;
    });
  };

  const handleRevealAll = () => {
    setRevealed({ day: true, month: true, year: true });
    audioEngine.playCelebrationChime();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#D4AF37", "#F5E8C7", "#E8C5C8", "#FFFDF9"],
    });
  };

  return (
    <section className="relative w-full py-10 px-4 sm:px-6 flex flex-col items-center justify-center bg-[#FFFDF9]">
      {/* Header Matching User Reference Image */}
      <div className="w-full max-w-sm text-center mb-6">
        <h3 className="font-script text-4xl sm:text-5xl text-[#6B1724] tracking-wide">
          The Date
        </h3>
        <p className="font-playfair text-[11px] sm:text-xs tracking-[0.25em] text-[#8C6D37] font-semibold uppercase mt-1">
          ✦ SCRATCH TO REVEAL THE DATE ✦
        </p>
      </div>

      {/* 3-BOX SCRATCH ROW: DAY | MONTH | YEAR */}
      <div className="w-full max-w-[360px] flex items-center justify-center gap-3 sm:gap-4 mb-3">
        <ScratchBox
          label="DAY"
          value="12"
          subValue="Monday"
          isRevealed={revealed.day}
          onRevealed={() => handleRevealBox("day")}
        />

        <ScratchBox
          label="MONTH"
          value="OCT"
          subValue="October"
          isRevealed={revealed.month}
          onRevealed={() => handleRevealBox("month")}
        />

        <ScratchBox
          label="YEAR"
          value="2026"
          subValue="1448 AH"
          isRevealed={revealed.year}
          onRevealed={() => handleRevealBox("year")}
        />
      </div>

      {/* Quick Tap to Reveal Option */}
      {(!revealed.day || !revealed.month || !revealed.year) && (
        <button
          onClick={handleRevealAll}
          type="button"
          className="text-xs text-charcoal-muted hover:text-goldFoil-dark underline font-sans transition-colors mt-2"
        >
          Can&apos;t scratch? Tap to reveal
        </button>
      )}
    </section>
  );
}
