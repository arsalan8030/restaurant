"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function BookPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-16 p-6 border rounded">
        <h2 className="text-2xl font-bold mb-4">Select Date & Time</h2>

        <input
          type="date"
          className="w-full border p-2 mb-4"
        />

        <select className="w-full border p-2 mb-6">
          <option>7:00 PM - 9:00 PM</option>
          <option>9:00 PM - 11:00 PM</option>
        </select>

        <button
          onClick={() => router.push("/seats")}
          className="w-full bg-red-500 text-white py-3 rounded"
        >
          Continue to Seat Selection
        </button>
      </div>
    </>
  );
}
