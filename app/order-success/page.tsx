"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import axios from "axios";
import { toast } from "sonner";

export default function OrderSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setLoading(false);
        setError(true);
        return;
      }

      try {
        console.log("Verifying payment for session:", sessionId);

        
        const { data } = await axios.post("/api/orders/verify-payment", {
          sessionId,
        });

        console.log("Verification response:", data);

        if (data.success) {
          setVerified(true);
          clearCart();
          toast.success("Payment verified successfully!");
        } else {
          setError(true);
          toast.error("Payment verification failed");
        }
      } catch (error: any) {
        console.error("Payment verification error:", error);
        setError(true);
        toast.error(error.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Verifying your payment...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verification Issue
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't verify your payment automatically, but don't worry - your
            payment was processed successfully by Stripe.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Our team will verify and update your order shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/user/orders")}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              View My Orders
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {verified && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Payment Verified</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Your payment has been confirmed
            </p>
          </div>
        )}

        <p className="text-xs text-gray-500 mb-8 font-mono bg-gray-50 p-2 rounded">
          Session: {sessionId?.slice(-16)}
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/user/orders")}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            View My Orders
          </button>
          <button
            onClick={() => router.push("/collections")}
            className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}