"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Show navbar only on homepage
  if (pathname !== "/") return null;

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-red-500 tracking-wide">
            BookMyTable
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-700">
          <a href="#home" className="hover:text-red-500 transition">
            Home
          </a>
          <a href="#restaurants" className="hover:text-red-500 transition">
            Restaurants
          </a>
          <a href="#contact" className="hover:text-red-500 transition">
            Contact
          </a>
        </div>

        {/* CTA + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/book-seat"
            className="hidden md:inline-block bg-red-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition shadow"
          >
            Book Seat
          </Link>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium">
            <a href="#home" onClick={() => setOpen(false)}>Home</a>
            <a href="#restaurants" onClick={() => setOpen(false)}>Restaurants</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>

            <Link
              href="/book-seat"
              onClick={() => setOpen(false)}
              className="mt-2 bg-red-500 text-white text-center py-2 rounded-full hover:bg-red-600 transition"
            >
              Book Seat
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
