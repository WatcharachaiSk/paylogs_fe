"use client";
import InputLogin from "@/components/login/InputLogin";
import toast from "react-hot-toast";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-['DM_Sans',sans-serif]">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#d8f3dc] text-[#2d6a4f] text-[11px] font-bold uppercase tracking-wider mb-4">
            Welcome Back
          </div>
          <h2 className="text-[42px] font-['DM_Serif_Display',serif] text-[#1a1a1a] leading-tight mb-3">
            Sign in to FlowMoney
          </h2>
          <p className="text-[15px] text-[#6b6b6b] font-normal">
            จัดการรายรับรายจ่ายของคุณด้วยความเรียบง่าย
          </p>
        </div>
        
        <InputLogin />

        <div className="text-center mt-8">
          <p className="text-sm text-[#a8a49c]">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-semibold text-[#1a1a1a] hover:text-black underline underline-offset-4 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                toast("ระบบลงทะเบียนจะพร้อมใช้งานเร็วๆ นี้", { icon: '🚀' });
              }}
            >
              Create yours now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
