"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ShoppingCart, TrendingUp } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  authorName: string;
  price: number;
  discount: number;
  image: string;
  category: string;
  purchaseCount: number;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalSpent: 0,
    mostPurchased: "",
  });

  const fetchUserBooks = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/user/books");
      setBooks(data.data || []);

      // Calculate stats
      const total = data.data.length;
      const spent = data.data.reduce(
        (acc: number, book: Book) =>
          acc + (book.price - book.discount) * book.purchaseCount,
        0
      );
      const mostPurchased =
        data.data.sort(
          (a: Book, b: Book) => b.purchaseCount - a.purchaseCount
        )[0]?.title || "N/A";

      setStats({
        totalBooks: total,
        totalSpent: spent,
        mostPurchased,
      });
    } catch (error) {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
        <p className="text-gray-500 mt-1">Books you've purchased</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Books
            </CardTitle>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBooks}</div>
            <p className="text-xs text-gray-500 mt-1">Books purchased</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Spent
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs{stats.totalSpent}</div>
            <p className="text-xs text-gray-500 mt-1">Lifetime spending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Most Purchased
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">
              {stats.mostPurchased}
            </div>
            <p className="text-xs text-gray-500 mt-1">Your favorite</p>
          </CardContent>
        </Card>
      </div>

      {books.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No books yet
            </h3>
            <p className="text-gray-500">
              Start shopping to see your books here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card
              key={book._id}
              className="overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2">
                  {book.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-1">
                  {book.title}
                </CardTitle>
                <CardDescription>{book.authorName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-purple-600">
                      Rs{book.price - book.discount}
                    </span>
                    {book.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        Rs{book.price}
                      </span>
                    )}
                  </div>
                  <Badge variant="secondary">
                    Bought {book.purchaseCount}x
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
