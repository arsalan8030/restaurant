import Link from "next/link";

export default function PopularRestaurants() {
  const restaurants = [
    {
      name: "The Royal Spice",
      city: "Kanpur",
      img: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      booked: "120+ seats booked today",
      rating: "4.6",
    },
    {
      name: "Urban Tandoor",
      city: "Lucknow",
      img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
      booked: "95+ seats booked today",
      rating: "4.5",
    },
    {
      name: "Cafe Aroma",
      city: "Delhi",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      booked: "150+ seats booked today",
      rating: "4.8",
    },
  ];

  return (
    <section id="restaurants" className="py-20 bg-gray-50">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Popular Restaurants
        </h2>
        <p className="text-gray-500 mt-3">
          Book seats at trending restaurants near you
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto px-6">
        {restaurants.map((res, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={res.img}
                alt={res.name}
                className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                ⭐ {res.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                {res.name}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {res.city}
              </p>

              {/* Booking Status */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm bg-green-100 text-green-700 px-4 py-1 rounded-full">
                  {res.booked}
                </span>

                <Link
                  href="/book-seat"
                  className="text-sm font-semibold text-red-500 hover:underline"
                >
                  Book Seat →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
