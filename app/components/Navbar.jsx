"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HiMenuAlt3,
  HiX,
  HiOutlineSearch,
  HiUserCircle,
} from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname !== "/") return null;

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-50">
      {/* Navbar */}
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-extrabold">
              WF
            </div>
            <div className=" sm:block">
              <div className="text-white font-bold text-xxl leading-tight">
                BookMyTable
              </div>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex  items-center gap-6 flex-1">
            {/* <ul className="flex items-center  gap-6 text-sm text-gray-200 font-medium">
              {["home", "restaurants"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="relative px-1 py-1 hover:text-white transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-500 hover:after:w-full after:transition-all"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul> */}

            <div className="flex items-center gap-3 ml-auto">
              {/* <div className="hidden lg:flex items-center bg-white/90 rounded-full px-3 py-1 shadow-sm">
                <HiOutlineSearch className="text-gray-700 mr-2" />
                <input
                  aria-label="Search"
                  placeholder="Search restaurants"
                  className="bg-transparent outline-none text-sm text-gray-800 w-44"
                />
              </div> */}

              <Link
                href="/book"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg transition-transform hover:scale-105"
              >
                Book Seat
              </Link>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center md:hidden gap-2">
            {/* <button
              className="p-2 rounded-full bg-white/10 text-white"
              aria-label="Search"
            >
              <HiOutlineSearch />
            </button> */}
            <button
              className="p-2 rounded-full bg-white/10 text-white"
              aria-label="Menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute mt-3 left-1/2 -translate-x-1/2 w-[94%] animate-slideDown">
          <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col gap-3 text-white font-medium">
              {["home", "restaurants"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-white/5"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}

              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="mt-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-2 rounded-full font-bold shadow"
              >
                Book Seat
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
