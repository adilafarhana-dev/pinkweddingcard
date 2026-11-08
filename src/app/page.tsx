"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import DeviceFrame from "@/components/DeviceFrame";
import PetalParticles from "@/components/PetalParticles";
import MusicController from "@/components/MusicController";
import EnvelopeCover from "@/components/EnvelopeCover";
import HeroPalaceCourtyard from "@/components/HeroPalaceCourtyard";
import ScratchCard, { ScratchCardHandle } from "@/components/ScratchCard";
import Timeline from "@/components/Timeline";
import ParentsGallery from "@/components/ParentsGallery";
import DestinationMap from "@/components/DestinationMap";
import { ChevronUp } from "lucide-react";

export default function WeddingInvitationPage() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const scratchCardRef = useRef<ScratchCardHandle | null>(null);
  const hasTriggeredScratchRef = useRef(false);

  // Background smooth 60fps automated scroll tour
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

      // Check if we arrived at "The Date" scratch section!
      const scratchSection = document.getElementById("date-scratch-section");
      if (scratchSection && !hasTriggeredScratchRef.current) {
        const rect = scratchSection.getBoundingClientRect();
        // Pause auto-scroll right when "The Date" is centered in the viewport
        if (rect.top <= window.innerHeight * 0.32 && rect.top >= -30) {
          hasTriggeredScratchRef.current = true;
          setIsAutoScrolling(false);

          // Trigger the visible one-by-one auto-scratching sequence!
          scratchCardRef.current?.triggerAutoScratch();

          // After watching the 3 boxes scratch one by one + confetti (~3.8s), resume smooth auto-scroll!
          setTimeout(() => {
            setIsAutoScrolling(true);
          }, 3800);
          return;
        }
      }

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

  // Pause auto-scroll if guest touches screen or scrolls manually
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

  // When first page envelope opens: automatically dissolve first page & start smooth tour
  const handleEnvelopeOpenComplete = useCallback(() => {
    setIsEnvelopeOpened(true);

    // 1. Smoothly scroll into the Hero Palace Courtyard section
    const heroSection = document.getElementById("hero-palace-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }

    // 2. Automatically start smooth scrolling down tour after 2.2s so guest enjoys the couple first
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2200);
  }, []);

  const scrollToTop = () => {
    setIsAutoScrolling(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DeviceFrame>
      {/* Ambient Floating Rose Petals & Golden Bokeh */}
      <PetalParticles />

      {/* Floating Music Controller (Top-Right) */}
      <MusicController />

      {/* SECTION 1: 3D Embossed Envelope & Monogram Wax Seal Cover (100vh Full Screen) */}
      <EnvelopeCover onOpenComplete={handleEnvelopeOpenComplete} />

      {/* SECTION 2: Hero & Mughal Palace Courtyard Illustration (Full Screen Width) */}
      <HeroPalaceCourtyard />

      {/* INTERACTIVE GOLD FOIL SCRATCH CARD SECTION (AUTO-SCRATCHES ONE BY ONE IN FRONT OF USER) */}
      <ScratchCard ref={scratchCardRef} isEnvelopeOpened={isEnvelopeOpened} />

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
