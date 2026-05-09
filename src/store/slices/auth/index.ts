import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";
import { API_PATHS } from "@/lib/apiPaths";
import configAxios from "@/lib/configAxios";
import { User } from "./types";
import toast from "react-hot-toast";

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginGoogle: (token: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      loading: false,
      login: async (email, password) => {
        set({ loading: true });
        try {
          const response = await axios(
            configAxios("post", API_PATHS.LOGIN, {
              email,
              password,
            })
          );
          if (response.status == 201) {
            const data = response.data;
            setCookie("token", data?.token);
            set({ user: { name: data.name, email: data.email || "" } });
            toast.success("Login Successful!");
            return true;
          }
 else {
            deleteCookie("token");
            return false;
          }
        } catch (error) {
          console.error("Error Login:", error);
          deleteCookie("token");
          toast.error("รหัสผ่านผิดพลาด กรุณาลองใหม่");
          return false;
        } finally {
          set({ loading: false });
        }
      },
      loginGoogle: async (token: string) => {
        set({ loading: true });
        try {
          const response = await axios(
            configAxios("post", API_PATHS.LOGINGOOGLE, { token })
          );
          if (response.status == 201) {
            const data = response.data;
            setCookie("token", data?.token);
            set({ user: { name: data.name, email: data.email || "" } });
            toast.success("Google Login Successful!");
            return true;
          }
 else {
            deleteCookie("token");
            return false;
          }
        } catch (error) {
          console.error("Error Login Google:", error);
          deleteCookie("token");
          toast.error("ระบบไม่พร้อมใช้งานในขณะนี้");
          return false;
        } finally {
          set({ loading: false });
        }
      },
      logout: () => {
        set({ user: null, token: null, loading: false });
        deleteCookie("token");
        localStorage.clear();
        toast.success("Logged out successfully");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
