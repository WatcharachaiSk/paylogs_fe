"use client";

import { useAuthStore } from "@/store/slices";
import { usePathname } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";

function InputOut() {
  const { logout } = useAuthStore();
  const pathname = usePathname();

  const cfLogout = () => {
    const confirmed = window.confirm("คุณต้องการ Logout ใช่ไหม?");
    if (confirmed) {
      logout();
      window.location.href = "/login"; // redirect แบบเต็ม
    }
  };

  // ซ่อนปุ่มถ้าไม่มี token หรือถ้าอยู่ในหน้า /login
  if (pathname === "/login") return null;

  return (
    <button
      onClick={cfLogout}
      className="hover:underline text-red-600"
    >
      <IoLogOutOutline size={20} />
    </button>
  );
}

export default InputOut;
