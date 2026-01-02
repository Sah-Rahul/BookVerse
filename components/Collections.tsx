"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Heart,
  Grid3x3,
  List,
} from "lucide-react";

const Collections = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const categories = [
    { id: "all", name: "All Books", count: 156 },
    { id: "fiction", name: "Fiction", count: 45 },
    { id: "non-fiction", name: "Non-Fiction", count: 38 },
    { id: "self-help", name: "Self-Help", count: 28 },
    { id: "business", name: "Business", count: 22 },
    { id: "biography", name: "Biography", count: 15 },
    { id: "science", name: "Science", count: 8 },
  ];

  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 2450,
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop",
      category: "fiction",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 699,
      originalPrice: 999,
      rating: 4.9,
      reviews: 3200,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop",
      category: "self-help",
    },
    {
      id: 3,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 549,
      originalPrice: 799,
      rating: 4.7,
      reviews: 1890,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
      category: "business",
    },
    {
      id: 4,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: 749,
      originalPrice: 1099,
      rating: 4.8,
      reviews: 2780,
      image:
        "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=500&fit=crop",
      category: "non-fiction",
    },
    {
      id: 5,
      title: "Think Like a Monk",
      author: "Jay Shetty",
      price: 649,
      originalPrice: 899,
      rating: 4.6,
      reviews: 1560,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      category: "self-help",
    },
    {
      id: 6,
      title: "Deep Work",
      author: "Cal Newport",
      price: 599,
      originalPrice: 849,
      rating: 4.7,
      reviews: 2100,
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop",
      category: "business",
    },
    {
      id: 7,
      title: "Steve Jobs",
      author: "Walter Isaacson",
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 3450,
      image:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=500&fit=crop",
      category: "biography",
    },
    {
      id: 8,
      title: "Educated",
      author: "Tara Westover",
      price: 699,
      originalPrice: 999,
      rating: 4.9,
      reviews: 2890,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      category: "biography",
    },
    {
      id: 9,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 449,
      originalPrice: 699,
      rating: 4.7,
      reviews: 5600,
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      category: "fiction",
    },
  ];

  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Our Collections
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Discover amazing books across all genres
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                className="w-full pl-14 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-400 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition ${
                      selectedCategory === cat.id
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-sm">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Price Range
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex">
                      {[...Array(rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">& Up</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-gray-700 font-medium">
                Showing{" "}
                <span className="text-indigo-600 font-bold">
                  {filteredBooks.length}
                </span>{" "}
                books
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Sort: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Rating: High to Low</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition ${
                      viewMode === "grid"
                        ? "bg-indigo-100 text-indigo-600"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition ${
                      viewMode === "list"
                        ? "bg-indigo-100 text-indigo-600"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden transform hover:-translate-y-2 duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                      />
                      <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition shadow-lg">
                        <Heart className="w-5 h-5 text-red-500" />
                      </button>
                      <div className="absolute top-4 left-4">
                        <span className="bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {Math.round(
                            (1 - book.price / book.originalPrice) * 100
                          )}
                          % OFF
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{book.author}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(book.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {book.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({book.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-indigo-600">
                            ₹{book.price}
                          </span>
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ₹{book.originalPrice}
                          </span>
                        </div>
                      </div>
                      <button className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col md:flex-row gap-6"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full md:w-48 h-64 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {book.title}
                          </h3>
                          <p className="text-lg text-gray-600">{book.author}</p>
                        </div>
                        <button className="p-3 hover:bg-gray-100 rounded-full transition">
                          <Heart className="w-6 h-6 text-red-500" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(book.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-gray-700">
                          {book.rating}
                        </span>
                        <span className="text-gray-500">
                          ({book.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-3xl font-bold text-indigo-600">
                          ₹{book.price}
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          ₹{book.originalPrice}
                        </span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                          {Math.round(
                            (1 - book.price / book.originalPrice) * 100
                          )}
                          % OFF
                        </span>
                      </div>
                      <button className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition flex items-center space-x-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
export default Collections;
