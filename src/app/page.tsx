"use client";

import React from "react";
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DeviceFrame>
      {/* Ambient Floating Rose Petals & Golden Bokeh */}
      <PetalParticles />

      {/* Floating Procedural Music Controller */}
      <MusicController />

      {/* SECTION 1: 3D Embossed Envelope & Monogram Wax Seal Cover (100vh) */}
      <EnvelopeCover />

      {/* SECTION 2: Hero & Mughal Palace Courtyard Illustration */}
      <HeroPalaceCourtyard />

      {/* INTERACTIVE GOLD FOIL SCRATCH CARD SECTION */}
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
