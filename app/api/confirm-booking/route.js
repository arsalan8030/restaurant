import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  await connectDB();

  const {
    date,
    timeSlot,
    seats,
    amount,
    paymentId,
  } = await req.json();

  // 1️⃣ Check seat conflict AGAIN
  const conflict = await Booking.findOne({
    date,
    timeSlot,
    seats: { $in: seats },
  });

  if (conflict) {
    return Response.json(
      { message: "Seat already booked" },
      { status: 400 }
    );
  }

  // 2️⃣ Save booking
  await Booking.create({
    date,
    timeSlot,
    seats,
    amount,
    paymentId,
  });

  return Response.json({ message: "Booking confirmed" });
}
