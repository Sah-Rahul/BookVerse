"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function OrderFailed() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-8">
          Your payment was not completed. Please try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => router.push("/checkout")}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}