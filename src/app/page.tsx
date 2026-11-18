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
  const isAutoScrollingRef = useRef(false);
  const isEnvelopeOpenedRef = useRef(false);
  isAutoScrollingRef.current = isAutoScrolling;
  isEnvelopeOpenedRef.current = isEnvelopeOpened;

  const animationFrameRef = useRef<number | null>(null);
  const scratchCardRef = useRef<ScratchCardHandle | null>(null);
  const hasTriggeredScratchRef = useRef(false);
  const currentPosRef = useRef(0);
  const lastTargetYRef = useRef(-1);
  const touchStartYRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cross-browser mobile & desktop scroll getter
  const getScrollY = useCallback(() => {
    if (typeof window === "undefined") return 0;
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }, []);

  // Glitch-free hardware-accelerated scroll setter
  const setScrollY = useCallback((y: number) => {
    const targetY = Math.round(y);
    if (targetY === lastTargetYRef.current) return;
    lastTargetYRef.current = targetY;
    window.scrollTo(0, targetY);
  }, []);

  // Background silky-smooth automated scroll tour (zero layout thrashing)
  useEffect(() => {
    if (!isAutoScrolling) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    currentPosRef.current = getScrollY();
    lastTargetYRef.current = Math.round(currentPosRef.current);
    let lastTimestamp: number | null = null;

    // Pre-calculate target pause offset and maxScroll to prevent synchronous layout reflows in 60fps loop
    const doc = document.documentElement;
    const body = document.body;
    const maxScroll = Math.max(
      doc ? doc.scrollHeight : 0,
      body ? body.scrollHeight : 0
    ) - window.innerHeight;

    let scratchTargetY = 999999;
    const scratchSection = document.getElementById("date-scratch-section");
    if (scratchSection && !hasTriggeredScratchRef.current) {
      const rect = scratchSection.getBoundingClientRect();
      scratchTargetY = rect.top + currentPosRef.current - (window.innerHeight * 0.18);
    }

    const scrollStep = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Check if we arrived at "The Date" scratch section
      if (!hasTriggeredScratchRef.current && currentPosRef.current >= scratchTargetY) {
        hasTriggeredScratchRef.current = true;
        setIsAutoScrolling(false);
        isAutoScrollingRef.current = false;

        // Trigger the visible one-by-one auto-scratching sequence!
        scratchCardRef.current?.triggerAutoScratch();

        // After watching the 3 boxes scratch one by one + confetti (~4.2s), resume slow auto-scroll!
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
          currentPosRef.current = getScrollY();
          setIsAutoScrolling(true);
          isAutoScrollingRef.current = true;
        }, 4200);
        return;
      }

      if (currentPosRef.current >= maxScroll - 6) {
        setIsAutoScrolling(false);
        isAutoScrollingRef.current = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

      // Smooth stately pace (~36px/sec)
      const safeDelta = Math.min(elapsed, 35);
      const deltaPx = (36 * safeDelta) / 1000;

      currentPosRef.current += deltaPx;
      setScrollY(currentPosRef.current);

      animationFrameRef.current = requestAnimationFrame(scrollStep);
    };

    animationFrameRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isAutoScrolling, getScrollY, setScrollY]);

  // Pause temporarily when user interacts, then reliably resume slow auto-scroll after idle
  // Mounted once so the resume timer is NEVER prematurely cleared by state re-renders
  useEffect(() => {
    const pauseAndResume = () => {
      if (isAutoScrollingRef.current) {
        setIsAutoScrolling(false);
        isAutoScrollingRef.current = false;
      }

      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }

      // Resume slow automatic downward glide after 3.2s of user idle
      resumeTimerRef.current = setTimeout(() => {
        if (!isEnvelopeOpenedRef.current) return;
        const currentActual = getScrollY();
        const doc = document.documentElement;
        const body = document.body;
        const maxScroll = Math.max(
          doc ? doc.scrollHeight : 0,
          body ? body.scrollHeight : 0
        ) - window.innerHeight;

        if (currentActual < maxScroll - 15) {
          currentPosRef.current = currentActual;
          setIsAutoScrolling(true);
          isAutoScrollingRef.current = true;
        }
      }, 3200);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5) {
        pauseAndResume();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current !== null && e.touches.length > 0) {
        const delta = Math.abs(e.touches[0].clientY - touchStartYRef.current);
        // Only pause if guest actively drags/swipes more than 25px
        if (delta > 25) {
          pauseAndResume();
          touchStartYRef.current = null;
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [getScrollY]);

  // When first page envelope opens: automatically dissolve first page & start smooth tour
  const handleEnvelopeOpenComplete = useCallback(() => {
    setIsEnvelopeOpened(true);
    isEnvelopeOpenedRef.current = true;

    // Ensure we start cleanly at top
    setScrollY(0);
    currentPosRef.current = 0;

    // After 1.5s so guest sees the opening couple pose, start slowly moving down automatically
    setTimeout(() => {
      currentPosRef.current = getScrollY();
      setIsAutoScrolling(true);
      isAutoScrollingRef.current = true;
    }, 1500);
  }, [getScrollY, setScrollY]);

  const scrollToTop = () => {
    setIsAutoScrolling(false);
    isAutoScrollingRef.current = false;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
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
      <HeroPalaceCourtyard isAutoScrolling={isAutoScrolling} />

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
