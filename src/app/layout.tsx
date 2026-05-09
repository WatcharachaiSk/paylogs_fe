import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import SidebarToggleLayout from "@/components/layout/Sidebar";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "PayLogs",
  description: "Watcharachai S.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-flow-bg antialiased">
        <Toaster position="top-center" reverseOrder={false} />
        <SidebarToggleLayout>{children}</SidebarToggleLayout>
      </body>
    </html>
  );
}
