"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  BookOpen,
  LogOut,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart.store";
import { useUserStore } from "@/store/user.store";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useUserStore();

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Collections", link: "/collections" },
    { label: "Contact", link: "/contact" },
  ];

  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const handleLogout = () => {
   logout()
    setIsUserMenuOpen(false);
    toast.success("Logout successfull")
    router.push("/auth/login");
  };

  return (
    <nav className="bg-linear-to-r from-indigo-900 via-purple-900 to-indigo-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="bg-linear-to-br from-yellow-400 to-orange-500 p-2 rounded-xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-white">
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
                className={`text-white hover:text-yellow-400 font-medium text-lg ${
                  pathname === item.link ? "text-yellow-400" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4 relative">
            <Link href="/cart">
              <button className="p-3 hover:bg-white/10 rounded-xl relative">
                <ShoppingCart className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-3 rounded-full hover:bg-white/10"
                >
                  <UserCircle className="w-7 h-7 text-white" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl overflow-hidden">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>

                    <Link
                      href="/user/books"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login">
                <button className="bg-linear-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                  Login
                </button>
              </Link>
            )}
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-6 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white text-lg"
              >
                {item.label}
              </Link>
            ))}

            {!user && (
              <Link href="/auth/login">
                <button className="w-full bg-linear-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold">
                  Login
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
