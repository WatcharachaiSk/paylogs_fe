"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, ReactNode } from "react";
import { TbLayoutDashboard, TbArrowsExchange, TbMenu2, TbTablePlus, TbFileImport } from "react-icons/tb";
import { useAuthStore } from "@/store/slices";
import InputOut from "../login/InputOut";

export default function SidebarToggleLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuthStore();

  if (pathname === "/login") return <main className="bg-white">{children}</main>;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: TbLayoutDashboard },
    { name: "Transactions", href: "/", icon: TbArrowsExchange },
    { name: "Bulk Add", href: "/bulk", icon: TbTablePlus },
    { name: "Import", href: "/import", icon: TbFileImport },
  ];

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/":
        return "Transactions";
      case "/bulk":
        return "Bulk Add";
      case "/import":
        return "Import";
      default:
        return "PayLogs";
    }
  };

  const getPageSub = () => {
    if (pathname === "/bulk") return "เพิ่มหลายรายการพร้อมกัน";
    if (pathname === "/import") return "นำเข้าจาก Excel / Google Sheets";
    const today = new Date();
    const monthYear = today.toLocaleDateString("th-TH", { month: "long", year: "numeric" });
    return monthYear;
  };

  return (
    <div className="flex min-h-screen bg-[#f7f5f0] font-['DM_Sans',sans-serif]">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[220px] bg-[#1a1a1a] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 border-b border-white/10 mb-2">
          <div className="font-['DM_Serif_Display',serif] text-[20px] leading-tight tracking-tight text-white">FlowMoney</div>
          <div className="text-[11px] text-white/40 mt-0.5">Personal Finance</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="text-[10px] text-white/25 px-3 py-2 uppercase tracking-[1.2px] font-medium">Main</div>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all
                ${pathname === item.href ? "bg-white/10 text-white font-medium" : "text-white/55 hover:text-white hover:bg-white/5"}`}
            >
              <item.icon className="text-[16px]" />
              {item.name}
            </Link>
          ))}

          <div className="text-[10px] text-white/25 px-3 py-6 uppercase tracking-[1.2px] font-medium">Other</div>
          <InputOut />
        </nav>

        <div className="p-5 border-t border-white/10 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#52b788] flex items-center justify-center text-[12px] font-medium text-white">{user?.name?.substring(0, 2).toUpperCase() || "US"}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">{user?.name || "User"}</p>
              <p className="text-[11px] text-white/40 truncate">Free plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="h-[64px] bg-white border-b border-[#e8e4dc] px-4 lg:px-7 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-[#6b6b6b] hover:bg-[#f7f5f0] rounded-lg transition-colors">
              <TbMenu2 size={20} />
            </button>
            <div>
              <h1 className="text-[22px] text-[#1a1a1a] font-['DM_Serif_Display',serif] leading-tight">{getPageTitle()}</h1>
              <p className="text-[12px] text-[#a8a49c] mt-0.5">{getPageSub()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3"></div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 lg:p-7 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto w-full">{children}</div>

          {/* FOOTER */}
          <footer className="mt-12 py-8 border-t border-[#e8e4dc] text-center">
            <p className="text-[12px] text-[#a8a49c] italic">
              Crafted with ❤️ by{" "}
              <a href="https://watcharachaisk.github.io/profile/" target="_blank" className="text-[#6b6b6b] hover:text-[#1a1a1a] underline underline-offset-4">
                Watcharachai S.
              </a>
            </p>
            <p className="text-[11px] text-[#a8a49c] mt-1">© 2025 FlowMoney. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
