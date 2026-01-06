import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  bookId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (bookId: string) => void;
  updateQty: (bookId: string, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const exist = state.items.find((i) => i.bookId === item.bookId);
          if (exist) {
            return {
              items: state.items.map((i) =>
                i.bookId === item.bookId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (bookId) =>
        set((state) => ({
          items: state.items.filter((i) => i.bookId !== bookId),
        })),

      updateQty: (bookId, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.bookId === bookId ? { ...i, quantity: qty } : i
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "book-cart" }
  )
);
