// components/Seat.jsx

export default function Seat({ label, isSelected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-12 h-12 rounded-lg text-sm font-semibold
        flex items-center justify-center
        transition-all duration-200
        ${
          isSelected
            ? "bg-blue-600 text-white scale-105 shadow-md"
            : "bg-green-500 text-white hover:bg-green-600"
        }
      `}
      aria-label={`Seat ${label}`}
    >
      {label}
    </button>
  );
}
