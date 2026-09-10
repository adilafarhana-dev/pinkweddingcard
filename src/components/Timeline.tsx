"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
}

export default function Timeline() {
  const schedule: ScheduleItem[] = [
    {
      time: "3:30 PM",
      title: "Baraat Arrival",
      desc: "Royal groom procession accompanied by live dhol, brass symphony & rose water greeting.",
    },
    {
      time: "4:30 PM",
      title: "The Holy Nikkah",
      desc: "Sacred matrimonial vows and signing of the Nikahnama under the Grand Floral Mandap.",
    },
    {
      time: "7:30 PM",
      title: "Walima & Grand Dinner",
      desc: "An opulent banquet of royal Awadhi & Mughal cuisine, live Sufi acoustics & celebrations.",
    },
  ];

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
      <div className="relative w-full max-w-[390px]">
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
    </section>
  );
}
