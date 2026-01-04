"use client";

import { BOOK_API_END_POINT } from "@/constant/books";
import axios from "axios";
import {
  ShoppingCart,
  Search,
  Truck,
  Shield,
  HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Category from "./Category";

export interface IBook {
  _id: string;
  title: string;
  authorName: string;
  price: number;
  discount: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
}

const Home = () => {
  const [allBooks, setAllBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders above ₹499" },
    { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      desc: "Dedicated customer service",
    },
  ];

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BOOK_API_END_POINT}`);
      setAllBooks(data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const featuredBooks = allBooks.slice(0, 3);

  const getFinalPrice = (price: number, discount: number) => {
    return price - discount;
  };

  const getDiscountPercentage = (price: number, discount: number) => {
    if (discount === 0) return 0;
    return Math.round((discount / price) * 100);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEydjEyaDEyVjMwem0wLTEyaC0xMlYzNmgxMlYxOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-block">
                <span className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded-full text-sm font-bold">
                  📖 New Year Sale - Up to 40% OFF
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                Discover Your Next
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400">
                  Great Adventure
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-purple-100">
                Explore thousands of books across all genres. From timeless
                classics to modern bestsellers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search books, authors, ISBN..."
                    className="w-full pl-14 pr-6 py-5 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-400 text-lg shadow-2xl"
                  />
                </div>
                <button className="bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-10 py-5 rounded-2xl font-bold text-lg text-white shadow-2xl hover:shadow-3xl transition transform hover:scale-105">
                  Explore Now
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{allBooks.length}+</div>
                  <div className="text-purple-200 text-sm">Books Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-purple-200 text-sm">Happy Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9★</div>
                  <div className="text-purple-200 text-sm">Customer Rating</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-500 rounded-3xl blur-3xl opacity-30"></div>
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=800&fit=crop"
                  alt="Books"
                  className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Category allBooks={allBooks} />

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-2">
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
                  Bestsellers
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked by our expert curators
              </p>
            </div>
            <Link href={"/collections"}>
              <button className="mt-6 md:mt-0 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
                View All Books →
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-12 w-12 border-4 border-t-transparent border-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : featuredBooks.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">No books available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBooks.map((book) => {
                const finalPrice = getFinalPrice(book.price, book.discount);
                const discountPercentage = getDiscountPercentage(
                  book.price,
                  book.discount
                );

                return (
                  <div
                    key={book._id}
                    className="group bg-linear-to-br from-white to-gray-50 rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden transform hover:-translate-y-2 duration-300 border border-gray-100"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-linear-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {book.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition shadow-lg">
                          <svg
                            className="w-6 h-6 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                      {book.stock < 10 && book.stock > 0 && (
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Only {book.stock} left!
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-4 font-medium">
                        {book.authorName}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-3xl font-bold text-indigo-600">
                            Rs{finalPrice}
                          </span>
                          {book.discount > 0 && (
                            <span className="text-lg text-gray-400 line-through ml-2">
                              Rs{book.price}
                            </span>
                          )}
                        </div>
                        {discountPercentage > 0 && (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                            {discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                      <button
                        className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={book.stock === 0}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>
                          {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Join Our Reading Community
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get exclusive deals, new arrivals, and personalized recommendations
            delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-5 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-400 text-lg shadow-2xl"
            />
            <button className="bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-10 py-5 rounded-xl font-bold text-lg text-white shadow-2xl transition transform hover:scale-105">
              Subscribe Now
            </button>
          </div>
          <p className="text-purple-200 mt-4 text-sm">
            🎁 Get 15% off on your first purchase when you subscribe!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
