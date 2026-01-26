"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { MdCheckCircle, MdEventSeat, MdLocationOn, MdAccessTime } from "react-icons/md";

function SeatsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const restaurant = searchParams.get("restaurant") || "Premium Restaurant";
  const date = searchParams.get("date");
  const time = searchParams.get("time") || "9:00 PM";

  const allSeats = [
    { id: "A1", price: 300, category: "Standard" },
    { id: "A2", price: 300, category: "Standard" },
    { id: "A3", price: 300, category: "Standard" },
    { id: "A4", price: 300, category: "Standard" },
    { id: "B1", price: 400, category: "Premium" },
    { id: "B2", price: 400, category: "Premium" },
    { id: "B3", price: 400, category: "Premium" },
    { id: "B4", price: 400, category: "Premium" },
    { id: "C1", price: 500, category: "VIP" },
    { id: "C2", price: 500, category: "VIP" },
    { id: "C3", price: 500, category: "VIP" },
    { id: "C4", price: 500, category: "VIP" },
  ];

  const bookedSeats = useMemo(() => {
    if (!date || !time) return [];
    if (time.includes("7")) return ["B2", "C3"];
    if (time.includes("9")) return ["A1", "C4"];
    return ["A2"];
  }, [date, time]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat.id)) return;

    setSelectedSeats((prev) =>
      prev.find((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const availableSeats = allSeats.length - bookedSeats.length;
  
  // Group seats by category
  const seatsByCategory = {
    Standard: allSeats.filter(s => s.category === "Standard"),
    Premium: allSeats.filter(s => s.category === "Premium"),
    VIP: allSeats.filter(s => s.category === "VIP"),
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    const query = new URLSearchParams({
      restaurant,
      date,
      time,
      seats: selectedSeats.map((s) => s.id).join(","),
      amount: totalAmount.toString(),
    }).toString();

    router.push(`/payment?${query}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 mt-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Card */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-8 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🍽️</span>
                  <h1 className="text-3xl font-bold text-white">{restaurant}</h1>
                </div>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MdEventSeat className="text-blue-400" size={20} />
                    <span>Reservation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MdAccessTime className="text-green-400" size={20} />
                    <span>{time}</span>
                  </div>
                  {date && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <MdLocationOn className="text-red-400" size={20} />
                      <span>{date}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 flex flex-col justify-center text-center">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Available Seats</p>
                <p className="text-3xl font-bold text-green-400">{availableSeats}/{allSeats.length}</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-700/50 rounded-xl p-4 text-center">
              <p className="text-blue-300 text-xs uppercase font-semibold mb-2">Standard Seats</p>
              <p className="text-2xl font-bold text-blue-400">₹300</p>
              <p className="text-xs text-gray-400 mt-1">4 Available</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-700/50 rounded-xl p-4 text-center">
              <p className="text-purple-300 text-xs uppercase font-semibold mb-2">Premium Seats</p>
              <p className="text-2xl font-bold text-purple-400">₹400</p>
              <p className="text-xs text-gray-400 mt-1">4 Available</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 border border-amber-700/50 rounded-xl p-4 text-center">
              <p className="text-amber-300 text-xs uppercase font-semibold mb-2">VIP Seats</p>
              <p className="text-2xl font-bold text-amber-400">₹500</p>
              <p className="text-xs text-gray-400 mt-1">4 Available</p>
            </motion.div>
          </motion.div>

          {/* Main Seats Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-10 mb-8"
          >
            {/* Screen Indicator */}
            <div className="flex flex-col items-center mb-12">
              <div className="w-full max-w-2xl mb-4">
                <div className="h-2 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 rounded-full shadow-lg shadow-blue-500/20"></div>
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">🎬 Screen This Way ↓</p>
            </div>

            {/* Rows Organization */}
            <div className="space-y-8">
              {/* Row A - Standard */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold text-white text-lg w-8">A</span>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Standard Seating</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
                </div>
                <div className="flex justify-center gap-4 mb-2">
                  {seatsByCategory.Standard.map((seat) => {
                    const isBooked = bookedSeats.includes(seat.id);
                    const isSelected = selectedSeats.find((s) => s.id === seat.id);
                    const isHovered = hoveredSeat === seat.id;

                    return (
                      <motion.button
                        key={seat.id}
                        whileHover={!isBooked ? { scale: 1.15, y: -8 } : {}}
                        whileTap={!isBooked ? { scale: 0.9 } : {}}
                        onMouseEnter={() => !isBooked && setHoveredSeat(seat.id)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        onClick={() => toggleSeat(seat)}
                        disabled={isBooked}
                        className={`
                          relative w-16 h-16 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center
                          ${
                            isBooked
                              ? "bg-slate-600 text-slate-800 cursor-not-allowed opacity-40"
                              : isSelected
                              ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/60 ring-2 ring-red-400"
                              : isHovered
                              ? "bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg shadow-green-500/40"
                              : "bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/50"
                          }
                        `}
                        aria-label={`Seat ${seat.id}`}
                        title={isBooked ? "Booked" : `${seat.id} - ₹${seat.price}`}
                      >
                        {seat.id}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-white rounded-full p-1"
                          >
                            <MdCheckCircle className="text-red-500" size={16} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Row B - Premium */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold text-white text-lg w-8">B</span>
                  <span className="text-xs text-purple-300 uppercase font-semibold">Premium Seating</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-600 to-transparent"></div>
                </div>
                <div className="flex justify-center gap-4 mb-2">
                  {seatsByCategory.Premium.map((seat) => {
                    const isBooked = bookedSeats.includes(seat.id);
                    const isSelected = selectedSeats.find((s) => s.id === seat.id);
                    const isHovered = hoveredSeat === seat.id;

                    return (
                      <motion.button
                        key={seat.id}
                        whileHover={!isBooked ? { scale: 1.15, y: -8 } : {}}
                        whileTap={!isBooked ? { scale: 0.9 } : {}}
                        onMouseEnter={() => !isBooked && setHoveredSeat(seat.id)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        onClick={() => toggleSeat(seat)}
                        disabled={isBooked}
                        className={`
                          relative w-16 h-16 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center
                          ${
                            isBooked
                              ? "bg-slate-600 text-slate-800 cursor-not-allowed opacity-40"
                              : isSelected
                              ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/60 ring-2 ring-red-400"
                              : isHovered
                              ? "bg-gradient-to-br from-purple-400 to-purple-500 text-white shadow-lg shadow-purple-500/40"
                              : "bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50"
                          }
                        `}
                        aria-label={`Seat ${seat.id}`}
                        title={isBooked ? "Booked" : `${seat.id} - ₹${seat.price}`}
                      >
                        {seat.id}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-white rounded-full p-1"
                          >
                            <MdCheckCircle className="text-red-500" size={16} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Row C - VIP */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold text-white text-lg w-8">C</span>
                  <span className="text-xs text-amber-300 uppercase font-semibold">VIP Seating (Best View)</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-600 to-transparent"></div>
                </div>
                <div className="flex justify-center gap-4 mb-2">
                  {seatsByCategory.VIP.map((seat) => {
                    const isBooked = bookedSeats.includes(seat.id);
                    const isSelected = selectedSeats.find((s) => s.id === seat.id);
                    const isHovered = hoveredSeat === seat.id;

                    return (
                      <motion.button
                        key={seat.id}
                        whileHover={!isBooked ? { scale: 1.15, y: -8 } : {}}
                        whileTap={!isBooked ? { scale: 0.9 } : {}}
                        onMouseEnter={() => !isBooked && setHoveredSeat(seat.id)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        onClick={() => toggleSeat(seat)}
                        disabled={isBooked}
                        className={`
                          relative w-16 h-16 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center
                          ${
                            isBooked
                              ? "bg-slate-600 text-slate-800 cursor-not-allowed opacity-40"
                              : isSelected
                              ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/60 ring-2 ring-red-400"
                              : isHovered
                              ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-500/40"
                              : "bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:shadow-lg hover:shadow-amber-500/50"
                          }
                        `}
                        aria-label={`Seat ${seat.id}`}
                        title={isBooked ? "Booked" : `${seat.id} - ₹${seat.price}`}
                      >
                        {seat.id}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-white rounded-full p-1"
                          >
                            <MdCheckCircle className="text-red-500" size={16} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-8 text-sm mt-8 pt-8 border-t border-slate-700">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-md"></div>
                <span className="text-gray-300">Available</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-red-500 to-red-600 shadow-md"></div>
                <span className="text-gray-300">Selected</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-slate-600 opacity-60"></div>
                <span className="text-gray-300">Booked</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Summary & Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-slate-800 via-slate-850 to-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-end">
              {/* Summary */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                  <MdCheckCircle className="text-green-400" size={24} />
                  Booking Summary
                </h3>
                <div className="space-y-3 bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <div className="flex justify-between text-gray-300">
                    <span className="text-sm">Selected Seats:</span>
                    <span className="font-semibold text-white">
                      {selectedSeats.length
                        ? selectedSeats.map((s) => s.id).join(", ")
                        : "None selected"}
                    </span>
                  </div>
                  {selectedSeats.length > 0 && (
                    <>
                      <div className="flex justify-between text-gray-300">
                        <span className="text-sm">Number of Seats:</span>
                        <span className="font-semibold text-white">{selectedSeats.length}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span className="text-sm">Per Seat Average:</span>
                        <span className="font-semibold text-white">₹{Math.round(totalAmount / selectedSeats.length)}</span>
                      </div>
                    </>
                  )}
                  <div className="border-t border-slate-600 pt-4 flex justify-between text-lg">
                    <span className="font-bold text-white">Total Amount:</span>
                    <span className="font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent text-xl">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <motion.button
                whileHover={selectedSeats.length > 0 ? { scale: 1.03, y: -4 } : {}}
                whileTap={selectedSeats.length > 0 ? { scale: 0.97 } : {}}
                onClick={handlePayment}
                disabled={selectedSeats.length === 0}
                className={`w-full py-5 px-6 rounded-xl font-bold text-lg uppercase tracking-wide transition-all duration-300 ${
                  selectedSeats.length === 0
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-lg shadow-red-500/50 hover:shadow-red-500/80 border border-red-400/50"
                }`}
              >
                {selectedSeats.length === 0 
                  ? "👇 Select Seats to Continue" 
                  : `✓ Pay ₹${totalAmount} & Confirm Booking`
                }
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function SeatsPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-slate-900"><p className="text-white">Loading...</p></div>}>
      <SeatsPageContent />
    </Suspense>
  );
}
