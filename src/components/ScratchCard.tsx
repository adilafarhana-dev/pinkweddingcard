"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw } from "lucide-react";

interface ScratchBoxProps {
  label: string;
  value: string;
  subValue?: string;
  isRevealed: boolean;
  onRevealed: () => void;
}

export interface ScratchBoxHandle {
  autoScratch: () => void;
  reset: () => void;
}

const ScratchBox = forwardRef<ScratchBoxHandle, ScratchBoxProps>(function ScratchBox(
  { label, value, subValue, isRevealed, onRevealed },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isAutoScratchingThis, setIsAutoScratchingThis] = useState(false);
  const isRevealedRef = useRef(isRevealed);
  isRevealedRef.current = isRevealed;

  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = container.clientWidth || 98;
    const height = container.clientHeight || 98;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = "source-over";

    // Rich metallic gold foil gradient
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, "#FCEEB5");
    goldGrad.addColorStop(0.25, "#E8C868");
    goldGrad.addColorStop(0.55, "#D4AF37");
    goldGrad.addColorStop(0.8, "#B8861B");
    goldGrad.addColorStop(1, "#8A6412");

    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, 16);
    ctx.fill();

    // Subtle gold border line
    ctx.strokeStyle = "#FFE485";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(1, 1, width - 2, height - 2, 15);
    ctx.stroke();

    // Sparkling stardust specks
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    for (let i = 0; i < 35; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const rsize = Math.random() * 2 + 0.6;
      ctx.beginPath();
      ctx.arc(rx, ry, rsize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Embossed "✦ Scratch ✦" text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 10px 'Montserrat', sans-serif";
    ctx.letterSpacing = "1px";

    ctx.fillStyle = "rgba(60, 42, 6, 0.4)";
    ctx.fillText("✦ Scratch ✦", width / 2, height / 2 + 1);

    ctx.fillStyle = "#543C08";
    ctx.fillText("✦ Scratch ✦", width / 2, height / 2);
  }, []);

  useEffect(() => {
    drawFoil();
  }, [drawFoil]);

  // Expose automatic scratch animation and reset methods
  useImperativeHandle(ref, () => ({
    autoScratch: () => {
      if (isRevealedRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) {
        onRevealed();
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        onRevealed();
        return;
      }

      setIsAutoScratchingThis(true);

      const w = containerRef.current?.clientWidth || 98;
      const h = containerRef.current?.clientHeight || 98;

      ctx.globalCompositeOperation = "destination-out";

      let step = 0;
      const totalSteps = 22; // ~620ms of smooth visible scratching
      const timer = setInterval(() => {
        step++;
        const progress = step / totalSteps;

        // Dynamic zig-zag sweeping brush stroke across the box
        const y = progress * (h * 0.88) + h * 0.06;
        const xOffset = Math.sin(progress * Math.PI * 4) * (w * 0.35);
        const x = w / 2 + xOffset;

        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fill();

        // Extra overlapping circles to ensure clean reveal
        ctx.beginPath();
        ctx.arc(
          x + (Math.random() - 0.5) * 16,
          y + (Math.random() - 0.5) * 16,
          20,
          0,
          Math.PI * 2
        );
        ctx.fill();

        if (step >= totalSteps) {
          clearInterval(timer);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          setIsAutoScratchingThis(false);
          onRevealed();
        }
      }, 28);
    },
    reset: () => {
      drawFoil();
    },
  }));

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
    if (percent > 38 && !isRevealedRef.current) {
      onRevealed();
    }
  };

  return (
    <div className="flex-1 max-w-[105px] min-w-[76px] flex flex-col items-center">
      {/* Scratch Box Card - fluid width with aspect-square */}
      <div
        ref={containerRef}
        className="relative w-full aspect-square max-w-[105px] min-w-[76px] rounded-2xl overflow-hidden shadow-[0_8px_18px_-4px_rgba(212,175,55,0.35)] border border-goldFoil/30 bg-[#FFFDF9] flex items-center justify-center select-none"
      >
        {/* Revealed Secret Underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EE] text-center">
          <span className="font-playfair font-bold text-2xl sm:text-3xl text-charcoal-ink drop-shadow-sm">
            {value}
          </span>
          {subValue && (
            <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-wider text-dustyRose-500 font-semibold mt-0.5">
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

        {/* Active Scratch Sparkle Wand Indicator while auto-scratching */}
        {isAutoScratchingThis && (
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-goldFoil drop-shadow-[0_0_8px_rgba(212,175,55,0.9)] animate-spin" />
          </div>
        )}
      </div>

      {/* Label Beneath (DAY / MONTH / YEAR) */}
      <span className="font-playfair text-[10px] sm:text-xs font-bold tracking-[0.22em] text-[#8C6D37] uppercase mt-2">
        {label}
      </span>
    </div>
  );
});

export interface ScratchCardHandle {
  triggerAutoScratch: () => void;
  resetScratch: () => void;
}

interface ScratchCardProps {
  isEnvelopeOpened?: boolean;
}

