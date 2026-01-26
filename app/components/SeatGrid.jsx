// components/SeatGrid.jsx

import Seat from "./Seat";

export default function SeatGrid({
  seats,
  selectedSeats,
  toggleSeat,
  hoveredSeat,
  setHoveredSeat,
}) {
  // Group seats by row
  const groupedSeats = {};
  seats.forEach((seat) => {
    const row = seat.label.charAt(0);
    if (!groupedSeats[row]) {
      groupedSeats[row] = [];
    }
    groupedSeats[row].push(seat);
  });

  const rows = Object.keys(groupedSeats).sort();

  return (
    <div className="space-y-6">
      {rows.map((row) => (
        <div key={row} className="flex items-center justify-center gap-2">
          <span className="w-8 text-center font-bold text-slate-600 text-lg">{row}</span>
          <div className="flex gap-3">
            {groupedSeats[row].map((seat) => (
              <Seat
                key={seat.id}
                label={seat.label}
                isSelected={selectedSeats.includes(seat.label)}
                isBooked={seat.booked}
                isHovered={hoveredSeat === seat.label}
                onSelect={() => !seat.booked && toggleSeat(seat.label)}
                onHover={() => setHoveredSeat(seat.label)}
                onLeave={() => setHoveredSeat(null)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
