"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import SeatGrid from "../components/SeatGrid";
import { MdCheckCircle, MdInfo } from "react-icons/md";

const seatData = [
  { id: 1, label: "A1", booked: false },
  { id: 2, label: "A2", booked: true },
  { id: 3, label: "A3", booked: false },
  { id: 4, label: "A4", booked: false },
  { id: 5, label: "A5", booked: true },
  { id: 6, label: "B1", booked: false },
  { id: 7, label: "B2", booked: false },
  { id: 8, label: "B3", booked: true },
  { id: 9, label: "B4", booked: false },
  { id: 10, label: "B5", booked: false },
];

export default function SeatsPage() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const bookedCount = seatData.filter((s) => s.booked).length;
  const availableCount = seatData.length - bookedCount;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Seat Selection</h1>
            <p className="text-slate-600 text-lg">Choose your preferred seats for dining</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
              <p className="text-slate-600 text-sm font-semibold">Total Seats</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{seatData.length}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
              <p className="text-slate-600 text-sm font-semibold">Available</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{availableCount}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500">
              <p className="text-slate-600 text-sm font-semibold">Booked</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{bookedCount}</p>
            </div>
          </div>

          {/* Legend Section */}
          <div className="bg-white rounded-lg p-6 mb-10 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <MdInfo size={20} />
              Seat Legend
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-500 shadow-md"></div>
                <span className="text-slate-700">Available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-md"></div>
                <span className="text-slate-700">Selected</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-300 opacity-60"></div>
                <span className="text-slate-700">Booked</span>
              </div>
            </div>
          </div>

          {/* Seating Area */}
          <div className="bg-white rounded-lg p-8 shadow-md mb-10">
            <div className="text-center mb-6">
              <p className="text-sm text-slate-600 font-semibold">🎭 SCREEN 🎭</p>
            </div>
            <SeatGrid
              seats={seatData}
              selectedSeats={selectedSeats}
              toggleSeat={toggleSeat}
              hoveredSeat={hoveredSeat}
              setHoveredSeat={setHoveredSeat}
            />
          </div>

          {/* Selection Summary and Checkout */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            {selectedSeats.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <MdCheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-slate-900">Selected Seats</p>
                    <p className="text-lg text-blue-600 font-bold mt-1">
                      {selectedSeats.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-700">Subtotal ({selectedSeats.length} seats)</span>
                    <span className="font-semibold text-slate-900">${selectedSeats.length * 25}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-300 pt-3">
                    <span className="text-lg font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-slate-900">${selectedSeats.length * 25}</span>
                  </div>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Proceed to Payment
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600 text-lg">Select seats to continue with your booking</p>
                <p className="text-slate-400 text-sm mt-2">Click on available seats to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
