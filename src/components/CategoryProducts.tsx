"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

type SortMode = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortMode>("default");

  const sorted = [...products];
  if (sort === "asc") sorted.sort((a, b) => a.today - b.today);
  if (sort === "desc") sorted.sort((a, b) => b.today - a.today);

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          সাজান:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortMode)}
          className="select select-sm w-auto border-green-200 bg-white"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <ProductGrid products={sorted} />
    </div>
  );
}
