"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Check, Copy, Compass } from "lucide-react";

export default function DestinationMap() {
  const [copied, setCopied] = useState(false);

  const venueAddress = "Taj Palace, 2 Sardar Patel Marg, Diplomatic Enclave, Chanakyapuri, New Delhi, 110021";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Taj+Palace+New+Delhi+Sardar+Patel+Marg";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative w-full py-10 px-4 sm:px-6 bg-[#FAF5F0] flex flex-col items-center">
      {/* Section Header */}
      <div className="w-full max-w-[390px] text-center mb-6">
        <span className="font-script text-3xl text-goldFoil-dark block">
          The Royal Destination
        </span>
        <h3 className="font-serif text-3xl text-charcoal-ink font-light tracking-wide mt-1">
          Taj Palace, New Delhi
        </h3>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-goldFoil to-transparent mx-auto mt-2" />
      </div>

      {/* Styled Google Maps Embed Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-[390px] rounded-2xl overflow-hidden paper-emboss-card border-2 border-goldFoil/35 shadow-xl bg-[#FFFDF9]"
      >
        {/* Map Header Banner */}
        <div className="p-4 bg-gradient-to-r from-[#FAF3ED] to-[#F7EBEB] border-b border-dustyRose-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-goldFoil/20 flex items-center justify-center text-goldFoil-dark">
              <MapPin className="w-4 h-4 text-goldFoil-dark" />
            </div>
            <div className="text-left">
              <h5 className="font-playfair text-sm font-bold text-charcoal-ink">
                Taj Palace, Diplomatic Enclave
              </h5>
              <p className="font-sans text-[10px] text-charcoal-muted">
                Chanakyapuri, New Delhi
              </p>
            </div>
          </div>
          <Compass className="w-5 h-5 text-goldFoil animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="relative w-full h-56 bg-[#F2EFE9] overflow-hidden">
          <iframe
            title="Taj Palace New Delhi Map"
            src="https://maps.google.com/maps?q=Taj+Palace+New+Delhi+Diplomatic+Enclave&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Venue Address & Action Buttons */}
        <div className="p-4 bg-[#FFFDF9] flex flex-col gap-3">
          <p className="font-serif text-xs text-charcoal-soft text-left leading-relaxed">
            {venueAddress}
          </p>

          <div className="flex items-center gap-2">
            {/* Functional Blue "Get Directions" Button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1E60D5] hover:bg-[#154DB0] text-white text-xs sm:text-sm font-sans font-semibold tracking-wide shadow-md transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4 fill-white" />
              Get Directions
            </a>

            {/* Copy Address Button */}
            <button
              type="button"
              onClick={handleCopyAddress}
              className="flex items-center justify-center p-2.5 rounded-xl border border-dustyRose-300 hover:bg-dustyRose-50 text-charcoal-ink text-xs font-sans font-medium transition-colors"
              title="Copy Address"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-charcoal-muted" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
