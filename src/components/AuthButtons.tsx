"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  if (isPending) {
    return <div className="skeleton h-9 w-28 rounded-lg" />;
  }

  if (!session) {
    return (
      <div className="flex gap-2">
        <Link href="/signin" className="btn btn-outline btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-sm border-0 bg-green-600 text-white hover:bg-green-700 sm:btn-md"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-2 rounded-full border border-green-200 bg-white px-2 py-1 hover:bg-green-50"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
            {initial}
          </span>
        )}
        <span className="hidden max-w-[8rem] truncate text-sm font-medium text-gray-800 sm:block">
          {user.name}
        </span>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-50 mt-2 w-64 max-w-[85vw] rounded-box border border-green-100 bg-white p-2 shadow"
      >
        <li className="break-all px-3 py-1 text-xs text-gray-500">{user.email}</li>
        <li>
          <Link href="/profile">আমার প্রোফাইল</Link>
        </li>
        <li>
          <button onClick={handleSignOut}>সাইন আউট</button>
        </li>
      </ul>
    </div>
  );
}
