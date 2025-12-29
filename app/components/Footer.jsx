import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-gray-400">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            SeatDine
          </h2>
          <p className="text-sm leading-relaxed">
            Book restaurant seats visually just like cinema tickets.
            Fast, simple and secure seat reservation experience.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Restaurants</li>
            <li className="hover:text-white cursor-pointer">Book Seat</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
          <div className="flex gap-4">
            <div className="p-3 bg-white/10 rounded-full hover:bg-red-500 transition cursor-pointer">
              <FaFacebookF className="text-white text-sm" />
            </div>
            <div className="p-3 bg-white/10 rounded-full hover:bg-red-500 transition cursor-pointer">
              <FaInstagram className="text-white text-sm" />
            </div>
            <div className="p-3 bg-white/10 rounded-full hover:bg-red-500 transition cursor-pointer">
              <FaTwitter className="text-white text-sm" />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-500">
        © 2025 SeatDine. All rights reserved.
      </div>
    </footer>
  );
}
