// "use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function SeatsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const restaurant = searchParams.get("restaurant") || "Premium Restaurant";
  const date = searchParams.get("date") || "2026-01-15";
  const time = searchParams.get("time") || "7:00 PM";

  const allSeats = [
    { id: "A1", price: 300 },
    { id: "A2", price: 300 },
    { id: "A3", price: 300 },
    { id: "A4", price: 300 },
    { id: "B1", price: 400 },
    { id: "B2", price: 400 },
    { id: "B3", price: 400 },
    { id: "B4", price: 400 },
    { id: "C1", price: 500 },
    { id: "C2", price: 500 },
    { id: "C3", price: 500 },
    { id: "C4", price: 500 },
  ];

  const bookedSeats = useMemo(() => {
    if (!date || !time) return [];
    if (time.includes("7")) return ["B2", "C3"];
    if (time.includes("9")) return ["A1", "C4"];
    return ["A2"];
  }, [date, time]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat.id)) return;

    setSelectedSeats((prev) =>
      prev.find((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handlePayment = () => {
    if (date === null || time === null) {
      alert("Please select date & time first");
      return;
    }

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

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-8 mt-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Card */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl border border-gray-700 shadow-2xl p-8 mb-8"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-black text-white">🍽️ {restaurant}</h1>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Reservation Details</p>
                  <p className="text-lg font-bold text-red-500">{date} • {time}</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-red-500 via-red-600 to-transparent rounded-full"></div>
            </div>
          </motion.div>

          {/* Seats Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl border border-gray-700 shadow-2xl p-8 mb-8"
          >
            {/* Screen Indicator */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-full max-w-md mb-4">
                <div className="h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full"></div>
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Screen This Way ↓</p>
            </div>

            {/* Seat Grid */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-4 gap-4">
                {allSeats.map((seat, idx) => {
                  const isBooked = bookedSeats.includes(seat.id);
                  const isSelected = selectedSeats.find((s) => s.id === seat.id);

                  return (
                    <motion.button
                      key={seat.id}
                      whileHover={!isBooked ? { scale: 1.1 } : {}}
                      whileTap={!isBooked ? { scale: 0.95 } : {}}
                      onClick={() => toggleSeat(seat)}
                      disabled={isBooked}
                      className={`
                        w-16 h-16 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center
                        ${
                          isBooked
                            ? "bg-gray-600 text-gray-800 cursor-not-allowed opacity-50"
                            : isSelected
                            ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/50 scale-105"
                            : "bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/50"
                        }
                      `}
                      aria-label={`Seat ${seat.id}`}
                    >
                      {seat.id}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-8 text-sm mb-6 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-green-500 to-green-600"></div>
                <span className="text-gray-300">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-red-500 to-red-600"></div>
                <span className="text-gray-300">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-gray-600"></div>
                <span className="text-gray-300">Booked</span>
              </div>
            </div>
          </motion.div>

          {/* Summary & Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-gray-800 via-gray-850 to-gray-800 rounded-3xl border border-gray-700 shadow-2xl p-8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-end">
              {/* Summary */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">Summary</h3>
                <div className="space-y-3 bg-black/30 rounded-2xl p-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Selected Seats:</span>
                    <span className="font-semibold text-white">
                      {selectedSeats.length
                        ? selectedSeats.map((s) => s.id).join(", ")
                        : "None"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Number of Seats:</span>
                    <span className="font-semibold text-white">{selectedSeats.length}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-3 flex justify-between text-lg">
                    <span className="font-bold text-white">Total Amount:</span>
                    <span className="font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                disabled={selectedSeats.length === 0}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg uppercase tracking-wide transition-all duration-300 ${
                  selectedSeats.length === 0
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-lg shadow-red-500/50 hover:shadow-red-500/80"
                }`}
              >
                {selectedSeats.length === 0 ? "Select Seats First" : `Pay ₹${totalAmount} & Confirm`}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
