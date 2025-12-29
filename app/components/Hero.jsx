import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with zoom animation */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 animate-heroZoom"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559339352-11d035aa65de')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-slideUp">
          Reserve Your Restaurant Seat <br />
          <span className="text-red-500">Like a Cinema Ticket</span>
        </h1>

        <p className="text-gray-200 text-lg mb-10 animate-fadeIn delay-200">
          Select date • Choose seats • Pay instantly
        </p>

        {/* CTA Button */}
        <Link
          href="/book-seat"
          className="relative inline-block bg-red-500 px-12 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition-all duration-300 animate-fadeIn delay-400 group"
        >
          Book Seat Now
          <span className="absolute inset-0 rounded-full bg-red-500 blur-lg opacity-40 group-hover:opacity-70 transition"></span>
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center text-white animate-bounceSlow">
        <span className="text-xs mb-2">Scroll</span>
        <div className="w-5 h-8 border border-white rounded-full flex justify-center">
          <span className="w-1 h-2 bg-white rounded-full mt-1 animate-scrollDot"></span>
        </div>
      </div>
    </section>
  );
}
