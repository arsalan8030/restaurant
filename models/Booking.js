import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  date: String,
  timeSlot: String,
  seats: [String],
  amount: Number,
  paymentId: { type: String, unique: true },
  status: { type: String, default: "confirmed" },
}, { timestamps: true });

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
