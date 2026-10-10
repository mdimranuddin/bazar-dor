"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("রেজিস্ট্রেশন সফল হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <main className="mx-auto flex max-w-6xl justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">নতুন অ্যাকাউন্ট খুলুন</h1>
        <p className="mt-1 text-sm text-gray-500">
          বাজার দরে যোগ দিন এবং পণ্যের বিস্তারিত দেখুন।
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">নাম</span>
            <input
              name="name"
              type="text"
              placeholder="আপনার নাম"
              className="input mt-1 w-full border-green-200 bg-white"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">ইমেইল</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input mt-1 w-full border-green-200 bg-white"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">পাসওয়ার্ড</span>
            <input
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input mt-1 w-full border-green-200 bg-white"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-0 bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? "অপেক্ষা করুন..." : "রেজিস্টার করুন"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-green-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
