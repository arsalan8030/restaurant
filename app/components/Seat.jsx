export default function Seat({ seat, booked, selected, onClick }) {
  return (
    <button
      disabled={booked}
      onClick={onClick}
      className={`
        w-10 h-10 rounded text-sm font-bold
        ${booked ? "bg-red-500 text-white" :
          selected ? "bg-blue-500 text-white" :
          "bg-green-500 text-white"}
      `}
    >
      {seat}
    </button>
  );
}
