"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface ParentProfile {
  name: string;
  relation: string;
  title: string;
  avatarSvg: React.ReactNode;
}

export default function ParentsGallery() {
  // Groom's Parents
  const groomFather: ParentProfile = {
    name: "Mr. Tariq Ahmed Khan",
    relation: "Father of the Groom",
    title: "Patriarch of the Khan Family",
    avatarSvg: (
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FBF6F0" />
        {/* Warm halo */}
        <circle cx="60" cy="50" r="38" fill="#F4E6E7" />
        {/* Traditional Sherwani Collar & Dusty Pink Outfit */}
        <path d="M25 120 C25 90, 45 80, 60 80 C75 80, 95 90, 95 120 Z" fill="#B36870" />
        <path d="M48 80 L60 105 L72 80 Z" fill="#FFFDF9" />
        <line x1="60" y1="80" x2="60" y2="120" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Head */}
        <circle cx="60" cy="52" r="18" fill="#F5DDD6" />
        {/* Hair / Beard */}
        <path d="M42 50 C42 35, 78 35, 78 50 C78 38, 42 38, 42 50 Z" fill="#403035" />
        <path d="M50 62 C50 72, 70 72, 70 62 Z" fill="#403035" opacity="0.8" />
        {/* Gentle specs */}
        <circle cx="53" cy="52" r="4.5" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <circle cx="67" cy="52" r="4.5" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <line x1="57.5" y1="52" x2="62.5" y2="52" stroke="#D4AF37" strokeWidth="1" />
      </svg>
    ),
  };

  const groomMother: ParentProfile = {
    name: "Mrs. Yasmin Tariq Khan",
    relation: "Mother of the Groom",
    title: "Matriarch of the Khan Family",
    avatarSvg: (
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FBF6F0" />
        <circle cx="60" cy="50" r="38" fill="#F7EBEB" />
        {/* Traditional Embroidered Silk Dupatta in Dusty Rose */}
        <path d="M22 120 C22 88, 44 80, 60 80 C76 80, 98 88, 98 120 Z" fill="#CF8A90" />
        {/* Dupatta Drape over head */}
        <path d="M38 48 C38 25, 82 25, 82 48 C86 75, 78 100, 78 100 L42 100 C42 100, 34 75, 38 48 Z" fill="#E8C5C8" opacity="0.9" />
        <path d="M40 46 C40 30, 80 30, 80 46" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        {/* Face */}
        <circle cx="60" cy="54" r="15" fill="#F8DFD7" />
        {/* Subtle pearl necklace */}
        <path d="M51 68 Q60 74, 69 68" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2 2" fill="none" />
      </svg>
    ),
  };

  // Bride's Parents
  const brideFather: ParentProfile = {
    name: "Dr. Rashid Al-Sayed",
    relation: "Father of the Bride",
    title: "Patriarch of the Al-Sayed Family",
    avatarSvg: (
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FBF6F0" />
        <circle cx="60" cy="50" r="38" fill="#F4E6E7" />
        {/* Formal Bandhgala Suit */}
        <path d="M25 120 C25 90, 45 80, 60 80 C75 80, 95 90, 95 120 Z" fill="#995058" />
        <line x1="60" y1="80" x2="60" y2="120" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="60" cy="90" r="1.5" fill="#D4AF37" />
        <circle cx="60" cy="98" r="1.5" fill="#D4AF37" />
        <circle cx="60" cy="106" r="1.5" fill="#D4AF37" />
        {/* Head */}
        <circle cx="60" cy="52" r="18" fill="#F5DDD6" />
        {/* Hair */}
        <path d="M43 48 C43 33, 77 33, 77 48 C77 38, 43 38, 43 48 Z" fill="#3D2D31" />
        {/* Moustache */}
        <path d="M52 60 Q60 63, 68 60" stroke="#3D2D31" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  };

  const brideMother: ParentProfile = {
    name: "Mrs. Farida Rashid Al-Sayed",
    relation: "Mother of the Bride",
    title: "Matriarch of the Al-Sayed Family",
    avatarSvg: (
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" fill="#FBF6F0" />
        <circle cx="60" cy="50" r="38" fill="#F7EBEB" />
        {/* Royal Pastel Lehenga & Sari Pallu */}
        <path d="M22 120 C22 88, 44 80, 60 80 C76 80, 98 88, 98 120 Z" fill="#DCA7AC" />
        <path d="M38 48 C38 25, 82 25, 82 48 C86 75, 80 100, 80 100 L40 100 C40 100, 34 75, 38 48 Z" fill="#F7EBEB" opacity="0.9" />
        <path d="M39 46 C39 30, 81 30, 81 46" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        {/* Face */}
        <circle cx="60" cy="54" r="15" fill="#F8DFD7" />
        {/* Gold Earrings */}
        <circle cx="45" cy="56" r="2" fill="#D4AF37" />
        <circle cx="75" cy="56" r="2" fill="#D4AF37" />
        <path d="M51 68 Q60 75, 69 68" stroke="#D4AF37" strokeWidth="2" fill="none" />
      </svg>
    ),
  };

  const renderPhotoCard = (parent: ParentProfile, key: string) => (
    <div key={key} className="flex-1 flex flex-col items-center">
      {/* Side-by-side square photo frame with thin gold border */}
      <div className="relative w-full aspect-square max-w-[155px] rounded-xl overflow-hidden border-2 border-goldFoil/60 shadow-md bg-white p-1 flex items-center justify-center group hover:scale-[1.03] transition-transform duration-300">
        {/* Inner Gold Foil Filigree Corner Accents */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-goldFoil pointer-events-none z-10" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-goldFoil pointer-events-none z-10" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-goldFoil pointer-events-none z-10" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-goldFoil pointer-events-none z-10" />

        {/* Square Portrait Photo Container */}
        <div className="w-full h-full rounded-lg overflow-hidden relative">
          {parent.avatarSvg}
        </div>
      </div>

      {/* Labeled Name Card Beneath */}
      <div className="mt-2.5 text-center px-1">
        <h5 className="font-serif text-sm sm:text-base text-charcoal-ink font-semibold tracking-wide">
          {parent.name}
        </h5>
        <span className="block font-sans text-[10px] tracking-wider uppercase text-goldFoil-dark font-medium mt-0.5">
          {parent.relation}
        </span>
      </div>
    </div>
  );

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 bg-gradient-to-b from-[#F7EBEB] via-[#FFFDF9] to-[#FAF3EE] overflow-hidden flex flex-col items-center">
      
      {/* Cascading Hanging Wisteria Floral Graphics (Left & Right Flanks) */}
      <div className="absolute top-0 left-0 w-32 sm:w-44 pointer-events-none z-10 opacity-85">
        <svg viewBox="0 0 160 300" fill="none" className="w-full h-auto">
          {/* Main stem vine */}
          <path d="M0 0 Q 30 60, 20 140 Q 10 220, 25 300" stroke="#75666A" strokeWidth="2.5" />
          {/* Hanging Wisteria Clusters */}
          <g fill="#E8C5C8">
            <ellipse cx="25" cy="40" rx="8" ry="12" />
            <ellipse cx="35" cy="55" rx="9" ry="14" fill="#CF8A90" />
            <ellipse cx="28" cy="75" rx="7" ry="11" />
            <ellipse cx="22" cy="95" rx="6" ry="9" fill="#B86B72" />
            <ellipse cx="20" cy="115" rx="5" ry="8" />
            <ellipse cx="18" cy="130" rx="4" ry="6" fill="#D4AF37" />
          </g>
          <g fill="#F7EBEB">
            <ellipse cx="45" cy="90" rx="7" ry="10" />
            <ellipse cx="50" cy="110" rx="8" ry="12" fill="#E8C5C8" />
            <ellipse cx="42" cy="130" rx="6" ry="9" fill="#CF8A90" />
            <ellipse cx="35" cy="150" rx="5" ry="7" />
          </g>
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-32 sm:w-44 pointer-events-none z-10 opacity-85 transform scale-x-[-1]">
        <svg viewBox="0 0 160 300" fill="none" className="w-full h-auto">
          <path d="M0 0 Q 30 60, 20 140 Q 10 220, 25 300" stroke="#75666A" strokeWidth="2.5" />
          <g fill="#E8C5C8">
            <ellipse cx="25" cy="40" rx="8" ry="12" />
            <ellipse cx="35" cy="55" rx="9" ry="14" fill="#CF8A90" />
            <ellipse cx="28" cy="75" rx="7" ry="11" />
            <ellipse cx="22" cy="95" rx="6" ry="9" fill="#B86B72" />
            <ellipse cx="20" cy="115" rx="5" ry="8" />
            <ellipse cx="18" cy="130" rx="4" ry="6" fill="#D4AF37" />
          </g>
          <g fill="#F7EBEB">
            <ellipse cx="45" cy="90" rx="7" ry="10" />
            <ellipse cx="50" cy="110" rx="8" ry="12" fill="#E8C5C8" />
            <ellipse cx="42" cy="130" rx="6" ry="9" fill="#CF8A90" />
            <ellipse cx="35" cy="150" rx="5" ry="7" />
          </g>
        </svg>
      </div>

      {/* Section Header */}
      <div className="w-full max-w-[390px] text-center mb-8 z-20">
        <span className="font-script text-2xl sm:text-3xl text-goldFoil-dark block">
          Pillars of Love &amp; Grace
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-charcoal-ink font-light tracking-wide mt-1">
          The Royal Families
        </h3>
        <p className="font-serif text-xs sm:text-sm text-charcoal-muted italic max-w-xs mx-auto mt-1.5">
          Bestowing their heartfelt blessings upon Danial &amp; Ayla as they embark on their eternal journey.
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-goldFoil to-transparent mx-auto mt-3" />
      </div>

      {/* Main Container for Two Stacked Rows */}
      <div className="w-full max-w-[390px] flex flex-col space-y-8 z-20">
        
        {/* ROW 1: PARENTS OF THE GROOM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-5 rounded-2xl paper-emboss-card border border-dustyRose-300/60 shadow-lg bg-gradient-to-br from-[#FFFDF9] via-[#FAF5F0] to-[#F5ECE8]"
        >
          {/* Label Header */}
          <div className="text-center mb-4">
            <span className="font-playfair text-xs sm:text-sm tracking-[0.25em] text-goldFoil-dark font-bold uppercase">
              PARENTS OF THE GROOM
            </span>
            <div className="w-8 h-0.5 bg-goldFoil/50 mx-auto mt-1" />
          </div>

          {/* Two Side-by-Side Square Photo Frames */}
          <div className="flex items-start justify-between gap-3">
            {renderPhotoCard(groomFather, "groom-father")}
            {renderPhotoCard(groomMother, "groom-mother")}
          </div>
        </motion.div>

        {/* ROW 2: PARENTS OF THE BRIDE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-5 rounded-2xl paper-emboss-card border border-dustyRose-300/60 shadow-lg bg-gradient-to-br from-[#FFFDF9] via-[#FAF5F0] to-[#F5ECE8]"
        >
          {/* Label Header */}
          <div className="text-center mb-4">
            <span className="font-playfair text-xs sm:text-sm tracking-[0.25em] text-goldFoil-dark font-bold uppercase">
              PARENTS OF THE BRIDE
            </span>
            <div className="w-8 h-0.5 bg-goldFoil/50 mx-auto mt-1" />
          </div>

          {/* Two Side-by-Side Square Photo Frames */}
          <div className="flex items-start justify-between gap-3">
            {renderPhotoCard(brideFather, "bride-father")}
            {renderPhotoCard(brideMother, "bride-mother")}
          </div>
        </motion.div>
      </div>

      {/* Royal Closing Blessing Quote */}
      <div className="w-full max-w-[390px] text-center mt-10 pt-6 border-t border-dustyRose-200/80 z-20">
        <Heart className="w-4 h-4 text-goldFoil mx-auto mb-2 fill-goldFoil/20" />
        <p className="font-script text-2xl text-goldFoil-dark">
          “May their union be showered with love, peace and endless blessings”
        </p>
        <span className="block font-playfair text-[10px] tracking-[0.3em] uppercase text-charcoal-muted mt-1 font-semibold">
          #DanialWedsAyla2026
        </span>
      </div>
    </section>
  );
}
