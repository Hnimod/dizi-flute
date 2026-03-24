import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginAdmin, checkAuth as checkAuthApi } from "@/data/api";

interface AuthState {
  token: string | null;
  email: string | null;
  role: "admin" | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      email: null,
      role: null,
      isAdmin: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const result = await loginAdmin(email, password);
        set({
          token: result.token,
          email: email.toLowerCase(),
          role: "admin",
          isAdmin: true,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: null,
          email: null,
          role: null,
          isAdmin: false,
          isAuthenticated: false,
        });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) return;
        const result = await checkAuthApi();
        if (result) {
          set({
            email: result.email,
            role: result.role === "admin" ? "admin" : null,
            isAdmin: result.role === "admin",
            isAuthenticated: true,
          });
        } else {
          set({
            token: null,
            email: null,
            role: null,
            isAdmin: false,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "dizi-auth",
      partialize: (state) => ({
        token: state.token,
        email: state.email,
        role: state.role,
        isAdmin: state.isAdmin,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
