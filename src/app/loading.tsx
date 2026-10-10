import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton mb-4 h-6 w-48" />
      <ProductSkeleton count={8} />
    </main>
  );
}
