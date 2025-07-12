"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SidebarToggleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  if (pathname === "/login") return <main>{children}</main>;

  return (
    <div>
      {/* ปุ่มเปิด Sidebar แสดงทุกขนาดหน้าจอ */}
      <button
        onClick={() => setSidebarOpen(true)}
        type="button"
        className=" inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 shadow transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* ปุ่มปิด Sidebar */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-900"
          >
            ✕ ปิด
          </button>

          {/* เมนู */}
          <ul className="space-y-2 font-medium mt-4">
            <li>
              <Link
                href="/"
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
              >
                🏠 <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
              >
                🗂️ <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="#"
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
              >
                📥 <span className="ms-3">Inbox</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </aside>

      <main>{children}</main>
    </div>
  );
}
