"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Heart, X, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { audioEngine } from "./AudioEngine";

export default function RsvpModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guestCount: "1",
    wishes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    audioEngine.playCelebrationChime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#E8C5C8", "#FFFDF9"],
    });

    setSubmitted(true);
  };

  return (
    <>
      {/* Bottom RSVP Trigger Bar */}
      <div className="w-full max-w-[390px] mx-auto py-8 px-4 text-center">
        <div className="p-6 rounded-2xl paper-emboss-card border border-goldFoil/40 shadow-lg bg-gradient-to-br from-[#FFFDF9] to-[#FAF3ED]">
          <Sparkles className="w-5 h-5 text-goldFoil mx-auto mb-2" />
          <h4 className="font-serif text-2xl text-charcoal-ink font-normal">
            Grace Us With Your Presence
          </h4>
          <p className="font-serif text-xs text-charcoal-soft mt-1 mb-4">
            Kindly confirm your attendance by September 25, 2026.
          </p>

          <button
            onClick={() => {
              setIsOpen(true);
              setSubmitted(false);
            }}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-goldFoil via-goldFoil-shimmer to-goldFoil-dark text-white font-playfair font-bold text-xs tracking-widest uppercase shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            RSVP &amp; Send Blessings
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-2xl bg-[#FFFDF9] border-2 border-goldFoil/50 shadow-2xl p-6 overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-dustyRose-100 text-charcoal-muted"
              >
                <X className="w-4 h-4" />
              </button>

              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h5 className="font-serif text-2xl text-charcoal-ink">
                    Shukran &amp; Thank You!
                  </h5>
                  <p className="font-serif text-sm text-charcoal-soft mt-1.5 leading-relaxed">
                    Your response and warm prayers have been recorded. We look forward to celebrating with you!
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-5 py-2 px-6 rounded-xl bg-goldFoil text-white font-sans text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  <div className="text-center">
                    <span className="font-script text-xl text-goldFoil-dark">Royal Response</span>
                    <h5 className="font-serif text-xl text-charcoal-ink font-medium">
                      Wedding RSVP
                    </h5>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zayd & Family"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-dustyRose-300 focus:outline-none focus:border-goldFoil bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                      Attendance
                    </label>
                    <select
                      value={formData.attending}
                      onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-dustyRose-300 focus:outline-none focus:border-goldFoil bg-white"
                    >
                      <option value="yes">Joyfully Attending</option>
                      <option value="no">Regretfully Declining</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                      Number of Guests
                    </label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-dustyRose-300 focus:outline-none focus:border-goldFoil bg-white"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4+">4+ Guests</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                      Blessings &amp; Message for the Couple
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Share your prayers or wishes..."
                      value={formData.wishes}
                      onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-dustyRose-300 focus:outline-none focus:border-goldFoil bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-goldFoil hover:bg-goldFoil-dark text-white font-playfair font-bold text-xs tracking-wider uppercase shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Confirmation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
