import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { amount, currency, receipt } = await request.json();

    // Validate input
    if (!amount || !currency || !receipt) {
      return Response.json(
        { error: "Missing required fields: amount, currency, receipt" },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount < 100) {
      return Response.json(
        { error: "Minimum order amount is ₹1" },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order with improved error handling
    const order = await razorpay.orders.create({
      amount: amount, // Amount should be in paise
      currency: currency,
      receipt: receipt,
      notes: {
        policy_name: "Restaurant Booking",
        created_at: new Date().toISOString(),
      },
    });

    return Response.json(order, { status: 200 });
  } catch (error) {
    console.error("Order creation error:", error);
    return Response.json(
      {
        error: error.message || "Failed to create payment order",
        code: error.code,
      },
      { status: 500 }
    );
  }
}
