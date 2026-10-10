"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function RedirectToast() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("redirected") === "1") {
      toast.error("এই পেজ দেখতে প্রথমে সাইন ইন করুন", { id: "redirected" });
    }
  }, []);

  return null;
}
