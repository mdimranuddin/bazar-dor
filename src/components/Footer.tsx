export default function Footer() {
  return (
    <footer className="mt-10 border-t border-green-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-gray-800">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="italic">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </p>
      </div>
    </footer>
  );
}
