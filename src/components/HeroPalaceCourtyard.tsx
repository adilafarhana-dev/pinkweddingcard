"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { audioEngine } from "./AudioEngine";

interface HeroPalaceCourtyardProps {
  onStartTour?: () => void;
}

export default function HeroPalaceCourtyard({ onStartTour }: HeroPalaceCourtyardProps) {
  const [isPlayingMotion, setIsPlayingMotion] = useState(false);

  const handlePlayRomanticMoment = () => {
    setIsPlayingMotion(true);
    audioEngine.playCelebrationChime();
    setTimeout(() => setIsPlayingMotion(false), 7000);
  };

  return (
    <section
      id="hero-palace-section"
      className="relative w-full pt-6 pb-6 px-0 sm:px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#F7EBEB] via-[#FFFDF9] to-[#FAF3EE] overflow-hidden"
    >
      {/* Royal Matrimonial Header */}
      <div className="w-full max-w-lg text-center mb-3 z-10 px-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="text-goldFoil mb-1.5">
            <svg width="36" height="18" viewBox="0 0 100 50" fill="currentColor">
              <path d="M50 0 C 40 20, 20 20, 0 35 C 20 30, 40 45, 50 50 C 60 45, 80 30, 100 35 C 80 20, 60 20, 50 0 Z" />
            </svg>
          </div>
          <span className="font-script text-2xl sm:text-3xl text-goldFoil-dark">
            In the Name of the Most Gracious, Ever Merciful
          </span>
          <p className="font-playfair text-[10px] sm:text-[11px] tracking-[0.28em] text-charcoal-muted uppercase font-semibold mt-0.5">
            Together with their families
          </p>
        </motion.div>
      </div>

      {/* Romantic Card with Integrated Floral Arch & Couple Artwork - TRUE FULL WIDTH ON MOBILE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg rounded-none sm:rounded-3xl overflow-hidden shadow-md sm:shadow-xl border-y sm:border-2 border-goldFoil/40 bg-[#FFFDF9] z-10 flex flex-col items-center"
      >
        {/* Artwork Display with Integrated Calligraphy inside Arch & Fairy Light Glow */}
        <div className="relative w-full aspect-[9/16] overflow-hidden bg-[#FAF4F0]">
          {/* Couple Image with subtle romantic ambient scale motion */}
          <motion.img
            src="/couple.png"
            alt="Danial & Ayla Royal Courtship under Floral Arch"
            animate={
              isPlayingMotion
                ? {
                    scale: [1, 1.05, 1.02],
                    y: [0, -6, 0],
                  }
                : { scale: 1, y: 0 }
            }
            transition={{ duration: 6, ease: "easeInOut" }}
            className="w-full h-full object-cover object-top select-none"
          />

          {/* Warm Ambient Fairy Light Glints (Procedural Floating Sparks) */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Sparkle 1 */}
            <motion.div
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 text-goldFoil"
            >
              <Sparkles className="w-4 h-4 text-goldFoil/80" />
            </motion.div>

            {/* Sparkle 2 */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.3, 0.9] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/3 right-1/4 text-goldFoil"
            >
              <Sparkles className="w-3.5 h-3.5 text-goldFoil" />
            </motion.div>

            {/* Sparkle 3 near Bride & Groom hands */}
            <motion.div
              animate={{ opacity: [0.2, 0.95, 0.2], scale: [0.7, 1.15, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-1/3 left-1/2 text-goldFoil"
            >
              <Sparkles className="w-3 h-3 text-[#FFF9D6]" />
            </motion.div>
          </div>

          {/* Elegant Overlaid Typography Inside the Palace Archway */}
          <div className="absolute top-[22%] inset-x-0 flex flex-col items-center text-center px-4 sm:px-6 pointer-events-none">
            <span className="font-playfair text-[10px] tracking-[0.3em] uppercase text-goldFoil-dark font-bold">
              The Royal Union
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-ink font-normal tracking-wide mt-1">
              Danial <span className="font-script text-2xl sm:text-3xl text-dustyRose-500">&amp;</span> Ayla
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-goldFoil to-transparent mx-auto my-2" />
            <p className="font-serif text-[12px] sm:text-sm text-charcoal-soft leading-relaxed italic max-w-[260px]">
              “Where love begins in tranquility and echoes for eternity.”
            </p>
          </div>

          {/* Romantic Moment Chime Button (Placed bottom-left inside arch image to avoid colliding with top fixed buttons) */}
          <div className="absolute bottom-4 left-4 z-20">
            <button
              onClick={handlePlayRomanticMoment}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] border border-goldFoil/40 shadow-md backdrop-blur-md text-charcoal-ink text-[11px] font-playfair font-semibold transition-all active:scale-95"
            >
              <Sparkles className="w-3 h-3 text-goldFoil animate-spin" style={{ animationDuration: "6s" }} />
              <span>{isPlayingMotion ? "Enchanting..." : "Animate"}</span>
            </button>
          </div>
        </div>

        {/* Card Footer Quote & Quick Start Auto Tour Button */}
        <div className="p-4 text-center bg-[#FFFDF9] w-full border-t border-dustyRose-100 flex flex-col items-center">
          <p className="font-serif text-xs sm:text-sm text-charcoal-soft leading-relaxed italic max-w-xs mx-auto">
            “And of His signs is that He created for you spouses from among yourselves, that you may dwell in tranquility with them...”
          </p>
          <span className="block text-[10px] font-sans tracking-widest text-goldFoil-dark font-bold uppercase mt-1">
            Surah Ar-Rum • 30:21
          </span>

          {/* Optional Quick Start Auto Tour Pill */}
          {onStartTour && (
            <button
              onClick={onStartTour}
              type="button"
              className="mt-3 flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-goldFoil/50 bg-[#FAF5F0] hover:bg-goldFoil/15 text-goldFoil-dark text-xs font-playfair font-semibold tracking-wider uppercase shadow-sm transition-all active:scale-95 group"
            >
              <span>Auto Tour Invitation</span>
              <ChevronDown className="w-3.5 h-3.5 text-goldFoil-dark group-hover:translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
