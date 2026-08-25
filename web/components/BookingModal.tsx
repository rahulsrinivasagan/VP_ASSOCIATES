"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuCircleCheck } from "react-icons/lu";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSlot?: "morning" | "afternoon" | "night";
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultSlot = "morning",
}: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<"morning" | "afternoon" | "night">(defaultSlot);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          date,
          slot: selectedSlot,
          subject: `Cricket Arena Slot Reservation (${selectedSlot.toUpperCase()})`,
          message: `Ground slot booking requested for ${date || "upcoming match"} during ${selectedSlot} session.`,
          sourcePage: "Sports Page - Ground Booking Modal",
        }),
      });
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 font-jakarta">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B2516]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-[95%] sm:w-[90%] max-w-[780px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E0EBE2] z-10 p-6 sm:p-8 lg:p-[36px_40px]"
          >
            {/* Submitted Success Screen */}
            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center text-4xl">
                  <LuCircleCheck />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1E13]">
                  Booking Reserved!
                </h3>
                <p className="text-base text-[#556658] max-w-md">
                  Thank you, <span className="font-semibold text-[#0B1E13]">{name || "Player"}</span>. Our team will contact you at {phone} to confirm your match slot.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                {/* HEADER SECTION */}
                <div className="relative mb-[28px]">
                  {/* Top Badge */}
                  <div className="text-xs font-bold uppercase tracking-widest text-[#2E7D32] mb-[10px]">
                    PREMIUM CRICKET ARENA
                  </div>

                  {/* Title & Close Button on the same row */}
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E13] tracking-tight">
                      Reserve Ground Slot
                    </h2>
                    <button
                      onClick={onClose}
                      type="button"
                      aria-label="Close modal"
                      className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0B1E13] flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <LuX className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* SLOT SELECTOR SECTION */}
                <div className="mb-[28px]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#556658] mb-[12px]">
                    SELECT SLOT
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {[
                      { id: "morning", label: "Morning", time: "6:00 AM – 12:00 PM" },
                      { id: "afternoon", label: "Afternoon", time: "12:00 PM – 5:00 PM" },
                      { id: "night", label: "Night", time: "5:00 PM – 11:00 PM" },
                    ].map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot.id as any)}
                        className={`h-[58px] px-4 rounded-xl border text-left flex flex-col justify-center transition-all ${
                          selectedSlot === slot.id
                            ? "border-[#2E7D32] bg-[#F4F9F5] text-[#0B1E13]"
                            : "border-[#E0EBE2] text-[#556658] hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-[16px] font-semibold leading-tight">
                          {slot.label}
                        </div>
                        <div className="text-[15px] font-normal opacity-75 leading-tight mt-0.5">
                          {slot.time}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* MATCH DATE */}
                <div className="mb-[24px]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#556658] mb-[12px]">
                    MATCH DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-[56px] px-[18px] bg-[#F8FAFC] border border-[#E0EBE2] rounded-[14px] text-base text-[#0B1E13] focus:outline-none focus:border-[#2E7D32] transition-colors"
                  />
                </div>

                {/* YOUR NAME / TEAM */}
                <div className="mb-[24px]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#556658] mb-[12px]">
                    YOUR NAME / TEAM
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-[56px] px-[18px] bg-[#F8FAFC] border border-[#E0EBE2] rounded-[14px] text-base text-[#0B1E13] focus:outline-none focus:border-[#2E7D32] transition-colors placeholder:text-gray-400"
                  />
                </div>

                {/* PHONE NUMBER */}
                <div className="mb-[24px]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#556658] mb-[12px]">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-[56px] px-[18px] bg-[#F8FAFC] border border-[#E0EBE2] rounded-[14px] text-base text-[#0B1E13] focus:outline-none focus:border-[#2E7D32] transition-colors placeholder:text-gray-400"
                  />
                </div>

                {/* CONFIRM BUTTON */}
                <div className="mb-[18px] pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[56px] bg-[#0B2516] hover:bg-[#174429] text-white font-bold rounded-[16px] shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center disabled:opacity-75"
                  >
                    {loading ? "Reserving..." : "Confirm Reservation 🏏"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
