"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSocial(provider: "google" | "github") {
    setLoading(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      setLoading(null);
      toast.error(error.message ?? "সোশ্যাল লগইন ব্যর্থ হয়েছে");
    }
  }

  return (
    <div className="mt-5">
      <div className="divider text-xs text-gray-400">অথবা</div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleSocial("google")}
          disabled={loading !== null}
          className="btn border-green-200 bg-white text-gray-800 hover:bg-green-50"
        >
          {loading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
        </button>
        <button
          type="button"
          onClick={() => handleSocial("github")}
          disabled={loading !== null}
          className="btn border-green-200 bg-white text-gray-800 hover:bg-green-50"
        >
          {loading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
        </button>
      </div>
    </div>
  );
}
