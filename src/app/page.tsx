"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import DeviceFrame from "@/components/DeviceFrame";
import PetalParticles from "@/components/PetalParticles";
import MusicController from "@/components/MusicController";
import EnvelopeCover from "@/components/EnvelopeCover";
import HeroPalaceCourtyard from "@/components/HeroPalaceCourtyard";
import ScratchCard from "@/components/ScratchCard";
import Timeline from "@/components/Timeline";
import ParentsGallery from "@/components/ParentsGallery";
import DestinationMap from "@/components/DestinationMap";
import { ChevronUp } from "lucide-react";

export default function WeddingInvitationPage() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Background smooth 60fps automated scroll tour (NO BUTTON RENDERED)
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

      if (window.scrollY >= maxScroll - 4) {
        setIsAutoScrolling(false);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

      // Smooth gentle reading pace: ~1.2px per frame (~70px per second)
      window.scrollBy(0, 1.2);
      animationFrameRef.current = requestAnimationFrame(scrollStep);
    };

    animationFrameRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isAutoScrolling]);

  // Pause auto-scroll if user touches or uses mouse wheel to explore manually
  useEffect(() => {
    const handleUserInteraction = () => {
      if (isAutoScrolling) {
        setIsAutoScrolling(false);
      }
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [isAutoScrolling]);

  // When first page envelope opens: automatically dissolve first page & scroll down
  const handleEnvelopeOpenComplete = useCallback(() => {
    // 1. Smoothly scroll into the Hero Palace Courtyard section
    const heroSection = document.getElementById("hero-palace-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }

    // 2. Automatically start smooth scrolling down tour after 1.6s
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 1600);
  }, []);

  const scrollToTop = () => {
    setIsAutoScrolling(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DeviceFrame>
      {/* Ambient Floating Rose Petals & Golden Bokeh */}
      <PetalParticles />

      {/* Floating Procedural Music Controller (Top-Right) */}
      <MusicController />

      {/* SECTION 1: 3D Embossed Envelope & Monogram Wax Seal Cover (100vh Full Screen) */}
      <EnvelopeCover onOpenComplete={handleEnvelopeOpenComplete} />

      {/* SECTION 2: Hero & Mughal Palace Courtyard Illustration (Full Screen Width) */}
      <HeroPalaceCourtyard />

      {/* INTERACTIVE GOLD FOIL SCRATCH CARD SECTION (AUTO-SCRATCHES ONE BY ONE) */}
      <ScratchCard />

      {/* SECTION 3: Royal Timeline Itinerary (Baraat, Nikkah, Walima) */}
      <Timeline />

      {/* SECTION 4: Family Details Framed by Hanging Wisteria */}
      <ParentsGallery />

      {/* SECTION 5: The Royal Destination (Taj Palace Map) AFTER Family Details */}
      <DestinationMap />

      {/* Luxury Editorial Footer */}
      <footer className="w-full py-10 px-4 bg-[#FAF5F0] border-t border-dustyRose-200/60 text-center flex flex-col items-center">
        <button
          onClick={scrollToTop}
          type="button"
          className="mb-4 p-2.5 rounded-full border border-goldFoil/40 text-goldFoil-dark hover:bg-goldFoil/10 transition-colors active:scale-95"
          title="Return to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <span className="font-script text-2xl sm:text-3xl text-goldFoil-dark">
          Danial &amp; Ayla
        </span>
        <p className="font-playfair text-[10px] tracking-[0.25em] text-charcoal-muted uppercase mt-1">
          October 12, 2026 • Taj Palace, New Delhi
        </p>

        <p className="text-[10px] font-sans text-charcoal-muted/70 mt-3">
          Crafted with love &bull; Royal Digital Wedding Invitation
        </p>
      </footer>
    </DeviceFrame>
  );
}
