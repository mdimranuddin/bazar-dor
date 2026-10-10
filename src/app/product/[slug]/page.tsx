import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { formatPrice, unitLabel, formatChange, toBn } from "@/lib/bn";

const badgeStyles: Record<string, string> = {
  up: "bg-green-100 text-green-700",
  down: "bg-red-100 text-red-600",
  flat: "bg-gray-100 text-gray-500",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirected=1");

  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const { markets, change } = product;
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const avg = Math.round(
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
  );
  const badge = badgeStyles[change.dir] ?? badgeStyles.flat;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">হোম</Link>
        {" / "}
        <Link href={`/category/${product.category}`} className="hover:underline">
          {product.categoryNameBn}
        </Link>
        {" / "}
        <span className="text-gray-800">{product.nameBn}</span>
      </nav>

      <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <span className="text-6xl">{product.image}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
              <p className="mt-1 text-sm text-gray-500">
                গতকাল {formatPrice(product.yesterday)}, গত সপ্তাহে{" "}
                {formatPrice(product.lastWeek)}, গত মাসে {formatPrice(product.lastMonth)}।
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  {unitLabel(product.unit)}
                </span>
              </div>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(product.today)}</p>
            <span className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-semibold ${badge}`}>
              {change.dir === "flat" ? "—০.০%" : formatChange(change.dir, change.pct)}
            </span>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-green-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
          <p className="mt-1 text-xl font-bold text-green-700">{formatPrice(min)}</p>
        </div>
        <div className="rounded-xl border border-green-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
          <p className="mt-1 text-xl font-bold text-red-600">{formatPrice(max)}</p>
        </div>
        <div className="rounded-xl border border-green-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">গড় দাম</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{formatPrice(avg)}</p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-gray-600">
                <th>#</th>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr key={`${m.market}-${i}`}>
                  <td>{toBn(i + 1)}</td>
                  <td className="font-medium">{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-right">{formatPrice(m.min)}</td>
                  <td className="text-right">{formatPrice(m.max)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
