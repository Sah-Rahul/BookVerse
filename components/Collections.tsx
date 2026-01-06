"use client";

import { useEffect, useState } from "react";
import { Filter, ShoppingCart, Grid3x3, List } from "lucide-react";
import axios from "axios";
import { BOOK_API_END_POINT } from "@/constant/books";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import { toast } from "sonner";

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

const Collections = () => {
  const [allBooks, setAllBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const getFinalPrice = (price: number, discount: number) => price - discount;

  const getDiscountPercentage = (price: number, discount: number) =>
    discount > 0 ? Math.round((discount / price) * 100) : 0;

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(BOOK_API_END_POINT);
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

  const categories = [
    "all",
    ...Array.from(new Set(allBooks.map((b) => b.category))),
  ];

  const filteredBooks = allBooks.filter((book) => {
    const finalPrice = getFinalPrice(book.price, book.discount);

    const matchCategory =
      selectedCategory === "all" || book.category === selectedCategory;

    const matchPrice =
      finalPrice >= priceRange[0] && finalPrice <= priceRange[1];

    return matchCategory && matchPrice;
  });
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (book: IBook) => {
    addItem({
      bookId: book._id,
      title: book.title,
      price: book.price - book.discount,
      image: book.image,
      quantity: 1,
    });

    toast.success("Item added in your cart");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 flex gap-8">
        <aside className="w-64 space-y-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Filter size={18} /> Categories
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    selectedCategory === cat
                      ? "bg-indigo-100 text-indigo-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat === "all" ? "All Books" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-3">Price Range</h3>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>Rs0</span>
              <span>Rs{priceRange[1]}</span>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white p-4 rounded-xl shadow flex justify-between mb-6">
            <p>
              Showing{" "}
              <span className="font-bold text-indigo-600">
                {filteredBooks.length}
              </span>{" "}
              books
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-400"
                }`}
              >
                <Grid3x3 />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-400"
                }`}
              >
                <List />
              </button>
            </div>
          </div>

          {loading && (
            <p className="text-center text-gray-600">Loading books...</p>
          )}

          {!loading && viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => {
                const finalPrice = getFinalPrice(book.price, book.discount);
                const discountPercent = getDiscountPercentage(
                  book.price,
                  book.discount
                );

                return (
                  <div
                    key={book._id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition"
                  >
                    <Link href={`/book/details/${book._id}`}>
                      <img
                        src={book.image}
                        className="h-72 w-full object-cover rounded-t-xl"
                      />
                    </Link>

                    <div className="p-4">
                      <h3 className="font-bold text-lg">{book.title}</h3>
                      <p className="text-gray-600">{book.authorName}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-indigo-600">
                            Rs{finalPrice}
                          </span>
                          {book.discount > 0 && (
                            <span className="line-through text-gray-400">
                              Rs{book.price}
                            </span>
                          )}
                        </div>

                        {discountPercent > 0 && (
                          <span className="text-green-600 text-sm">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(book)}
                        disabled={book.stock === 0}
                        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg flex justify-center gap-2 disabled:opacity-50"
                      >
                        <ShoppingCart size={18} />
                        {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && viewMode === "list" && (
            <div className="space-y-4">
              {filteredBooks.map((book) => {
                const finalPrice = getFinalPrice(book.price, book.discount);
                const discountPercent = getDiscountPercentage(
                  book.price,
                  book.discount
                );

                return (
                  <div
                    key={book._id}
                    className="bg-white p-5 rounded-xl shadow flex gap-6"
                  >
                    <img
                      src={book.image}
                      className="w-40 h-56 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{book.title}</h3>
                      <p className="text-gray-600">{book.authorName}</p>

                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-2xl font-bold text-indigo-600">
                          Rs{finalPrice}
                        </span>
                        {book.discount > 0 && (
                          <span className="line-through text-gray-400">
                            Rs{book.price}
                          </span>
                        )}
                        {discountPercent > 0 && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg flex gap-2">
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Collections;
