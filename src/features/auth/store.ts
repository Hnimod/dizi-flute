import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Simple local admin auth — password checked client-side for now
const ADMIN_PASSWORD = "dizi2024";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAdmin: false,

      login: async (_email: string, password: string) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAdmin: true });
        } else {
          throw new Error("Invalid credentials");
        }
      },

      logout: () => {
        set({ isAdmin: false });
      },
    }),
    {
      name: "dizi-auth",
      partialize: (state) => ({ isAdmin: state.isAdmin }),
    },
  ),
);
