import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";
import { API_PATHS } from "@/lib/apiPaths";
import configAxios from "@/lib/configAxios";

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
          // const response = await axios.post(API_PATHS.LOGIN, {
          //   email,
          //   password,
          // });
          const response = await axios(
            configAxios("post", API_PATHS.LOGIN, {
              email,
              password,
            })
          );
          if (response.status == 201) {
            const data = response.data;
            setCookie("token", data?.token);
            set({ user: data.name });
            return true;
          } else {
            deleteCookie("token");
            return false;
          }
        } catch (error) {
          console.error("Error fetching expenses:", error);
          deleteCookie("token");
          // alert(`รหัสผ่านผิด ${process.env.NEXT_PUBLIC_API_URL}`);
          return false;
        }
      },
      logout: () => {
        set({ user: null });
        deleteCookie("token");
        localStorage.clear()
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
