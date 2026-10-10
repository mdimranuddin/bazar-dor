import { getProducts } from "@/lib/api";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <>
      <Hero />

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-8">
        <section>
          <SectionTitle title="আজ দাম বেড়েছে ▲" />
          <ProductGrid products={risers} />
        </section>

        <section>
          <SectionTitle title="আজ দাম কমেছে ▼" />
          <ProductGrid products={fallers} />
        </section>

        <section id="সব-পণ্য" className="scroll-mt-40">
          <SectionTitle
            title="সব পণ্য"
            subtitle="সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম"
          />
          <ProductGrid products={products} />
        </section>
      </main>
    </>
  );
}
