"use client";
import { useAuthStore } from "@/store/slices";
import Link from "next/link";

function InputOut() {
  const { logout } = useAuthStore();

  return (
    <Link
      href="/login"
      onClick={() => {
        logout();
        window.location.reload();
      }}
      className="hover:underline"
    >
      logout
    </Link>
  );
}

export default InputOut;
