"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "সব পণ্য", icon: "🛒" },
    ...categories.map((c) => ({
      href: `/category/${c.slug}`,
      label: c.name,
      icon: c.icon,
    })),
  ];

  return (
    <nav className="border-t border-green-100">
      <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium transition ${
                  active
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
