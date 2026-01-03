"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { 
  CheckCircleIcon, 
  CreditCardIcon, 
  CalendarIcon, 
  ClockIcon, 
  Squares2X2Icon 
} from "@heroicons/react/24/outline";
import Confetti from "react-confetti";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const restaurant = searchParams.get("restaurant");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const seats = searchParams.get("seats");

  const seatCount = seats ? seats.split(",").length : 0;
  const pricePerSeat = 500;
  const totalAmount = seatCount * pricePerSeat;

  // Update window size for confetti
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleConfirm = () => {
    setProcessing(true);
    setShowConfetti(true);

    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);

      // Save booking to localStorage (simulate database)
      const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      existingBookings.push({ restaurant, date, time, seats, totalAmount });
      localStorage.setItem("bookings", JSON.stringify(existingBookings));

      // Stop confetti after 2 seconds
      setTimeout(() => setShowConfetti(false), 2000);
    }, 2000);
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <>
      <Navbar />

      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-10 text-center animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Payment & Confirmation</h1>
            <p className="text-gray-500 text-lg">Please review your booking details and complete the payment.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            {/* Booking Summary */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover:scale-105 transform transition-all duration-300">
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <CheckCircleIcon className="h-6 w-6 text-green-500"/> Booking Summary
              </h2>

              <div className="space-y-4 text-gray-700">
                <p className="flex items-center gap-2">
                  <CreditCardIcon className="h-5 w-5 text-gray-400"/>
                  <span><strong>Restaurant:</strong> {restaurant}</span>
                </p>
                <p className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400"/>
                  <span><strong>Date:</strong> {date}</span>
                </p>
                <p className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-gray-400"/>
                  <span><strong>Time:</strong> {time}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Squares2X2Icon className="h-5 w-5 text-gray-400"/>
                  <span><strong>Tables:</strong> {seats}</span>
                </p>
              </div>

              <hr className="my-6 border-gray-300" />

              <p className="flex justify-between font-semibold text-lg text-gray-800">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </p>
            </div>

            {/* Payment Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover:scale-105 transform transition-all duration-300 flex flex-col justify-center items-center">
              {paymentSuccess ? (
                <div className="flex flex-col items-center gap-4">
                  <CheckIcon className="h-16 w-16 text-green-500 animate-bounce"/>
                  <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
                  <button 
                    onClick={handleBackHome}
                    className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-xl font-semibold mt-4"
                  >
                    Back to Home
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <CreditCardIcon className="h-6 w-6 text-blue-500"/> Payment Method
                  </h2>

                  <div className="space-y-5 mb-6 w-full">
                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-5 py-3 transition"
                    />
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-5 py-3 transition"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 transition"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 transition"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleConfirm}
                    disabled={processing}
                    className={`w-full py-3 rounded-xl font-semibold text-lg text-white 
                      ${processing ? 'bg-gradient-to-r from-green-400 to-teal-400 animate-pulse cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'}
                      transition-all duration-300`}
                  >
                    {processing ? "Processing..." : `Pay ₹${totalAmount} & Confirm`}
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
