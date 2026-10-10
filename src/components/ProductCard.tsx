import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, unitLabel, formatChange } from "@/lib/bn";

const badgeStyles: Record<string, string> = {
  up: "bg-green-100 text-green-700",
  down: "bg-red-100 text-red-600",
  flat: "bg-gray-100 text-gray-500",
};

export default function ProductCard({ product }: { product: Product }) {
  const { slug, image, nameBn, unit, today, change } = product;
  const badge = badgeStyles[change.dir] ?? badgeStyles.flat;

  return (
    <Link
      href={`/product/${slug}`}
      className="block rounded-xl border border-green-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl">{image}</span>
        <div>
          <h3 className="font-bold text-gray-900">{nameBn}</h3>
          <p className="text-sm text-gray-500">{unitLabel(unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900">{formatPrice(today)}</p>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${badge}`}>
          {change.dir === "flat" ? "—০.০%" : formatChange(change.dir, change.pct)}
        </span>
      </div>
    </Link>
  );
}
