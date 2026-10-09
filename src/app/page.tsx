import { getProducts } from "@/lib/api";
import { formatPrice, unitLabel, formatChange } from "@/lib/bn";

export default async function Home() {
  const products = await getProducts();
  const p = products[0];
  return (
    <main className="p-10">
      <p className="mb-4">মোট পণ্য: {products.length}</p>
      <p>
        {p.image} {p.nameBn} — {unitLabel(p.unit)} — {formatPrice(p.today)} —{" "}
        {formatChange(p.change.dir, p.change.pct)}
      </p>
    </main>
  );
}
