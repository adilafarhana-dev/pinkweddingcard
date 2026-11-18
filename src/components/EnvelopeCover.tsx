"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Mail } from "lucide-react";
import { audioEngine } from "./AudioEngine";

interface EnvelopeCoverProps {
  onOpenComplete?: () => void;
}

export default function EnvelopeCover({ onOpenComplete }: EnvelopeCoverProps) {
  const [isStickerRemoved, setIsStickerRemoved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDissolved, setIsDissolved] = useState(false);

  // Lock scrolling so the first page stays fixed until opened ("keep first page first")
  useEffect(() => {
    if (!isDissolved) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isDissolved]);

  // Automatically open this page slowly after 1.5s so guest sees the closed floral badge first
  useEffect(() => {
    if (isStickerRemoved || isOpen || isDissolved) return;

    const autoOpenTimer = setTimeout(() => {
      handleOpenEnvelope();
    }, 1500);

    return () => clearTimeout(autoOpenTimer);
  }, [isStickerRemoved, isOpen, isDissolved]);

  const handleOpenEnvelope = (clientX?: number, clientY?: number) => {
    if (isStickerRemoved || isOpen) return;

    // 1. Slowly remove the central floral sticker badge
    setIsStickerRemoved(true);

    // Start Kudmayi Reprise (Female) background music
    if (!audioEngine.getIsPlaying()) {
      audioEngine.startMusic();
    }

    // Soft golden particle sparkle at seal center
    const x = clientX ? clientX / window.innerWidth : 0.5;
    const y = clientY ? clientY / window.innerHeight : 0.46;

    confetti({
      particleCount: 50,
      spread: 75,
      origin: { x, y },
      colors: ["#FFEAA7", "#D4AF37", "#F5E8C7", "#FFFDF9", "#E8C5C8", "#B4556C"],
      ticks: 180,
      gravity: 0.55,
      scalar: 0.95,
    });

    // 2. Once the sticker starts lifting (at 750ms), slowly open the pleated flaps
    setTimeout(() => {
      setIsOpen(true);
    }, 750);

    // 3. Flaps unfold slowly (2.8s), then automatically dissolve and remove first page
    setTimeout(() => {
      setIsDissolved(true);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (onOpenComplete) {
        onOpenComplete();
      }
    }, 3600);
  };

  const handleResetEnvelope = () => {
    setIsDissolved(false);
    setIsOpen(false);
    setIsStickerRemoved(false);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
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

      {/* LUXURY PLEATED PINK ENVELOPE (MATCHING USER REFERENCE DESIGN) */}
      {!isDissolved && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 1.1, delay: 2.5, ease: "easeInOut" }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F8EBE8] overflow-hidden select-none [perspective:1400px] ${
            isOpen ? "pointer-events-none" : ""
          }`}
        >
          {/* Main Envelope Frame - Centered luxury proportion container */}
          <div className="relative w-full max-w-lg h-[100dvh] bg-[#F8EBE8] overflow-hidden [transform-style:preserve-3d] flex items-center justify-center shadow-2xl">
            
            {/* Inner Envelope Lining Peeking Behind Flaps as they Open */}
            <div className="absolute inset-0 bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-center z-0">
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
            {/* 1. LEFT PLEATED FLAP (UNFOLDS OUTWARD SLOWLY: rotateY(-110deg))           */}
            {/* ========================================================================= */}
            <motion.div
              initial={false}
              animate={{
                rotateY: isOpen ? -115 : 0,
              }}
              transition={{
                duration: 2.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
              className="absolute inset-y-0 left-0 w-1/2 z-20 overflow-hidden shadow-[8px_0_25px_rgba(180,85,108,0.25)] [transform-style:preserve-3d]"
            >
              {/* Left Pleated Image Flap (Covers exactly the left half) */}
              <div className="relative w-full h-full">
                <img
                  src="/pink-envelope-left.png"
                  alt="Pink Pleated Envelope Left Flap"
                  className="w-full h-full object-cover object-right select-none pointer-events-none"
                />
                {/* Subtle Inner Paper Shadow Edge along the center seam */}
                <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* 2. RIGHT PLEATED FLAP (UNFOLDS OUTWARD SLOWLY: rotateY(110deg))           */}
            {/* ========================================================================= */}
            <motion.div
              initial={false}
              animate={{
                rotateY: isOpen ? 115 : 0,
              }}
              transition={{
                duration: 2.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
              className="absolute inset-y-0 right-0 w-1/2 z-20 overflow-hidden shadow-[-8px_0_25px_rgba(180,85,108,0.25)] [transform-style:preserve-3d]"
            >
              {/* Right Pleated Image Flap (Covers exactly the right half) */}
              <div className="relative w-full h-full">
                <img
                  src="/pink-envelope-right.png"
                  alt="Pink Pleated Envelope Right Flap"
                  className="w-full h-full object-cover object-left select-none pointer-events-none"
                />
                {/* Subtle Inner Paper Shadow Edge along the center seam */}
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* 3. CENTRAL FLORAL STICKER BADGE (REMOVES SLOWLY ON CLICK/AUTO)             */}
            {/* ========================================================================= */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <AnimatePresence>
                {!isStickerRemoved && (
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      handleOpenEnvelope(rect.left + rect.width / 2, rect.top + rect.height / 2);
                    }}
                    initial={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{
                      scale: 1.25,
                      opacity: 0,
                      rotate: 8,
                      filter: "blur(2px)",
                      transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto relative w-28 h-28 sm:w-36 sm:h-36 -translate-y-8 sm:-translate-y-10 rounded-full flex items-center justify-center cursor-pointer transition-transform focus:outline-none"
                    aria-label="Tap Floral Sticker to Open Wedding Invitation"
                  >
                    {/* Ambient Glow */}
                    <div className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,#E8A3B4_0%,#B4556C_40%,transparent_70%)] opacity-35 blur-md pointer-events-none" />

                    {/* Exact Floral Sticker Image */}
                    <img
                      src="/pink-envelope-seal.png"
                      alt="Embossed Floral Sticker Badge"
                      className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(140,50,75,0.4)] select-none pointer-events-none"
                    />

                    {/* Fairy Sparkle Glint */}
                    <div className="absolute -bottom-1 right-2 text-goldFoil pointer-events-none">
                      <Sparkles className="w-4 h-4 text-[#FFF2C2] drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Bottom Clickable Pill Button: "TAP SEAL TO OPEN" */}
              <AnimatePresence>
                {!isStickerRemoved && (
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
                    className="pointer-events-auto absolute bottom-10 sm:bottom-14 flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] border border-[#E8C5CE] shadow-lg backdrop-blur-md cursor-pointer transition-all active:scale-95"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B4556C] animate-ping" />
                    <span className="font-playfair text-[11px] tracking-[0.22em] text-[#6B1724] font-semibold uppercase">
                      {isStickerRemoved ? "UNSEALING..." : "TAP SEAL TO OPEN"}
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
