"use client";
import { useAuthStore } from "@/store/slices";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import _ from "lodash";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UserData {
  email: string;
  password: string;
}

function InputLogin() {
  const { login, loginGoogle, loading } = useAuthStore();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSuccess = await login(userData.email, userData.password);
    if (isSuccess) {
      window.location.reload();
    }
  };
  const handleSuccess = async (response: CredentialResponse) => {
    if (_.isEmpty(response)) {
      toast.error("ระบบไม่พร้อมใช้งาน Google Login");
    }
    const isSuccess = await loginGoogle(response?.credential ?? "");
    if (isSuccess) {
      window.location.reload();
    }
  };
  return (
    <div className="relative bg-white p-8 md:p-10 rounded-[24px] shadow-xl border border-[#e8e4dc] transition-all duration-300 overflow-hidden">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-300">
          <div className="w-12 h-12 border-4 border-[#1a1a1a]/10 border-t-[#1a1a1a] rounded-full animate-spin mb-4"></div>
          <p className="text-[#6b6b6b] font-medium animate-pulse">Authenticating...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`space-y-6 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] text-[#a8a49c] uppercase tracking-wider font-medium ml-1">Email address</label>
            <input
              name="email"
              type="email"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-[#f7f5f0] border border-[#e8e4dc] text-[#1a1a1a] text-[14px] focus:border-[#a8a49c] outline-none transition-all duration-200"
              placeholder="name@example.com"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-[#a8a49c] uppercase tracking-wider font-medium ml-1">Password</label>
            <input
              name="password"
              type="password"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-[#f7f5f0] border border-[#e8e4dc] text-[#1a1a1a] text-[14px] focus:border-[#a8a49c] outline-none transition-all duration-200"
              placeholder="••••••••"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              disabled={loading}
              className="h-4 w-4 text-[#1a1a1a] focus:ring-[#a8a49c] border-[#e8e4dc] rounded-md cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-[13px] text-[#6b6b6b] cursor-pointer select-none"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!loading) toast("ฟีเจอร์นี้ยังไม่พร้อมใช้งาน", { icon: '🚧' });
              }}
              className="font-medium text-[#a8a49c] hover:text-[#1a1a1a] text-[13px] transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a1a1a] text-white py-3.5 px-6 rounded-xl font-semibold text-[15px] hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#a8a49c] focus:ring-offset-2 transition-all duration-200 shadow-md active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e8e4dc]"></div>
          </div>
          <div className="relative flex justify-center text-[12px]">
            <span className="px-4 bg-white text-[#a8a49c] font-medium uppercase tracking-widest">or</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className={`w-full transition-all ${loading ? "pointer-events-none opacity-50" : ""}`}>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            >
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log("Fail")}
                shape="rectangular"
                theme="outline"
                size="large"
                width="100%"
                text="continue_with"
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InputLogin;
