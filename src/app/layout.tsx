import type { Metadata } from "next";
import "./globals.css"; // import global css ของโปรเจกต์
import { ReactNode } from "react";
import InputOut from "@/components/login/InputOut";

export const metadata: Metadata = {
  title: "PayLogs",
  description: "Watcharachai S.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <Header />
        <main className="container mx-auto px-4 py-6">{children}</main>
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
        <nav className="space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/login" className="hover:underline">
            Login
          </a>{" "}
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
