"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { BOOK_API_END_POINT } from "@/constant/books";
import Loading from "./Loading";

interface Book {
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

const BookDetails = () => {
  const { id } = useParams();  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    try {
      const { data } = await axios.get(
        `${BOOK_API_END_POINT}/${id}`
      );
      setBook(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBook();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!book) {
    return <Loading />;
  }

  const finalPrice = book.price - book.discount;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={book.image}
          alt={book.title}
          className="rounded-xl shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-4">
            by {book.authorName}
          </p>

          <p className="text-gray-500 mb-4">
            Category: {book.category}
          </p>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-indigo-600">
              Rs{finalPrice}
            </span>
            {book.discount > 0 && (
              <span className="line-through text-gray-400">
                Rs{book.price}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6">
            {book.description || "No description available"}
          </p>

          <button
            disabled={book.stock === 0}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg disabled:opacity-50"
          >
            {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
