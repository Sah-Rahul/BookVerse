"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "next/navigation";
import { MapPin, CreditCard, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [step, setStep] = useState<"address" | "payment">("address");
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nepal",
  });

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = 100;
  const finalAmount = totalAmount + shippingCost;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zipCode
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setStep("payment");
    toast.success("Address saved! Proceed to payment");
  };

  const handleStripePayment = async () => {
    setLoading(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          bookId: item.bookId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress,
        totalAmount: finalAmount,
      };

      const { data } = await axios.post(
        "/api/orders/create-checkout-session",
        orderData
      );

      if (data.success && data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600">Your cart is empty</h2>
        <button
          onClick={() => router.push("/collections")}
          className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
              <div
                className={`flex items-center gap-2 ${
                  step === "address" ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "address"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <span className="font-semibold">Address</span>
              </div>

              <div className="flex-1 h-1 bg-gray-200"></div>

              <div
                className={`flex items-center gap-2 ${
                  step === "payment" ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === "payment"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="font-semibold">Payment</span>
              </div>
            </div>

            {step === "address" && (
              <form
                onSubmit={handleAddressSubmit}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-indigo-600" />
                  Shipping Address
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.fullName}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          phone: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Address *
                    </label>
                    <textarea
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          address: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          state: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          zipCode: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.country}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          country: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === "payment" && (
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="text-indigo-600" />
                  Payment Method
                </h2>

                <div className="mb-6">
                  <div className="border-2 border-indigo-600 rounded-lg p-4 bg-indigo-50">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="text-indigo-600" size={24} />
                      <span className="font-semibold text-lg">
                        Pay with Stripe
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Secure payment powered by Stripe. You'll be redirected to
                      complete your payment.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-2">Shipping Address:</h3>
                  <p className="text-sm text-gray-700">
                    {shippingAddress.fullName}
                  </p>
                  <p className="text-sm text-gray-700">
                    {shippingAddress.phone}
                  </p>
                  <p className="text-sm text-gray-700">
                    {shippingAddress.address}
                  </p>
                  <p className="text-sm text-gray-700">
                    {shippingAddress.city}, {shippingAddress.state}{" "}
                    {shippingAddress.zipCode}
                  </p>
                  <p className="text-sm text-gray-700">
                    {shippingAddress.country}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("address")}
                    className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Back to Address
                  </button>
                  <button
                    onClick={handleStripePayment}
                    disabled={loading}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : `Pay Rs ${finalAmount}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.bookId} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-indigo-600 font-bold">
                      Rs {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs {shippingCost}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-indigo-600">Rs {finalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
