import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bengali = Noto_Sans_Bengali({ subsets: ["bengali", "latin"] });

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light">
      <body
        className={`${bengali.className} flex min-h-screen flex-col`}
        suppressHydrationWarning
      >
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
