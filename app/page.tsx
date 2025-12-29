import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PopularRestaurants from "./components/PopularRestaurants";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularRestaurants />
      <Footer />
    </>
  );
}
