"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Mail } from "lucide-react";
import { audioEngine } from "./AudioEngine";

interface EnvelopeCoverProps {
  onOpenComplete?: () => void;
}

export default function EnvelopeCover({ onOpenComplete }: EnvelopeCoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDissolved, setIsDissolved] = useState(false);

  const handleOpenEnvelope = (clientX?: number, clientY?: number) => {
    if (isOpen) return;

    // Start background romantic music smoothly on this page when opened
    if (!audioEngine.getIsPlaying()) {
      audioEngine.startMusic();
    }

    // Soft golden particle sparkle at seal center
    const x = clientX ? clientX / window.innerWidth : 0.5;
    const y = clientY ? clientY / window.innerHeight : 0.5;

    confetti({
      particleCount: 45,
      spread: 75,
      origin: { x, y },
      colors: ["#FFEAA7", "#D4AF37", "#F5E8C7", "#FFFDF9", "#E8C5C8"],
      ticks: 160,
      gravity: 0.6,
      scalar: 0.9,
    });

    setIsOpen(true);

    // Flaps unfold slowly (2.5s), dissolve, and automatically scroll down into the invitation
    setTimeout(() => {
      setIsDissolved(true);
      if (onOpenComplete) {
        onOpenComplete();
      }
    }, 2600);
  };

  const handleResetEnvelope = () => {
    setIsDissolved(false);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Re-fold Button when dissolved so user can replay the slow 3D animation anytime */}
      {isDissolved && (
        <button
          onClick={handleResetEnvelope}
          type="button"
          aria-label="Fold Envelope Again"
          className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] border border-goldFoil/50 shadow-xl backdrop-blur-md text-charcoal-ink font-playfair text-xs tracking-wider font-semibold transition-all active:scale-95 group pointer-events-auto"
        >
          <Mail className="w-3.5 h-3.5 text-goldFoil-dark group-hover:rotate-12 transition-transform" />
          <span>Fold Envelope</span>
        </button>
      )}

      {/* 4-FLAP 3D ENVELOPE TRUE FULL-SCREEN CONTAINER (EDGE-TO-EDGE ON ALL MOBILES & SCREENS) */}
      {!isDissolved && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 1.0, delay: 2.1, ease: "easeInOut" }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FFFDF9] overflow-hidden select-none [perspective:1400px] ${
            isOpen ? "pointer-events-none" : ""
          }`}
        >
          {/* Main Envelope Frame - True full-screen 100dvh without artificial gutters */}
          <div className="relative w-full h-[100dvh] bg-[#FFFDF9] overflow-hidden [transform-style:preserve-3d]">
            
            {/* Inner Envelope Lining Peeking Behind Flaps */}
            <div className="absolute inset-0 bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-center">
              <span className="font-script text-3xl sm:text-4xl text-goldFoil-dark mb-1">
                The Wedding of
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-ink font-light tracking-wide">
                Danial &amp; Ayla
              </h1>
              <p className="font-playfair text-xs sm:text-sm tracking-[0.25em] uppercase text-charcoal-muted mt-2">
                October 12, 2026 • Taj Palace
              </p>
            </div>

            {/* ========================================================================= */}
            {/* 1. TOP TRIANGULAR FLAP (FOLDS UPWARD SLOWLY: rotateX(180deg), origin: top) */}
            {/* ========================================================================= */}
            <motion.div
              initial={false}
              animate={{
                rotateX: isOpen ? 180 : 0,
              }}
              transition={{
                duration: 2.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: "top center", backfaceVisibility: "hidden" }}
              className="absolute inset-x-0 top-0 h-1/2 z-20 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-gradient-to-b from-[#FFFDF9] via-[#FAF3ED] to-[#F5ECE6] shadow-[0_8px_20px_rgba(184,107,114,0.12)] flex items-start justify-center pt-8 sm:pt-12 overflow-hidden [transform-style:preserve-3d]"
            >
              {/* Starburst / Sunburst Embossed Carving */}
              <svg viewBox="0 0 240 200" className="w-44 sm:w-56 h-auto text-[#E8DDD6]" fill="none">
                <g stroke="#E8DDD6" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M120 70 Q110 80, 120 90 Q130 80, 120 70 Z" fill="#FBF5F0" />
                  <path d="M120 90 Q110 100, 120 110 Q130 100, 120 90 Z" fill="#FBF5F0" />
                  <path d="M110 80 Q100 90, 110 100 Q120 90, 110 80 Z" fill="#FBF5F0" />
                  <path d="M130 80 Q140 90, 130 100 Q120 90, 130 80 Z" fill="#FBF5F0" />

                  <line x1="120" y1="65" x2="120" y2="25" strokeWidth="2" strokeDasharray="30 0" />
                  <circle cx="120" cy="22" r="2.5" fill="#E8DDD6" />
                  <line x1="120" y1="115" x2="120" y2="155" strokeWidth="2" />

                  <line x1="105" y1="75" x2="70" y2="45" />
                  <circle cx="67" cy="43" r="2" fill="#E8DDD6" />
                  <path d="M100 85 Q75 80, 60 90" strokeDasharray="40 0" />
                  <circle cx="58" cy="90" r="2" fill="#E8DDD6" />

                  <line x1="135" y1="75" x2="170" y2="45" />
                  <circle cx="173" cy="43" r="2" fill="#E8DDD6" />
                  <path d="M140 85 Q165 80, 180 90" strokeDasharray="40 0" />
                  <circle cx="182" cy="90" r="2" fill="#E8DDD6" />
                </g>
              </svg>
            </motion.div>

            {/* ========================================================================= */}
            {/* 2. BOTTOM TRIANGULAR FLAP (FOLDS DOWNWARD SLOWLY: rotateX(-180deg))       */}
            {/* ========================================================================= */}
            <motion.div
              initial={false}
              animate={{
                rotateX: isOpen ? -180 : 0,
              }}
              transition={{
                duration: 2.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: "bottom center", backfaceVisibility: "hidden" }}
              className="absolute inset-x-0 bottom-0 h-1/2 z-20 [clip-path:polygon(0_100%,100%_100%,50%_0)] bg-gradient-to-t from-[#FFFDF9] via-[#FAF3ED] to-[#F5ECE6] shadow-[0_-8px_20px_rgba(184,107,114,0.1)] flex items-end justify-center pb-12 sm:pb-16 overflow-hidden [transform-style:preserve-3d]"
            >
              <svg viewBox="0 0 240 200" className="w-44 sm:w-56 h-auto text-[#E8DDD6] transform rotate-180" fill="none">
                <g stroke="#E8DDD6" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M120 70 Q110 80, 120 90 Q130 80, 120 70 Z" fill="#FBF5F0" />
                  <path d="M120 90 Q110 100, 120 110 Q130 100, 120 90 Z" fill="#FBF5F0" />
                  <path d="M110 80 Q100 90, 110 100 Q120 90, 110 80 Z" fill="#FBF5F0" />
                  <path d="M130 80 Q140 90, 130 100 Q120 90, 130 80 Z" fill="#FBF5F0" />

                  <line x1="120" y1="65" x2="120" y2="25" strokeWidth="2" />
                  <circle cx="120" cy="22" r="2.5" fill="#E8DDD6" />
                  <line x1="120" y1="115" x2="120" y2="155" strokeWidth="2" />

                  <line x1="105" y1="75" x2="70" y2="45" />
                  <circle cx="67" cy="43" r="2" fill="#E8DDD6" />
                  <path d="M100 85 Q75 80, 60 90" strokeDasharray="40 0" />
                  <circle cx="58" cy="90" r="2" fill="#E8DDD6" />

                  <line x1="135" y1="75" x2="170" y2="45" />
                  <circle cx="173" cy="43" r="2" fill="#E8DDD6" />
                  <path d="M140 85 Q165 80, 180 90" strokeDasharray="40 0" />
                  <circle cx="182" cy="90" r="2" fill="#E8DDD6" />
                </g>
              </svg>
            </motion.div>

            {/* ========================================================================= */}
            {/* 3. LEFT TRIANGULAR FLAP (FOLDS OUTWARD SLOWLY: rotateY(-180deg))          */}
            {/* ========================================================================= */}
            <motion.div
              initial={false}
              animate={{
                rotateY: isOpen ? -180 : 0,
              }}
              transition={{
                duration: 2.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
              className="absolute inset-y-0 left-0 w-1/2 z-10 [clip-path:polygon(0_0,0_100%,100%_50%)] bg-gradient-to-r from-[#FAF2EC] via-[#F6ECE6] to-[#EEDBD5] shadow-[6px_0_15px_rgba(184,107,114,0.08)] flex items-center justify-start pl-4 sm:pl-8 overflow-hidden [transform-style:preserve-3d]"
            >
              <svg viewBox="0 0 100 300" className="w-14 sm:w-16 h-auto" fill="none">
                <path d="M30 40 Q45 150, 35 260" stroke="#DFCFCA" strokeWidth="1.2" />
                <ellipse cx="28" cy="80" rx="4" ry="7" fill="#E6D3CE" />
                <circle cx="36" cy="78" r="2" fill="#D4AF37" />
                <ellipse cx="40" cy="130" rx="4" ry="7" fill="#E6D3CE" />
                <circle cx="48" cy="128" r="2" fill="#D4AF37" />
                <ellipse cx="32" cy="180" rx="4" ry="7" fill="#E6D3CE" />
                <circle cx="25" cy="182" r="2" fill="#D4AF37" />
                <ellipse cx="40" cy="230" rx="4" ry="7" fill="#E6D3CE" />
                <circle cx="47" cy="228" r="2" fill="#D4AF37" />
              </svg>
            </motion.div>

            {/* ========================================================================= */}
            {/* 4. RIGHT TRIANGULAR FLAP (FOLDS OUTWARD SLOWLY: rotateY(180deg))          */}
            {/* ========================================================================= */}
            <motion.div
              initial={false}
              animate={{
                rotateY: isOpen ? 180 : 0,
              }}
              transition={{
                duration: 2.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
              className="absolute inset-y-0 right-0 w-1/2 z-10 [clip-path:polygon(100%_0,100%_100%,0_50%)] bg-gradient-to-l from-[#FAF2EC] via-[#F6ECE6] to-[#EEDBD5] shadow-[-6px_0_15px_rgba(184,107,114,0.08)] flex items-center justify-end pr-4 sm:pr-8 overflow-hidden [transform-style:preserve-3d]"
            >
              <svg viewBox="0 0 100 300" className="w-14 sm:w-16 h-auto transform scale-x-[-1]" fill="none">
                <path d="M30 40 Q45 150, 35 260" stroke="#DFCFCA" strokeWidth="1.2" />
                <ellipse cx="28" cy="80" rx="4" ry="7" fill="#E6D3CE" />
                <circle cx="36" cy="78" r="2" fill="#D4AF37" />
                <ellipse cx="40" cy="130" rx="4" ry="7" fill="#E6D3CE" />
                <circle cx="48" cy="128" r="2" fill="#D4AF37" />
                <ellipse cx="32" cy="180" rx="4" ry="7" fill="#E6D3CE" />
                <circle cx="25" cy="182" r="2" fill="#D4AF37" />
                <ellipse cx="40" cy="230" rx="4" ry="7" fill="#E6D3CE" />
                <circle cx="47" cy="228" r="2" fill="#D4AF37" />
              </svg>
            </motion.div>

            {/* ========================================================================= */}
            {/* CENTER WAX SEAL MONOGRAM "D&A"                                            */}
            {/* ========================================================================= */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <AnimatePresence>
                {!isOpen && (
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      handleOpenEnvelope(rect.left + rect.width / 2, rect.top + rect.height / 2);
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center cursor-pointer transition-transform focus:outline-none"
                    aria-label="Tap D&A Wax Seal to Open Invitation"
                  >
                    <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,#EAC775_0%,#D4AF37_35%,transparent_70%)] opacity-45 blur-md pointer-events-none" />

                    <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#EADBBE] shadow-[0_8px_25px_rgba(180,140,40,0.35),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(140,105,35,0.2)] flex items-center justify-center p-2.5">
                      <div className="w-full h-full rounded-full border border-[#D4AF37] shadow-[inset_0_1px_3px_rgba(212,175,55,0.5)] flex items-center justify-center p-1">
                        <div className="w-full h-full rounded-full border border-[#D4AF37]/50 flex items-center justify-center">
                          <span className="font-script text-3xl sm:text-4xl text-[#B8861B] font-normal tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] -mt-0.5">
                            D &amp; A
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -bottom-1 right-1 text-[#D4AF37] pointer-events-none">
                      <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Bottom Clickable Pill Button: "TAP SEAL TO OPEN" */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      handleOpenEnvelope(rect.left + rect.width / 2, rect.top + rect.height / 2);
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.3 }}
                    className="pointer-events-auto absolute bottom-12 sm:bottom-16 flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] border border-[#EADBBE] shadow-md hover:shadow-lg backdrop-blur-sm cursor-pointer transition-all active:scale-95"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5C158] animate-ping" />
                    <span className="font-playfair text-[11px] tracking-[0.22em] text-charcoal-ink font-semibold uppercase">
                      TAP SEAL TO OPEN
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
