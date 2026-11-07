"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface CouplePose {
  src: string;
  alt: string;
  caption: string;
  subtitle: string;
}

const couplePoses: CouplePose[] = [
  {
    src: "/couple.png",
    alt: "Danial kneeling and holding Ayla's hand under the floral arch",
    caption: "The Sacred Proposal",
    subtitle: "“Where love begins in tranquility...”",
  },
  {
    src: "/couple-standing.png",
    alt: "Danial standing and holding hands with Ayla",
    caption: "Hand in Hand",
    subtitle: "“Two souls united by grace...”",
  },
  {
    src: "/couple-twirl.png",
    alt: "Ayla rotating gracefully in a bridal twirl led by Danial",
    caption: "The Royal Twirl",
    subtitle: "“Echoing with love and joy for eternity.”",
  },
];

export default function HeroPalaceCourtyard() {
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);

  // Automatic romantic progression:
  // 1. Groom kneeling holding bride's hand
  // 2. Groom standing holding bride
  // 3. Bride rotating gracefully
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPoseIndex((prev) => (prev + 1) % couplePoses.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const currentPose = couplePoses[currentPoseIndex];

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
          {/* Animated 3-Stage Couple Pose Crossfade (Proposal -> Standing Hand in Hand -> Bridal Twirl) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPose.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <motion.img
                src={currentPose.src}
                alt={currentPose.alt}
                animate={
                  currentPoseIndex === 2
                    ? {
                        // Gentle graceful 3D rotation flourish during the bridal twirl
                        rotate: [0, 1.2, -1.2, 0],
                        scale: [1, 1.03, 1],
                      }
                    : {
                        scale: [1, 1.02, 1],
                      }
                }
                transition={{ duration: 4.0, ease: "easeInOut" }}
                className="w-full h-full object-cover object-top select-none"
              />
            </motion.div>
          </AnimatePresence>

          {/* Warm Ambient Fairy Light Glints (Procedural Floating Sparks) */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Sparkle 1 */}
            <motion.div
              animate={{ opacity: [0.2, 0.95, 0.2], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 text-goldFoil"
            >
              <Sparkles className="w-4 h-4 text-goldFoil/85" />
            </motion.div>

            {/* Sparkle 2 */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.3, 0.9] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/3 right-1/4 text-goldFoil"
            >
              <Sparkles className="w-3.5 h-3.5 text-goldFoil" />
            </motion.div>

            {/* Sparkle 3 near couple hands */}
            <motion.div
              animate={{ opacity: [0.2, 0.95, 0.2], scale: [0.7, 1.2, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-1/3 left-1/2 text-goldFoil"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFF9D6]" />
            </motion.div>
          </div>

          {/* Elegant Overlaid Typography Inside the Palace Archway */}
          <div className="absolute top-[21%] inset-x-0 flex flex-col items-center text-center px-4 sm:px-6 pointer-events-none z-10">
            <span className="font-playfair text-[10px] tracking-[0.3em] uppercase text-goldFoil-dark font-bold">
              The Royal Union
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-ink font-normal tracking-wide mt-1">
              Danial <span className="font-script text-2xl sm:text-3xl text-dustyRose-500">&amp;</span> Ayla
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-goldFoil to-transparent mx-auto my-2" />
            
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPose.subtitle}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-[12px] sm:text-sm text-charcoal-soft leading-relaxed italic max-w-[270px]"
              >
                {currentPose.subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Subtle Story Step Indicator Dots at Bottom of Arch */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-20 pointer-events-none">
            {couplePoses.map((pose, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 rounded-full ${
                  currentPoseIndex === idx
                    ? "w-5 h-1.5 bg-goldFoil shadow-[0_0_8px_rgba(212,175,55,0.7)]"
                    : "w-1.5 h-1.5 bg-white/70 backdrop-blur-sm"
                }`}
                title={pose.caption}
              />
            ))}
          </div>
        </div>

        {/* Card Footer Quote */}
        <div className="p-4 text-center bg-[#FFFDF9] w-full border-t border-dustyRose-100 flex flex-col items-center">
          <p className="font-serif text-xs sm:text-sm text-charcoal-soft leading-relaxed italic max-w-xs mx-auto">
            “And of His signs is that He created for you spouses from among yourselves, that you may dwell in tranquility with them...”
          </p>
          <span className="block text-[10px] font-sans tracking-widest text-goldFoil-dark font-bold uppercase mt-1">
            Surah Ar-Rum • 30:21
          </span>
        </div>
      </motion.div>
    </section>
  );
}
