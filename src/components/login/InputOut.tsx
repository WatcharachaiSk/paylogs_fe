"use client";
import { useAuthStore } from "@/store/slices";

function InputOut() {
  const { logout } = useAuthStore();

  return (
    <a
      onClick={() => {
        logout();
        window.location.reload();
      }}
      className="hover:underline"
    >
      logout
    </a>
  );
}

export default InputOut;
