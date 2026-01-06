"use client";

import Image from "next/image";
import { Plus, Minus, Trash } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { toast } from "sonner";
import Link from "next/link";

const CartPage: React.FC = () => {
  const { items, updateQty, removeItem, clearCart } = useCartStore();

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Cart is empty 🛒
      </div>
    );
  }

  const handleRemove = (bookId: string) => {
    removeItem(bookId);
    toast.success("Item removed from your cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.bookId}
              className="flex gap-6 bg-white p-5 rounded-xl shadow"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={120}
                height={160}
                className="rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-indigo-600 font-bold mt-1">
                  Rs {item.price}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      updateQty(item.bookId, Math.max(1, item.quantity - 1))
                    }
                    className="p-2 border rounded"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="font-bold">{item.quantity}</span>

                  <button
                    onClick={() => updateQty(item.bookId, item.quantity + 1)}
                    className="p-2 border rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.bookId)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{items.reduce((t, i) => t + i.quantity, 0)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total Amount</span>
            <span>Rs {totalAmount}</span>
          </div>

          <Link href={"/checkout"}>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">
              Checkout
            </button>
          </Link>

          <button
            onClick={handleClearCart}
            className="w-full mt-3 border py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
