import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-green-50 p-6 md:flex-row md:justify-between md:p-10">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            প্রতিদিনের বাজার দর
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-gray-600">
            চাল, ডাল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম
            দেখুন এবং কোনটির দাম বাড়ল বা কমল তা জেনে নিন।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn mt-5 border-0 bg-green-600 text-white hover:bg-green-700"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="সবজি ও ফলের ঝুড়ি"
          width={420}
          height={320}
          priority
          className="h-auto w-full max-w-xs md:max-w-sm"
        />
      </div>
    </section>
  );
}
