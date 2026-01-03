import Link from "next/link";

export default function PopularRestaurants() {
  const restaurants = [
    {
      name: "Gravity – The Disco",
      city: "Kanpur",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1e/84/32/52/g.jpg?w=300&h=300&s=1",
      booked: "120+ seats booked today",
      rating: "5.0",
    },
    {
      name: "Dhuaan",
      city: "Kanpur",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/b6/6d/8d/caption.jpg?w=300&h=300&s=1",
      booked: "95+ seats booked today",
      rating: "5.0",
    },
    {
      name: "Red Olive Restaurant",
      city: "Kanpur",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/da/f2/9b/caption.jpg?w=300&h=300&s=1",
      booked: "95+ seats booked today",
      rating: "4.9",
    },
  ];

  return (
    <section
      id="restaurants"
      className="relative py-28 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative z-10 text-center mb-20 max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
          Premium Dining <br />
          <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
            Awaits You
          </span>
        </h2>
        <p className="text-base md:text-lg text-gray-400">
          Handpicked restaurants with exquisite ambiance, exceptional cuisine,
          and seamless seat reservations.
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid gap-10 md:grid-cols-3 max-w-7xl mx-auto px-6">
        {restaurants.map((res, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden
            shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105
            border border-gray-700/50 hover:border-red-500/50"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={res.img}
                alt={`${res.name} restaurant`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-125"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

              {/* Rating */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                ⭐ {res.rating}
              </div>

              {/* Hot */}
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider animate-pulse">
                🔥 Hot Pick
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pb-8">
              <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition mb-2">
                {res.name}
              </h3>

              <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                📍 {res.city}
              </p>

              <div className="mb-6">
                <span className="inline-block text-xs bg-green-500/20 border border-green-500/50 text-green-400 px-3 py-1 rounded-full font-semibold">
                  ✓ {res.booked}
                </span>
              </div>

              <Link
                href="/book"
                className="block text-center bg-gradient-to-r from-red-500 to-red-600
                hover:from-red-600 hover:to-red-700 text-white font-extrabold
                py-3 rounded-2xl shadow-lg transition-transform hover:scale-105
                text-sm uppercase tracking-wide"
              >
                Reserve Now 🎯
              </Link>
            </div>

            {/* Shine */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 -translate-x-full group-hover:translate-x-full transition duration-700"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
