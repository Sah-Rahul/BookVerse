import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface userI {
  _id: string;
  name: string;
  email: string;
  role?: string; // optional
}

interface UserStore {
  user: userI | null;
  isAuthenticated: boolean;
  setUser: (user: userI) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "user-storage", }
  )
);
