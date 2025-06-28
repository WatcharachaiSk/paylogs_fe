import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";

interface AuthState {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: async (email, password) => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.post(`${apiUrl}/auth/login`, {
            email,
            password,
          });
          if (response.status == 201) {
            const data = response.data;
            setCookie("token", data?.token);
            set({ token: data.token, user: data.name });
            return true;
          } else {
            deleteCookie("token");
            return false;
          }
        } catch (error) {
          deleteCookie("token");
          return false;
        }
      },
      logout: () => {
        set({ token: null, user: null });
        deleteCookie("token");
      },
    }),
    {
      name: "auth-storage", // Key for localStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // Persist only token and user
    }
  )
);
