import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-5xl mb-6 shadow-sm">
        🐛
      </div>
      <h1 className="text-4xl font-extrabold text-[#1A3A2A] mb-3 tracking-tight">
        Bug not found.
      </h1>
      <p className="text-[#1A3A2A]/60 mb-8 max-w-sm">
        This page crawled away. Let&apos;s get you back.
      </p>
      <Link
        href="/"
        className="bg-[#1A3A2A] hover:bg-[#48BB78] text-[#F0FFF4] font-bold px-8 py-3 rounded-full transition-colors"
      >
        Back home →
      </Link>
    </main>
  );
}
