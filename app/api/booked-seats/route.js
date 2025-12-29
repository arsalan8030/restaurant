import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  const bookings = await Booking.find({ date, timeSlot: time });

  const bookedSeats = bookings.flatMap(b => b.seats);

  return Response.json(bookedSeats);
}
