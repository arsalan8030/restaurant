"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useState, useEffect, Suspense } from "react";
import html2canvas from "html2canvas";
import { 
  CheckCircleIcon, 
  CreditCardIcon, 
  CalendarIcon, 
  ClockIcon, 
  Squares2X2Icon,
  ShieldCheckIcon,
  LockClosedIcon,
  StarIcon,
  QrCodeIcon,
  CameraIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  PrinterIcon,
  InformationCircleIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";
import Confetti from "react-confetti";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [formData, setFormData] = useState({
    cardholderName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' or 'barcode'
  const [barcodeResult, setBarcodeResult] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [hoveredTooltip, setHoveredTooltip] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [fieldsFilled, setFieldsFilled] = useState({
    cardholderName: false,
    email: false,
    phone: false,
    cardNumber: false,
    expiryDate: false,
    cvv: false,
  });
  const receiptRef = useRef(null);

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

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Process barcode payment (simulate UPI/QR code payment)
  const handleBarcodePayment = async () => {
    if (!barcodeResult) {
      setPaymentError("No barcode scanned. Please scan a valid QR/barcode.");
      return;
    }

    setProcessing(true);
    setPaymentError("");

    try {
      // Simulate barcode payment processing
      // In real implementation, this would integrate with UPI/payment gateway
      await new Promise(resolve => setTimeout(resolve, 2000));

      setShowConfetti(true);
      setPaymentSuccess(true);

      // Generate payment ID
      const generatedPaymentId = `barcode_${Date.now()}`;
      setPaymentId(generatedPaymentId);

      // Save booking
      const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      existingBookings.push({
        restaurant,
        date,
        time,
        seats,
        totalAmount,
        paymentId: generatedPaymentId,
        paymentMethod: "barcode",
        barcodeCode: barcodeResult,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("bookings", JSON.stringify(existingBookings));

      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      setPaymentError("Barcode payment failed. Please try again.");
      console.error("Barcode payment error:", error);
    } finally {
      setProcessing(false);
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.cardholderName.trim()) {
      errors.cardholderName = "Cardholder name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (!formData.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Invalid card number";
    }

    if (!formData.expiryDate.trim()) {
      errors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      errors.expiryDate = "Format should be MM/YY";
    }

    if (!formData.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = "CVV must be 3-4 digits";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
      }
    }

    // CVV only numbers
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData({ ...formData, [name]: formattedValue });
    
    // Track field completion
    setFieldsFilled({ ...fieldsFilled, [name]: formattedValue.trim().length > 0 });
    
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async () => {
    if (!validateForm()) {
      setPaymentError("Please fix the errors in the form");
      return;
    }

    setProcessing(true);
    setPaymentError("");

    try {
      // Create order on backend
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount * 100, // Razorpay expects amount in paise
          currency: "INR",
          receipt: `booking_${Date.now()}`,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order");
      }

      const { id: orderId } = await orderResponse.json();

      // Razorpay payment options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: restaurant,
        description: `Table booking for ${seatCount} seat(s)`,
        order_id: orderId,
        prefill: {
          name: formData.cardholderName,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed");
            }

            setShowConfetti(true);
            setPaymentSuccess(true);

            // Set payment ID
            setPaymentId(response.razorpay_payment_id);

            // Save booking
            const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
            existingBookings.push({
              restaurant,
              date,
              time,
              seats,
              totalAmount,
              paymentId: response.razorpay_payment_id,
              timestamp: new Date().toISOString(),
            });
            localStorage.setItem("bookings", JSON.stringify(existingBookings));

            setTimeout(() => setShowConfetti(false), 3000);
          } catch (error) {
            setPaymentError("Payment verification failed. Please contact support.");
            console.error("Verification error:", error);
          } finally {
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            setPaymentError("Payment cancelled by user");
          },
        },
        theme: {
          color: "#10b981",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setPaymentError(error.message || "Payment processing failed");
      setProcessing(false);
    }
  };

  const handleBackHome = () => {
    router.push("/");
  };

  // Download receipt as image
  const downloadReceipt = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: "#1e293b",
        scale: 2,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `receipt_${paymentId}_${date}.png`;
      link.click();
    } catch (error) {
      console.error("Error downloading receipt:", error);
      alert("Unable to download receipt. Please try again.");
    }
  };

  // Print receipt
  const printReceipt = () => {
    if (!receiptRef.current) return;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<pre>");
    printWindow.document.write(receiptRef.current.innerText);
    printWindow.document.write("</pre>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <Navbar />

      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-16">
        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 left-0 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
              <CreditCardIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Complete Your Reservation
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Secure payment with industry-leading encryption. Your dining experience awaits.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-12 flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">1</div>
              <span className="text-white font-medium hidden sm:inline">Details</span>
            </div>
            <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-sm border-2 border-slate-600">2</div>
              <span className="text-slate-400 font-medium hidden sm:inline">Payment</span>
            </div>
            <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold text-sm border-2 border-slate-600">3</div>
              <span className="text-slate-400 font-medium hidden sm:inline">Confirm</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Booking Summary - Left Side */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 overflow-hidden shadow-2xl hover:border-amber-500/50 transition-all duration-300">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <CheckCircleIcon className="h-6 w-6"/> Reservation Summary
                  </h2>
                </div>

                <div className="p-6 space-y-5">
                  {/* Restaurant */}
                  <div className="pb-5 border-b border-slate-600">
                    <p className="text-slate-400 text-sm font-medium mb-1">Restaurant</p>
                    <p className="text-white text-lg font-semibold">{restaurant || "Loading..."}</p>
                  </div>

                  {/* Date */}
                  <div className="pb-5 border-b border-slate-600">
                    <div className="flex items-start gap-3">
                      <CalendarIcon className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-slate-400 text-sm font-medium">Date</p>
                        <p className="text-white font-semibold">{date || "Not selected"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="pb-5 border-b border-slate-600">
                    <div className="flex items-start gap-3">
                      <ClockIcon className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-slate-400 text-sm font-medium">Time</p>
                        <p className="text-white font-semibold">{time || "Not selected"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="pb-5 border-b border-slate-600">
                    <div className="flex items-start gap-3">
                      <Squares2X2Icon className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-slate-400 text-sm font-medium">Number of Guests</p>
                        <p className="text-white font-semibold">{seatCount} {seatCount === 1 ? "Guest" : "Guests"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 pt-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Reservation Fee</span>
                      <span className="text-white font-medium">₹{pricePerSeat}/guest</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Guests</span>
                      <span className="text-white font-medium">{seatCount}x</span>
                    </div>
                    <div className="h-px bg-slate-600 my-3"></div>
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Total Amount</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">₹{totalAmount}</span>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div className="mt-6 pt-6 border-t border-slate-600 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <LockClosedIcon className="h-4 w-4 text-green-400" />
                      <span className="text-slate-300">SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ShieldCheckIcon className="h-4 w-4 text-green-400" />
                      <span className="text-slate-300">PCI Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-green-400" />
                      <span className="text-slate-300">Money-back Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form - Right Side */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-slate-700 to-slate-600 px-6 py-4 border-b border-slate-600">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <CreditCardIcon className="h-6 w-6 text-amber-400"/> Payment Information
                  </h2>
                </div>

                <div className="p-8">
                  {paymentSuccess ? (
                    // Success State with Receipt
                    <div className="space-y-6">
                      <div className="py-8 flex flex-col items-center justify-center text-center">
                        <div className="mb-6 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                          <CheckIcon className="h-20 w-20 text-green-400 relative" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                        <p className="text-slate-300 mb-2">Your reservation is confirmed</p>
                        <p className="text-sm text-slate-400">Show this receipt to the restaurant staff upon arrival</p>
                      </div>

                      {/* Receipt */}
                      <div 
                        ref={receiptRef}
                        className="bg-slate-900 border-2 border-amber-400/30 rounded-2xl p-6 space-y-4 font-mono text-sm"
                      >
                        <div className="text-center border-b border-slate-700 pb-4">
                          <p className="text-amber-400 font-bold text-lg">RESTAURANT BOOKING</p>
                          <p className="text-slate-400 text-xs">Receipt - Payment Verification</p>
                        </div>

                        <div className="space-y-3 border-b border-slate-700 pb-4">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Restaurant:</span>
                            <span className="text-white font-semibold">{restaurant}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Confirmation ID:</span>
                            <span className="text-amber-400 font-bold">{paymentId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Date:</span>
                            <span className="text-white">{date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Time:</span>
                            <span className="text-white">{time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Number of Guests:</span>
                            <span className="text-white">{seatCount}</span>
                          </div>
                        </div>

                        <div className="space-y-2 border-b border-slate-700 pb-4">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Amount per Guest:</span>
                            <span className="text-white">₹{pricePerSeat}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Total Guests:</span>
                            <span className="text-white">{seatCount}x</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg">
                            <span className="text-amber-400">Total Amount Paid:</span>
                            <span className="text-amber-400">₹{totalAmount}</span>
                          </div>
                        </div>

                        <div className="space-y-2 border-b border-slate-700 pb-4">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Payment Status:</span>
                            <span className="text-green-400 font-bold">PAID</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Payment Method:</span>
                            <span className="text-white capitalize">{paymentMethod === "card" ? "Credit/Debit Card" : "Barcode/QR"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Transaction Time:</span>
                            <span className="text-white text-xs">{new Date().toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="text-center space-y-2 pt-4">
                          <p className="text-slate-500 text-xs">------------------------------------------</p>
                          <p className="text-slate-400 text-xs">Please show this receipt to the restaurant staff</p>
                          <p className="text-slate-400 text-xs">to confirm your reservation and payment</p>
                          <p className="text-slate-500 text-xs">------------------------------------------</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={downloadReceipt}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                          <DocumentArrowDownIcon className="h-5 w-5" />
                          Download
                        </button>
                        <button
                          onClick={printReceipt}
                          className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                          <PrinterIcon className="h-5 w-5" />
                          Print
                        </button>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                        <p className="text-green-300 text-sm text-center">
                          Keep your receipt safe. Staff will verify it upon your arrival to complete check-in.
                        </p>
                      </div>

                      <button 
                        onClick={handleBackHome}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all active:scale-95 shadow-lg"
                      >
                        Back to Home
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Error Message */}
                      {paymentError && (
                        <div className="mb-6 bg-red-500/15 border border-red-500/40 rounded-xl p-5 flex items-start gap-3 animate-slideIn shadow-lg">
                          <XMarkIcon className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-red-400 text-sm">Payment Error</p>
                            <p className="text-red-300 text-sm mt-1">{paymentError}</p>
                            <p className="text-red-200/70 text-xs mt-2">Please review your information and try again, or contact support for assistance.</p>
                          </div>
                        </div>
                      )}

                      {/* Payment Method Selector */}
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-200 mb-3">Select Your Payment Method</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              setPaymentMethod("card");
                              setPaymentError("");
                            }}
                            className={`p-4 rounded-xl font-semibold transition-all duration-300 border-2 flex flex-col items-center justify-center gap-3 transform hover:scale-105 active:scale-95 ${
                              paymentMethod === "card"
                                ? "bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-amber-400 text-amber-300 shadow-lg shadow-amber-400/20"
                                : "bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-700/70"
                            }`}
                          >
                            <CreditCardIcon className="h-6 w-6" />
                            <div className="text-center">
                              <p className="font-bold">Card Payment</p>
                              <p className="text-xs opacity-75">Visa, Mastercard, Amex</p>
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              setPaymentMethod("barcode");
                              setPaymentError("");
                              setBarcodeResult("");
                            }}
                            className={`p-4 rounded-xl font-semibold transition-all duration-300 border-2 flex flex-col items-center justify-center gap-3 transform hover:scale-105 active:scale-95 ${
                              paymentMethod === "barcode"
                                ? "bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-amber-400 text-amber-300 shadow-lg shadow-amber-400/20"
                                : "bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-700/70"
                            }`}
                          >
                            <QrCodeIcon className="h-6 w-6" />
                            <div className="text-center">
                              <p className="font-bold">QR Payment</p>
                              <p className="text-xs opacity-75">UPI, Google Pay</p>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Card Payment Form */}
                      {paymentMethod === "card" && (
                      <div>
                      {/* Form Fields */}
                      <div className="space-y-5 mb-6">
                        {/* Cardholder Name */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-semibold text-slate-300">Full Name</label>
                            <div 
                              className="relative group"
                              onMouseEnter={() => setHoveredTooltip('name')}
                              onMouseLeave={() => setHoveredTooltip(null)}
                            >
                              <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-help hover:text-amber-400 transition-colors" />
                              {hoveredTooltip === 'name' && (
                                <div className="absolute right-0 top-6 bg-slate-900 border border-slate-600 rounded-lg p-2 text-xs text-slate-200 w-48 z-10 shadow-lg">
                                  Enter your full name as it appears on your ID
                                </div>
                              )}
                            </div>
                          </div>
                          <input
                            type="text"
                            name="cardholderName"
                            placeholder="John Doe"
                            value={formData.cardholderName}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('cardholderName')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full bg-slate-700/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                              formErrors.cardholderName ? 'border-red-500/50 focus:ring-red-500/50' : 'border-slate-600 focus:border-amber-400/50'
                            }`}
                          />
                          <div className="flex items-center justify-between mt-1.5">
                            <div>
                              {formErrors.cardholderName && (
                                <p className="text-red-400 text-xs font-medium">{formErrors.cardholderName}</p>
                              )}
                              {fieldsFilled.cardholderName && !formErrors.cardholderName && (
                                <p className="text-green-400 text-xs font-medium flex items-center gap-1">
                                  <CheckBadgeIcon className="h-3 w-3" /> Valid
                                </p>
                              )}
                            </div>
                            {formData.cardholderName.length > 0 && (
                              <span className="text-xs text-slate-400">{formData.cardholderName.length} characters</span>
                            )}
                          </div>
                        </div>

                        {/* Email and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-semibold text-slate-300">Email Address</label>
                              <div 
                                className="relative group"
                                onMouseEnter={() => setHoveredTooltip('email')}
                                onMouseLeave={() => setHoveredTooltip(null)}
                              >
                                <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-help hover:text-amber-400 transition-colors" />
                                {hoveredTooltip === 'email' && (
                                  <div className="absolute right-0 top-6 bg-slate-900 border border-slate-600 rounded-lg p-2 text-xs text-slate-200 w-48 z-10 shadow-lg">
                                    We'll send your booking confirmation here
                                  </div>
                                )}
                              </div>
                            </div>
                            <input
                              type="email"
                              name="email"
                              placeholder="you@example.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full bg-slate-700/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                                formErrors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-slate-600 focus:border-amber-400/50'
                              }`}
                            />
                            {formErrors.email && (
                              <p className="text-red-400 text-xs mt-1.5 font-medium">{formErrors.email}</p>
                            )}
                            {fieldsFilled.email && !formErrors.email && (
                              <p className="text-green-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                <CheckBadgeIcon className="h-3 w-3" /> Valid
                              </p>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-semibold text-slate-300">Phone Number</label>
                              <div 
                                className="relative group"
                                onMouseEnter={() => setHoveredTooltip('phone')}
                                onMouseLeave={() => setHoveredTooltip(null)}
                              >
                                <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-help hover:text-amber-400 transition-colors" />
                                {hoveredTooltip === 'phone' && (
                                  <div className="absolute right-0 top-6 bg-slate-900 border border-slate-600 rounded-lg p-2 text-xs text-slate-200 w-48 z-10 shadow-lg">
                                    10-digit Indian phone number
                                  </div>
                                )}
                              </div>
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="9876543210"
                              value={formData.phone}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField('phone')}
                              onBlur={() => setFocusedField(null)}
                              maxLength="10"
                              className={`w-full bg-slate-700/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                                formErrors.phone ? 'border-red-500/50 focus:ring-red-500/50' : 'border-slate-600 focus:border-amber-400/50'
                              }`}
                            />
                            {formErrors.phone && (
                              <p className="text-red-400 text-xs mt-1.5 font-medium">{formErrors.phone}</p>
                            )}
                            {fieldsFilled.phone && !formErrors.phone && (
                              <p className="text-green-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                <CheckBadgeIcon className="h-3 w-3" /> Valid
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Card Details Header */}
                        <div className="pt-4 border-t border-slate-600">
                          <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                            <LockClosedIcon className="h-4 w-4 text-amber-400" />
                            Card Details
                          </h3>
                        </div>

                        {/* Card Number */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-semibold text-slate-300">Card Number</label>
                            <div 
                              className="relative group"
                              onMouseEnter={() => setHoveredTooltip('card')}
                              onMouseLeave={() => setHoveredTooltip(null)}
                            >
                              <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-help hover:text-amber-400 transition-colors" />
                              {hoveredTooltip === 'card' && (
                                <div className="absolute right-0 top-6 bg-slate-900 border border-slate-600 rounded-lg p-2 text-xs text-slate-200 w-48 z-10 shadow-lg">
                                  16-digit card number shown on the front of your card
                                </div>
                              )}
                            </div>
                          </div>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="4242 4242 4242 4242"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('cardNumber')}
                            onBlur={() => setFocusedField(null)}
                            maxLength="19"
                            className={`w-full bg-slate-700/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 font-mono transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                              formErrors.cardNumber ? 'border-red-500/50 focus:ring-red-500/50' : 'border-slate-600 focus:border-amber-400/50'
                            }`}
                          />
                          <div className="flex items-center justify-between mt-1.5">
                            <div>
                              {formErrors.cardNumber && (
                                <p className="text-red-400 text-xs font-medium">{formErrors.cardNumber}</p>
                              )}
                              {fieldsFilled.cardNumber && !formErrors.cardNumber && (
                                <p className="text-green-400 text-xs font-medium flex items-center gap-1">
                                  <CheckBadgeIcon className="h-3 w-3" /> Valid
                                </p>
                              )}
                            </div>
                            {formData.cardNumber.length > 0 && (
                              <span className="text-xs text-slate-400">{formData.cardNumber.replace(/\s/g, '').length}/16</span>
                            )}
                          </div>
                        </div>

                        {/* Expiry and CVV */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-semibold text-slate-300">Expires</label>
                              <div 
                                className="relative group"
                                onMouseEnter={() => setHoveredTooltip('expiry')}
                                onMouseLeave={() => setHoveredTooltip(null)}
                              >
                                <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-help hover:text-amber-400 transition-colors" />
                                {hoveredTooltip === 'expiry' && (
                                  <div className="absolute right-0 top-6 bg-slate-900 border border-slate-600 rounded-lg p-2 text-xs text-slate-200 w-48 z-10 shadow-lg">
                                    Expiry date in MM/YY format (e.g., 12/25)
                                  </div>
                                )}
                              </div>
                            </div>
                            <input
                              type="text"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField('expiryDate')}
                              onBlur={() => setFocusedField(null)}
                              maxLength="5"
                              className={`w-full bg-slate-700/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 font-mono transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                                formErrors.expiryDate ? 'border-red-500/50 focus:ring-red-500/50' : 'border-slate-600 focus:border-amber-400/50'
                              }`}
                            />
                            {formErrors.expiryDate && (
                              <p className="text-red-400 text-xs mt-1.5 font-medium">{formErrors.expiryDate}</p>
                            )}
                            {fieldsFilled.expiryDate && !formErrors.expiryDate && (
                              <p className="text-green-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                <CheckBadgeIcon className="h-3 w-3" /> Valid
                              </p>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-semibold text-slate-300">CVV</label>
                              <div 
                                className="relative group"
                                onMouseEnter={() => setHoveredTooltip('cvv')}
                                onMouseLeave={() => setHoveredTooltip(null)}
                              >
                                <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-help hover:text-amber-400 transition-colors" />
                                {hoveredTooltip === 'cvv' && (
                                  <div className="absolute right-0 top-6 bg-slate-900 border border-slate-600 rounded-lg p-2 text-xs text-slate-200 w-48 z-10 shadow-lg">
                                    3-4 digit security code on the back of your card
                                  </div>
                                )}
                              </div>
                            </div>
                            <input
                              type="password"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField('cvv')}
                              onBlur={() => setFocusedField(null)}
                              maxLength="4"
                              className={`w-full bg-slate-700/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 font-mono transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                                formErrors.cvv ? 'border-red-500/50 focus:ring-red-500/50' : 'border-slate-600 focus:border-amber-400/50'
                              }`}
                            />
                            {formErrors.cvv && (
                              <p className="text-red-400 text-xs mt-1.5 font-medium">{formErrors.cvv}</p>
                            )}
                            {fieldsFilled.cvv && !formErrors.cvv && (
                              <p className="text-green-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                <CheckBadgeIcon className="h-3 w-3" /> Valid
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Security Info */}
                      <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5 flex items-start gap-4">
                        <ShieldCheckIcon className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                        <div>
                          <p className="text-blue-300 text-sm font-bold mb-1">Your Payment is 100% Secure</p>
                          <p className="text-blue-200 text-xs leading-relaxed">
                            Your payment information is encrypted with industry-leading SSL encryption. We never store card details on our servers. All transactions are processed securely through Razorpay, PCI DSS Level 1 certified payment gateway.
                          </p>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleRazorpayPayment}
                        disabled={processing}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 active:scale-95 ${
                          processing 
                            ? 'bg-slate-600/50 cursor-not-allowed opacity-60 hover:scale-100' 
                            : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
                        }`}
                      >
                        {processing ? (
                          <>
                            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-r-transparent rounded-full"></span>
                            <span>Processing Securely...</span>
                          </>
                        ) : (
                          <>
                            <LockClosedIcon className="h-5 w-5" />
                            <span>Pay ₹{totalAmount} & Confirm Reservation</span>
                          </>
                        )}
                      </button>

                      {/* Terms */}
                      <p className="text-center text-xs text-slate-400 mt-5">
                        By proceeding, you agree to our <a href="#" className="text-amber-400 hover:text-amber-300 transition font-semibold">Terms of Service</a> and <a href="#" className="text-amber-400 hover:text-amber-300 transition font-semibold">Privacy Policy</a>
                      </p>
                      </div>
                      )}

                      {/* QR/Barcode Payment Section */}
                      {paymentMethod === "barcode" && (
                      <div>
                        <div className="space-y-6">
                          <div className="text-center py-8 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl border-2 border-dashed border-amber-400/30 hover:border-amber-400/60 transition-all">
                            <div className="mb-3 relative inline-block">
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-xl opacity-20"></div>
                              <QrCodeIcon className="h-16 w-16 text-amber-400 relative" />
                            </div>
                            <p className="text-slate-300 font-semibold text-lg mb-1">QR Code or Barcode Payment</p>
                            <p className="text-slate-400 text-sm">Fast and secure payment with UPI</p>
                          </div>

                          {/* Barcode Input */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-semibold text-slate-300">Enter Barcode/QR Code</label>
                              <div 
                                className="relative group"
                                onMouseEnter={() => setHoveredTooltip('barcode')}
                                onMouseLeave={() => setHoveredTooltip(null)}
                              >
                                <InformationCircleIcon className="h-4 w-4 text-slate-400 cursor-help hover:text-amber-400 transition-colors" />
                                {hoveredTooltip === 'barcode' && (
                                  <div className="absolute right-0 top-6 bg-slate-900 border border-slate-600 rounded-lg p-2 text-xs text-slate-200 w-56 z-10 shadow-lg">
                                    Use a barcode scanner app or manually enter the UPI/payment ID from your payment method
                                  </div>
                                )}
                              </div>
                            </div>
                            <input
                              type="text"
                              value={barcodeResult}
                              onChange={(e) => {
                                setBarcodeResult(e.target.value);
                                setPaymentError("");
                              }}
                              onFocus={() => setFocusedField('barcode')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Scan QR code or enter barcode number..."
                              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 font-mono transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 hover:border-slate-500"
                            />
                            <p className="text-slate-400 text-xs mt-2 flex items-center gap-1">
                              <InformationCircleIcon className="h-3 w-3" />
                              You can use a mobile barcode scanner app or paste the code manually
                            </p>
                          </div>

                          {barcodeResult && (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-start gap-3 animate-pulse">
                              <CheckIcon className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-green-300 text-sm font-semibold">Code Detected</p>
                                <p className="text-slate-300 text-xs mt-1">Barcode: <span className="font-mono text-green-400 font-semibold">{barcodeResult.slice(0, 20)}...</span></p>
                                <p className="text-slate-400 text-xs mt-1">{barcodeResult.length} characters</p>
                              </div>
                            </div>
                          )}

                          {/* Payment Amount Display */}
                          <div className="bg-gradient-to-r from-slate-700/70 to-slate-800/70 rounded-xl p-5 border border-slate-600 hover:border-slate-500 transition-all">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-slate-300 text-sm font-medium">Amount to Pay</span>
                                <p className="text-slate-400 text-xs mt-1">{seatCount} guest(s) × ₹{pricePerSeat}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">₹{totalAmount}</span>
                              </div>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <button
                            onClick={handleBarcodePayment}
                            disabled={processing || !barcodeResult}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 active:scale-95 ${
                              processing || !barcodeResult
                                ? 'bg-slate-600/50 cursor-not-allowed opacity-60 hover:scale-100' 
                                : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
                            }`}
                          >
                            {processing ? (
                              <>
                                <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-r-transparent rounded-full"></span>
                                Processing Payment...
                              </>
                            ) : (
                              <>
                                <CheckCircleIcon className="h-5 w-5" />
                                Complete Payment
                              </>
                            )}
                          </button>

                          {/* Info Box */}
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 flex items-start gap-3">
                            <InformationCircleIcon className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-blue-300 text-sm font-semibold mb-2">How to Use</p>
                              <ol className="text-blue-200 text-xs space-y-1.5">
                                <li className="flex gap-2"><span className="font-bold">1.</span> Open your payment app (Google Pay, PhonePe, etc.)</li>
                                <li className="flex gap-2"><span className="font-bold">2.</span> Scan the restaurant's QR code or get your UPI ID</li>
                                <li className="flex gap-2"><span className="font-bold">3.</span> Paste the barcode/transaction ID above</li>
                                <li className="flex gap-2"><span className="font-bold">4.</span> Click "Complete Payment" to confirm</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Footer Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
              <StarIcon className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Instant Confirmation</p>
              <p className="text-slate-400 text-sm">Get confirmation within seconds</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
              <ShieldCheckIcon className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <p className="text-white font-semibold">100% Secure</p>
              <p className="text-slate-400 text-sm">Powered by Razorpay</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
              <CheckCircleIcon className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Money-back Guarantee</p>
              <p className="text-slate-400 text-sm">If you're not satisfied</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-slate-900"><p className="text-white">Loading...</p></div>}>
      <PaymentPageContent />
    </Suspense>
  );
}
