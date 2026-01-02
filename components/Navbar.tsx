"use client";
import { useState } from "react";
import { ShoppingCart, Menu, X, User, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Collections", link: "/collections" }, 
    { label: "New Arrivals", link: "/new-arrivals" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <nav className="bg-linear-to-r from-indigo-900 via-purple-900 to-indigo-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={"/"}>
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-yellow-400 to-orange-500 p-2 rounded-xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  BookVerse
                </span>
                <p className="text-xs text-purple-200">
                  Your Literary Universe
                </p>
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className={`text-white hover:text-yellow-400 transition font-medium text-lg ${
                  pathname === item.link ? "text-yellow-400" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-3 hover:bg-white/10 rounded-xl transition relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-linear-to-r from-orange-500 to-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Login</span>
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-6 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className={`block text-white hover:text-yellow-400 transition font-medium text-lg ${
                  pathname === item.link ? "text-yellow-400" : ""
                }`}
                onClick={() => setIsMenuOpen(false)} // close menu on click
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full bg-linear-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold mt-4">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
