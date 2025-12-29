import Seat from "./Seat";

export default function SeatGrid({ seats, selectedSeats, toggleSeat }) {
  return (
    <div className="grid grid-cols-5 gap-4 justify-center">
      {seats.map((seat) => (
        <Seat
          key={seat.id}
          seat={seat.label}
          booked={seat.booked}
          selected={selectedSeats.includes(seat.label)}
          onClick={() => toggleSeat(seat.label)}
        />
      ))}
    </div>
  );
}