const ScratchCard = forwardRef<ScratchCardHandle, ScratchCardProps>(function ScratchCard(
  { isEnvelopeOpened = false },
  ref
) {
  const [revealed, setRevealed] = useState({
    day: false,
    month: false,
    year: false,
  });

  const dayRef = useRef<ScratchBoxHandle | null>(null);
  const monthRef = useRef<ScratchBoxHandle | null>(null);
  const yearRef = useRef<ScratchBoxHandle | null>(null);
  const hasAutoScratchedRef = useRef(false);

  const handleRevealBox = (box: "day" | "month" | "year") => {
    setRevealed((prev) => {
      const next = { ...prev, [box]: true };

      if (next.day && next.month && next.year) {
        setTimeout(() => {
          confetti({
            particleCount: 75,
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
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#D4AF37", "#F5E8C7", "#E8C5C8", "#FFFDF9"],
    });
  };

  // Automated one-by-one scratch sequence: DAY -> MONTH -> YEAR
  const startOneByOneScratch = useCallback(() => {
    if (hasAutoScratchedRef.current) return;
    hasAutoScratchedRef.current = true;

    // 1. Scratch DAY (12)
    setTimeout(() => {
      dayRef.current?.autoScratch();
    }, 300);

    // 2. Scratch MONTH (OCT)
    setTimeout(() => {
      monthRef.current?.autoScratch();
    }, 1200);

    // 3. Scratch YEAR (2026)
    setTimeout(() => {
      yearRef.current?.autoScratch();
    }, 2100);

    // 4. Celebration Confetti
    setTimeout(() => {
      confetti({
        particleCount: 85,
        spread: 85,
        origin: { y: 0.65 },
        colors: ["#D4AF37", "#F5E8C7", "#E8C5C8", "#FFFDF9", "#8B2635"],
        ticks: 180,
        gravity: 0.85,
      });
    }, 2800);
  }, []);

  const resetAllScratch = useCallback(() => {
    hasAutoScratchedRef.current = false;
    setRevealed({ day: false, month: false, year: false });
    dayRef.current?.reset();
    monthRef.current?.reset();
    yearRef.current?.reset();
  }, []);

  useImperativeHandle(ref, () => ({
    triggerAutoScratch: () => {
      startOneByOneScratch();
    },
    resetScratch: () => {
      resetAllScratch();
    },
  }));

  // Fallback trigger if guest scrolls manually into "The Date" (ONLY after envelope is opened)
  useEffect(() => {
    if (!isEnvelopeOpened) return;

    const handleScrollCheck = () => {
      if (hasAutoScratchedRef.current) return;
      const section = document.getElementById("date-scratch-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Only trigger when "The Date" is clearly centered in the middle of the viewport
      if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.35) {
        startOneByOneScratch();
      }
    };

    window.addEventListener("scroll", handleScrollCheck, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollCheck);
  }, [isEnvelopeOpened, startOneByOneScratch]);

  return (
    <section
      id="date-scratch-section"
      className="relative w-full py-10 px-2 sm:px-6 flex flex-col items-center justify-center bg-[#FFFDF9]"
    >
      {/* Header Matching User Reference Image */}
      <div className="w-full max-w-sm text-center mb-5 px-2">
        <h3 className="font-script text-4xl sm:text-5xl text-[#6B1724] tracking-wide">
          The Date
        </h3>
        <p className="font-playfair text-[10px] sm:text-xs tracking-[0.25em] text-[#8C6D37] font-semibold uppercase mt-1">
          ✦ SCRATCH TO REVEAL THE DATE ✦
        </p>
      </div>

      {/* 3-BOX SCRATCH ROW: DAY | MONTH | YEAR - fluid responsive layout */}
      <div className="w-full max-w-[360px] flex items-center justify-center gap-2 sm:gap-3.5 mb-3 px-1">
        <ScratchBox
          ref={dayRef}
          label="DAY"
          value="12"
          subValue="Monday"
          isRevealed={revealed.day}
          onRevealed={() => handleRevealBox("day")}
        />

        <ScratchBox
          ref={monthRef}
          label="MONTH"
          value="OCT"
          subValue="October"
          isRevealed={revealed.month}
          onRevealed={() => handleRevealBox("month")}
        />

        <ScratchBox
          ref={yearRef}
          label="YEAR"
          value="2026"
          subValue="1448 AH"
          isRevealed={revealed.year}
          onRevealed={() => handleRevealBox("year")}
        />
      </div>

      {/* Quick Actions (Tap to reveal if needed / Replay scratch) */}
      <div className="flex items-center gap-4 mt-2">
        {(!revealed.day || !revealed.month || !revealed.year) && (
          <button
            onClick={handleRevealAll}
            type="button"
            className="text-xs text-charcoal-muted hover:text-goldFoil-dark underline font-sans transition-colors"
          >
            Can&apos;t scratch? Tap to reveal
          </button>
        )}

        {(revealed.day && revealed.month && revealed.year) && (
          <button
            onClick={() => {
              resetAllScratch();
              setTimeout(() => startOneByOneScratch(), 300);
            }}
            type="button"
            className="flex items-center gap-1.5 text-xs text-goldFoil-dark hover:text-charcoal-ink font-playfair font-semibold transition-colors py-1 px-3 rounded-full border border-goldFoil/30 hover:border-goldFoil/60 bg-[#FAF5F0]"
          >
            <RotateCcw className="w-3 h-3 text-goldFoil-dark" />
            <span>Scratch Again</span>
          </button>
        )}
      </div>
    </section>
  );
});

export default ScratchCard;
