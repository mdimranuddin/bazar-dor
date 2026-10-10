import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="skeleton h-6 w-40" />
      </div>
      <ProductSkeleton count={6} />
    </main>
  );
}
