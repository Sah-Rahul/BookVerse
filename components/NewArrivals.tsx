"use client";

import   { useState } from "react";
import { Book, ShoppingCart, Heart, Star } from "lucide-react";

type BookType = {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  discount: string;
};

const NewArrivals = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const books: BookType[] = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 1299,
      originalPrice: 1599,
      rating: 4.5,
      reviews: 2341,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      category: "Fiction",
      discount: "19% OFF",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 899,
      originalPrice: 1199,
      rating: 4.8,
      reviews: 5678,
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
      category: "Self-Help",
      discount: "25% OFF",
    },
    {
      id: 3,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 699,
      originalPrice: 999,
      rating: 4.7,
      reviews: 3456,
      image:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop",
      category: "Finance",
      discount: "30% OFF",
    },
    {
      id: 4,
      title: "Project Hail Mary",
      author: "Andy Weir",
      price: 1499,
      originalPrice: 1899,
      rating: 4.9,
      reviews: 4234,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      category: "Sci-Fi",
      discount: "21% OFF",
    },
    {
      id: 5,
      title: "Ikigai",
      author: "Héctor García",
      price: 599,
      originalPrice: 799,
      rating: 4.6,
      reviews: 2987,
      image:
        "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400&h=600&fit=crop",
      category: "Philosophy",
      discount: "25% OFF",
    },
    {
      id: 6,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 999,
      originalPrice: 1299,
      rating: 4.4,
      reviews: 6789,
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      category: "Thriller",
      discount: "23% OFF",
    },
  ];

  const toggleWishlist = (bookId: number) => {
    setWishlist((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const addToCart = (bookId: number) => {
    if (!cart.includes(bookId)) {
      setCart((prev) => [...prev, bookId]);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50">
 
      <div className="bg-linear-to-r from-amber-600 to-orange-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Book className="w-8 h-8" />
            <h1 className="text-4xl font-bold">New Arrivals</h1>
          </div>
          <p className="text-amber-100 max-w-2xl mx-auto">
            Discover our latest collection of bestsellers and hidden gems
          </p>
        </div>
      </div>
 
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-80 object-cover"
                />

                <button
                  onClick={() => toggleWishlist(book.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlist.includes(book.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-xl mb-1">{book.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{book.author}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{book.rating}</span>
                  <span className="text-xs text-gray-400">
                    ({book.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold">₹{book.price}</span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{book.originalPrice}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(book.id)}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                    cart.includes(book.id)
                      ? "bg-green-500 text-white"
                      : "bg-linear-to-r from-amber-600 to-orange-600 text-white"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cart.includes(book.id) ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
