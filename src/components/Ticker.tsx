import { getProducts } from "@/lib/api";
import { toBn, unitShort, formatChange } from "@/lib/bn";

export default async function Ticker() {
  const products = await getProducts();

  const color: Record<string, string> = {
    up: "text-green-600",
    down: "text-red-600",
    flat: "text-gray-500",
  };

  const row = (prefix: string) =>
    products.map((p) => (
      <span
        key={`${prefix}-${p.id}`}
        className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-5 text-sm"
      >
        <span>{p.image}</span>
        <span className="font-semibold text-gray-800">{p.nameBn}</span>
        <span className="text-gray-600">
          {toBn(p.today)} টাকা/{unitShort(p.unit)}
        </span>
        <span className={`font-semibold ${color[p.change.dir] ?? color.flat}`}>
          {p.change.dir === "flat"
            ? "—০.০%"
            : formatChange(p.change.dir, p.change.pct)}
        </span>
      </span>
    ));

  return (
    <div className="marquee overflow-hidden border-b border-green-100 bg-green-50 py-2">
      <div className="marquee-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
