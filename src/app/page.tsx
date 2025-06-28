"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TableComponent from "@/components/home/TableLogs";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">🏡 Your Logs</h1>
      <TableComponent />
    </div>
  );
}
