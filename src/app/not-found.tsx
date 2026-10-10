import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
      <p className="text-6xl">🛒</p>
      <h1 className="mt-4 text-5xl font-bold text-green-700">৪০৪</h1>
      <p className="mt-3 text-lg text-gray-700">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি।
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
