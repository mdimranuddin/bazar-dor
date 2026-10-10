import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirected=1");

  const { user } = session;
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <main className="mx-auto flex max-w-6xl justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>

        <div className="mt-6 flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
              {initial}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-gray-900">{user.name}</p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="btn mt-6 w-full border-0 bg-green-600 text-white hover:bg-green-700"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </main>
  );
}
