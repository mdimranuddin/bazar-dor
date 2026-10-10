import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateNameForm from "@/components/UpdateNameForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirected=1");

  return (
    <main className="mx-auto flex max-w-6xl justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>
        <UpdateNameForm currentName={session.user.name} />
      </div>
    </main>
  );
}
