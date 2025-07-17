import type { Metadata } from "next";
import "./globals.css";
import { ReactNode, Suspense } from "react";
import InputOut from "@/components/login/InputOut";
import Link from "next/link";
import SidebarToggleLayout from "@/components/layout/Sidebar";
import "react-datepicker/dist/react-datepicker.css";

export const metadata: Metadata = {
  title: "PayLogs",
  description: "Watcharachai S.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <Header />
        <Suspense fallback={<p>Loading weather...</p>}>
          <main className="container mx-auto px-1 py-1">
            <SidebarToggleLayout>{children}</SidebarToggleLayout>
          </main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">PayLogs</h1>
        <nav className="space-x-4 flex items-center">
          <Link href="/">Home</Link>
          {/* <a href="/login" className="hover:underline">
            Login
          </a>{" "} */}
          <InputOut />
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-10 py-6 border-t text-center text-sm text-gray-500">
      <div className="flex flex-col items-center space-y-2">
        <p>© 2025 Paylog. All rights reserved.</p>
        <p>
          Crafted with ❤️ by{" "}
          <a
            href="https://watcharachaisk.github.io/profile/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Watcharachai S.
          </a>
        </p>
      </div>
    </footer>
  );
}
