'use client';

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center mt-[15%] px-4" dir="rtl">
      <h1 className="text-6xl font-bold text-white mb-4 font-Alexandria">404</h1>
      <p className="text-xl text-slate-300 mb-8 font-Cairo text-center">
        الصفحة التي تبحث عنها غير موجودة.
      </p>

      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 rounded-md bg-amber-500 text-white font-medium hover:bg-[#556244] transition-colors"
      >
        العودة للرئيسية
      </button>
    </div>
  );
}
