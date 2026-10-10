import { cache } from "react";
import type { Product, Category } from "./types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

let lastGood: Product[] | null = null;
let lastGoodAt = 0;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchJson<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    for (const base of BASES) {
      try {
        const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as T;
      } catch (err) {
        lastError = err;
      }
    }
    await sleep(400 * (attempt + 1));
  }
  throw lastError;
}

export const getProducts = cache(async (): Promise<Product[]> => {
  if (lastGood && Date.now() - lastGoodAt < 60_000) return lastGood;
  try {
    const data = await fetchJson<Product[]>("/products");
    lastGood = data;
    lastGoodAt = Date.now();
    return data;
  } catch (err) {
    if (lastGood) return lastGood;
    throw err;
  }
});

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  const products = await getProducts();
  const map = new Map<string, Category>();
  for (const p of products) {
    if (!map.has(p.category)) {
      map.set(p.category, {
        slug: p.category,
        name: p.categoryNameBn,
        icon: p.categoryIcon,
      });
    }
  }
  return [...map.values()];
}
