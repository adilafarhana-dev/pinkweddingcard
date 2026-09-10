"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Check, Copy, Sparkles, Compass } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  arabic?: string;
  desc: string;
  iconType: string;
}

export default function TimelineAndMap() {
  const [copied, setCopied] = useState(false);

  const schedule: ScheduleItem[] = [
    {
      time: "3:30 PM",
      title: "Baraat Arrival",
      desc: "Royal groom procession accompanied by live dhol, brass symphony & rose water greeting.",
      iconType: "procession",
    },
    {
      time: "4:30 PM",
      title: "The Holy Nikkah",
      desc: "Sacred matrimonial vows and signing of the Nikahnama under the Grand Floral Mandap.",
      iconType: "ceremony",
    },
    {
      time: "7:30 PM",
      title: "Walima & Grand Dinner",
      desc: "An opulent banquet of royal Awadhi & Mughal cuisine, live Sufi acoustics & celebrations.",
      iconType: "dinner",
    },
  ];

  const venueAddress = "Taj Palace, 2 Sardar Patel Marg, Diplomatic Enclave, Chanakyapuri, New Delhi, 110021";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Taj+Palace+New+Delhi+Sardar+Patel+Marg";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative w-full py-10 px-4 sm:px-6 bg-gradient-to-b from-[#FAF3ED] via-[#FFFDF9] to-[#F7EBEB] flex flex-col items-center">
      {/* Section Header */}
      <div className="w-full max-w-[390px] text-center mb-8">
        <span className="font-script text-2xl sm:text-3xl text-goldFoil-dark block">
          Auspicious Timings
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-charcoal-ink font-light tracking-wide mt-1">
          The Wedding Itinerary
        </h3>
        <p className="font-playfair text-[11px] tracking-[0.25em] uppercase text-charcoal-muted font-semibold mt-1">
          Monday • October 12, 2026
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-goldFoil to-transparent mx-auto mt-3" />
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative w-full max-w-[390px] mb-12">
        {/* Golden Central/Left Stem Line */}
        <div className="absolute top-4 bottom-4 left-6 sm:left-8 w-[2px] bg-gradient-to-b from-goldFoil via-goldFoil-shimmer to-dustyRose-300" />

        <div className="flex flex-col space-y-6">
          {schedule.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative flex items-start pl-14 sm:pl-16 group"
            >
              {/* Glowing Golden Node */}
              <div className="absolute left-4 sm:left-6 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-[#FFF8DC] to-[#D4AF37] border-2 border-[#FFFDF9] shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-[#7A5F13]" />
              </div>

              {/* Event Card */}
              <div className="w-full p-4 rounded-2xl paper-emboss-card border border-dustyRose-200/80 shadow-sm bg-gradient-to-br from-[#FFFDF9] to-[#FAF5F0] hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-playfair text-xs tracking-[0.18em] text-goldFoil-dark font-bold uppercase">
                    {item.time}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-dustyRose-500 font-medium">
                    <Sparkles className="w-3 h-3 text-goldFoil" />
                    <span>Royal Event</span>
                  </div>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl text-charcoal-ink font-normal">
                  {item.title}
                </h4>

                <p className="font-serif text-xs sm:text-sm text-charcoal-soft mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Styled Google Maps Embed Card for Taj Palace */}
      <div className="w-full max-w-[390px] text-center mb-4">
        <span className="font-script text-2xl text-goldFoil-dark block">
          The Royal Destination
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-ink font-light tracking-wide">
          Taj Palace, New Delhi
        </h3>
      </div>

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
            {/* Functional Blue "Get Directions" Button as requested in the prompt */}
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
