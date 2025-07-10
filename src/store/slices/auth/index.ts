import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";
import { API_PATHS } from "@/lib/apiPaths";
import configAxios from "@/lib/configAxios";
import { User } from "./types";

interface AuthState {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginGoogle: (token: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: async (email, password) => {
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
            set({ user: data.name });
            return true;
          } else {
            deleteCookie("token");
            return false;
          }
        } catch (error) {
          console.error("Error Login:", error);
          deleteCookie("token");
          alert(`รหัสผ่านผิด: `);
          return false;
        }
      },
      loginGoogle: async (token: string) => {
        try {
          const response = await axios(
            configAxios("post", API_PATHS.LOGINGOOGLE, { token })
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
          console.error("Error Login Google:", error);
          deleteCookie("token");
          alert(
            "ระบบไม่พร้อมใช้งาน Login Google Error : " + JSON.stringify(error)
          );
          return false;
        }
      },
      logout: () => {
        set({ user: null });
        deleteCookie("token");
        localStorage.clear();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
