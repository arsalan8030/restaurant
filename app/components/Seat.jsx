// components/Seat.jsx

export default function Seat({
  label,
  isSelected,
  isBooked,
  isHovered,
  onSelect,
  onHover,
  onLeave,
}) {
  const getBaseStyle = () => {
    if (isBooked) {
      return "bg-slate-300 text-slate-600 cursor-not-allowed opacity-60";
    }
    if (isSelected) {
      return "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg scale-110 ring-2 ring-blue-300";
    }
    if (isHovered) {
      return "bg-gradient-to-br from-green-400 to-green-500 text-white shadow-md scale-105";
    }
    return "bg-gradient-to-br from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600 shadow-sm";
  };

  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      disabled={isBooked}
      className={`
        w-14 h-14 rounded-lg text-sm font-bold
        flex items-center justify-center
        transition-all duration-200 ease-out
        transform
        ${getBaseStyle()}
        ${!isBooked && "cursor-pointer"}
      `}
      aria-label={`Seat ${label}${isBooked ? " (booked)" : ""}`}
      title={isBooked ? "Seat already booked" : `Select seat ${label}`}
    >
      {label}
    </button>
  );
}
