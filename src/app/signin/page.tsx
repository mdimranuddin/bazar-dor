"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import RedirectToast from "@/components/RedirectToast";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "সাইন ইন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <main className="mx-auto flex max-w-6xl justify-center px-4 py-12">
      <RedirectToast />
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">সাইন ইন করুন</h1>
        <p className="mt-1 text-sm text-gray-500">
          আপনার অ্যাকাউন্টে প্রবেশ করুন।
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              placeholder="আপনার পাসওয়ার্ড"
              className="input mt-1 w-full border-green-200 bg-white"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-0 bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          নতুন ব্যবহারকারী?{" "}
          <Link href="/signup" className="font-semibold text-green-700 hover:underline">
            রেজিস্টার করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
