import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/api";
import CategoryLinks from "./CategoryLinks";

export default async function Navbar() {
  const categories = await getCategories();
  const date = new Date().toLocaleDateString("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.png" alt="বাজার দর" width={36} height={36} />
          <div className="leading-tight">
            <p className="text-lg font-bold text-green-700">বাজার দর</p>
            <p className="text-xs text-gray-500" suppressHydrationWarning>
              {date}
            </p>
          </div>
        </Link>

        <div className="flex gap-2">
          <Link href="/signin" className="btn btn-outline btn-sm sm:btn-md">
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="btn btn-sm border-0 bg-green-600 text-white hover:bg-green-700 sm:btn-md"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <CategoryLinks categories={categories} />
    </header>
  );
}
