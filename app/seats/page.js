"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import SeatGrid from "../components/SeatGrid";

const seatData = [
  { id: 1, label: "A1", booked: false },
  { id: 2, label: "A2", booked: true },
  { id: 3, label: "A3", booked: false },
  { id: 4, label: "A4", booked: false },
  { id: 5, label: "A5", booked: true },
];

export default function SeatsPage() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>

        <SeatGrid
          seats={seatData}
          selectedSeats={selectedSeats}
          toggleSeat={toggleSeat}
        />

        <div className="mt-6">
          <p className="mb-2">
            Selected Seats: <b>{selectedSeats.join(", ") || "None"}</b>
          </p>
          <button
            className="bg-red-500 text-white px-6 py-3 rounded"
            disabled={!selectedSeats.length}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </>
  );
}
