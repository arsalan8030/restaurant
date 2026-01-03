import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden
      bg-gradient-to-br from-black via-red-900 to-black"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
          Reserve Tables.
          <br />
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Book Dining Experiences.
          </span>
        </h1>

        <p className="text-base sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
          Discover premium restaurants and book tables visually —
          just like booking cinema tickets.
        </p>
      </div>

      {/* SEARCH CARD (NOT ABSOLUTE ❗) */}
      <div className="relative z-20 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div
            className="bg-white/15 backdrop-blur-2xl border border-white/30
            rounded-3xl shadow-2xl p-6 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* City */}
              <div>
                <label className="text-white text-xs font-bold uppercase tracking-widest mb-2 block">
                  City
                </label>
                <select className="w-full bg-white rounded-xl px-4 py-3 font-semibold text-gray-900 focus:ring-2 focus:ring-red-500">
                  <option>Kanpur</option>
                  {/* <option>Delhi</option>
                  <option>Mumbai</option> */}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="text-white text-xs font-bold uppercase tracking-widest mb-2 block">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full bg-white rounded-xl px-4 py-3 font-semibold text-gray-900 focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Time */}
              <div>
                <label className="text-white text-xs font-bold uppercase tracking-widest mb-2 block">
                  Time
                </label>
                <select className="w-full bg-white rounded-xl px-4 py-3 font-semibold text-gray-900 focus:ring-2 focus:ring-red-500">
                  <option>7:00 PM</option>
                  <option>7:30 PM</option>
                  <option>8:00 PM</option>
                  <option>9:00 PM</option>
                </select>
              </div>

              {/* Guests */}
              <div>
                <label className="text-white text-xs font-bold uppercase tracking-widest mb-2 block">
                  Guests
                </label>
                <select className="w-full bg-white rounded-xl px-4 py-3 font-semibold text-gray-900 focus:ring-2 focus:ring-red-500">
                  <option>2 People</option>
                  <option>4 People</option>
                  <option>6 People</option>
                  <option>8+ People</option>
                </select>
              </div>

              {/* Button */}
              <div className="flex items-end">
                <Link
                  href="#restaurants"
                  className="w-full text-center bg-gradient-to-r from-red-500 to-red-700
                  hover:from-red-600 hover:to-red-800 text-white font-extrabold
                  py-3 rounded-xl shadow-xl transition-transform hover:scale-105"
                >
                  Explore Restaurants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white opacity-80">
        <div className="w-6 h-10 border border-white rounded-full flex justify-center">
          <span className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></span>
        </div>
      </div>
    </section>
  );
}
