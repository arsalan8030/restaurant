import crypto from "crypto";
import { connectDB } from "@/lib/db";

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    // Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(
        JSON.stringify({ error: "Missing payment details" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return new Response(
        JSON.stringify({ error: "Payment signature verification failed" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to database and save payment record
    await connectDB();

    // Save payment record (optional - for audit trail)
    console.log("Payment verified:", {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      timestamp: new Date(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Payment verification failed",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
