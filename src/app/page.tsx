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
  const currentPosRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  // Cross-browser mobile & desktop scroll getter
  const getScrollY = useCallback(() => {
    if (typeof window === "undefined") return 0;
    return (
      window.pageYOffset ||
      (document.scrollingElement ? document.scrollingElement.scrollTop : 0) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }, []);

  // Cross-browser mobile & desktop scroll setter (Safari iOS, Android Chrome, Desktop)
  const setScrollY = useCallback((y: number) => {
    const targetY = Math.round(y);
    window.scrollTo(0, targetY);
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = targetY;
    }
    if (document.documentElement && document.documentElement.scrollTop !== targetY) {
      document.documentElement.scrollTop = targetY;
    }
    if (document.body && document.body.scrollTop !== targetY) {
      document.body.scrollTop = targetY;
    }
  }, []);

  // Background smooth automated scroll tour optimized for mobile & desktop
  useEffect(() => {
    if (!isAutoScrolling) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    currentPosRef.current = getScrollY();
    let lastTimestamp: number | null = null;

    const scrollStep = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const doc = document.documentElement;
      const body = document.body;
      const scrollHeight = Math.max(
        doc ? doc.scrollHeight : 0,
        body ? body.scrollHeight : 0,
        doc ? doc.offsetHeight : 0,
        body ? body.offsetHeight : 0
      );
      const maxScroll = scrollHeight - window.innerHeight;

      // Check if we arrived at "The Date" scratch section!
      const scratchSection = document.getElementById("date-scratch-section");
      if (scratchSection && !hasTriggeredScratchRef.current) {
        const rect = scratchSection.getBoundingClientRect();
        // Pause auto-scroll right when "The Date" is centered in the viewport
        if (rect.top <= window.innerHeight * 0.35 && rect.top >= -30) {
          hasTriggeredScratchRef.current = true;
          setIsAutoScrolling(false);

          // Trigger the visible one-by-one auto-scratching sequence!
          scratchCardRef.current?.triggerAutoScratch();

          // After watching the 3 boxes scratch one by one + confetti (~3.8s), resume smooth auto-scroll!
          setTimeout(() => {
            currentPosRef.current = getScrollY();
            setIsAutoScrolling(true);
          }, 3800);
          return;
        }
      }

      const currentActual = getScrollY();
      if (currentActual >= maxScroll - 6 || currentPosRef.current >= maxScroll - 6) {
        setIsAutoScrolling(false);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

      // Time-delta normalized smooth speed (~75px/sec) across 60Hz, 90Hz, 120Hz mobile screens
      const safeDelta = Math.min(elapsed, 40);
      const deltaPx = (75 * safeDelta) / 1000;

      // Resync accumulator if user manually shifted or if drift occurred
      if (Math.abs(currentActual - currentPosRef.current) > 40) {
        currentPosRef.current = currentActual;
      }

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

  // Pause auto-scroll ONLY when user deliberately drags/swipes or wheels manually
  useEffect(() => {
    if (!isAutoScrolling) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5) {
        setIsAutoScrolling(false);
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
        // Only cancel if guest actively drags/swipes more than 25px
        if (delta > 25) {
          setIsAutoScrolling(false);
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
    };
  }, [isAutoScrolling]);

  // When first page envelope opens: automatically dissolve first page & start smooth tour
  const handleEnvelopeOpenComplete = useCallback(() => {
    setIsEnvelopeOpened(true);

    // Ensure we start cleanly at top
    setScrollY(0);
    currentPosRef.current = 0;

    // Automatically start smooth scrolling down tour after 2.2s so guest enjoys the couple first
    setTimeout(() => {
      currentPosRef.current = getScrollY();
      setIsAutoScrolling(true);
    }, 2200);
  }, [getScrollY, setScrollY]);

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
