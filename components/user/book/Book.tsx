"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Wallet, Layers, Download, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  price: number;
  image: string;
  purchaseCount: number;
}

const PurchasedBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get("/api/users/purchased-books");
        setBooks(data.data || []);
      } catch (error) {
        toast.error("Failed to fetch library");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const stats = {
    totalSpent: books.reduce((sum, b) => sum + b.price * b.purchaseCount, 0),
    totalQty: books.reduce((sum, b) => sum + b.purchaseCount, 0),
    uniqueCount: books.length,
  };

  if (loading) return <LibrarySkeleton />;

  return (
    <div className="min-h-screen bg-[#FDFCF0]/50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Personal Library
            </h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              You have curated {stats.uniqueCount} premium titles in your
              collection.
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <StatMini
              label="Total Spent"
              value={`Rs${stats.totalSpent.toLocaleString()}`}
              icon={Wallet}
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
            <StatMini
              label="Collection"
              value={`${stats.totalQty} Vols`}
              icon={Layers}
              color="text-indigo-600"
              bg="bg-indigo-50"
            />
          </div>
        </div>

        {books.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div key={book._id} className="group relative">
                <div className="relative aspect-3/4 overflow-hidden rounded-2xl shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-indigo-200/50">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Button
                      variant="secondary"
                      className="w-full gap-2 font-bold backdrop-blur-md bg-white/90"
                    >
                      <Download className="w-4 h-4" /> Download E-Book
                    </Button>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black shadow-sm border border-slate-100">
                    ×{book.purchaseCount}
                  </div>
                </div>

                <div className="mt-4 space-y-1 px-1">
                  <h3 className="text-lg font-bold text-slate-800 truncate leading-tight">
                    {book.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      Purchased
                    </p>
                    <p className="text-lg font-black text-indigo-600">
                      Rs{book.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {books.length > 0 && (
          <div className="sticky bottom-8 left-0 right-0 z-10 flex justify-center px-4">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-10 text-white max-w-fit animate-in fade-in slide-in-from-bottom-5">
              <div className="hidden sm:block border-r border-white/10 pr-10">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] mb-1">
                  Library Value
                </p>
                <p className="text-2xl font-black text-emerald-400">
                  Rs{stats.totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-8 items-center">
                <div className="text-center">
                  <p className="text-xs font-medium text-slate-400">Unique</p>
                  <p className="text-xl font-bold">{stats.uniqueCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-slate-400">Items</p>
                  <p className="text-xl font-bold">{stats.totalQty}</p>
                </div>
                <Link href="/collections">
                  <Button className="rounded-full bg-indigo-500 hover:bg-indigo-600 px-6 font-bold shadow-lg shadow-indigo-500/20">
                    Buy More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatMini = ({ label, value, icon: Icon, color, bg }: any) => (
  <div
    className={`flex items-center gap-4 ${bg} px-6 py-3 rounded-2xl border shadow-sm flex-1 md:flex-none min-w-40`}
  >
    <div className={`p-2 rounded-xl bg-white shadow-xs ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none mb-1">
        {label}
      </p>
      <p className={`text-lg font-black ${color} leading-none tracking-tight`}>
        {value}
      </p>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center space-y-6">
    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
      <ShoppingBag className="w-12 h-12 text-slate-300" />
    </div>
    <div className="max-w-sm mx-auto space-y-2">
      <h3 className="text-2xl font-bold text-slate-800">
        Your library is empty
      </h3>
      <p className="text-slate-500">
        Discover your next favorite read and start building your collection
        today.
      </p>
    </div>
    <Link href="/shop">
      <Button className="bg-slate-900 text-white rounded-full px-10 py-6 text-lg font-bold hover:scale-105 transition-transform">
        Explore Bookseller
      </Button>
    </Link>
  </div>
);

const LibrarySkeleton = () => (
  <div className="p-10 space-y-10">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-14 w-40 rounded-2xl" />
        <Skeleton className="h-14 w-40 rounded-2xl" />
      </div>
    </div>
    <div className="grid grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="aspect-[3/4 w-full rounded-2xl" />
      ))}
    </div>
  </div>
);

export default PurchasedBooks;
