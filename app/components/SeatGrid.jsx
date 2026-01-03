// components/SeatGrid.jsx

import Seat from "./Seat";

export default function SeatGrid({
  seats,
  selectedSeats,
  onToggleSeat,
}) {
  // Only show available seats
  const availableSeats = seats.filter((seat) => !seat.booked);

  return (
    <div className="grid grid-cols-5 gap-4 justify-center">
      {availableSeats.map((seat) => (
        <Seat
          key={seat.id}
          label={seat.label}
          isSelected={selectedSeats.includes(seat.label)}
          onSelect={() => onToggleSeat(seat.label)}
        />
      ))}
    </div>
  );
}
