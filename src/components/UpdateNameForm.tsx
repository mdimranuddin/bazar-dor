"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">নাম</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="input mt-1 w-full border-green-200 bg-white"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="btn w-full border-0 bg-green-600 text-white hover:bg-green-700"
      >
        {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}
