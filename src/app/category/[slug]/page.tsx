import Link from "next/link";
import { getProducts } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = await getProducts();
  const products = all.filter((p) => p.category === slug);

  if (products.length === 0) {
    return (
      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-4 text-5xl font-bold text-green-700">৪০৪</h1>
        <p className="mt-3 text-lg text-gray-700">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="btn mt-6 border-0 bg-green-600 text-white hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  const { categoryNameBn, categoryIcon } = products[0];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-4xl">{categoryIcon}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{categoryNameBn}</h1>
          <p className="text-sm text-gray-500">
            এই ক্যাটাগরির সব পণ্যের আজকের দাম
          </p>
        </div>
      </div>

      <CategoryProducts products={products} />
    </main>
  );
}
