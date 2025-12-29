"use client";

import { useEffect } from "react";

export default function PaymentPage() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const options = {
      key: "RAZORPAY_KEY_ID", // test key
      amount: 60000, // ₹600 in paise
      currency: "INR",
      name: "BookMyTable",
      description: "Seat Reservation",
      handler: function (response) {
        console.log("Payment Success:", response.razorpay_payment_id);
        alert("Payment Successful! Seats Confirmed.");
        window.location.href = "/confirmation";
      },
      theme: { color: "#ef4444" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border p-6 rounded w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
        <p className="mb-2">Selected Seats: T1-S1, T1-S2</p>
        <p className="mb-6 font-bold">Total: ₹600</p>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Pay & Confirm Seats
        </button>
      </div>
    </div>
  );
}
