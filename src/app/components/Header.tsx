"use client";

import  Link  from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full" dir="rtl">
      <nav className="mr-10 ml-20 px-4 py-4 flex items-center justify-between mt-8 relative">
        <a
          href="/"
          className="text-3xl font-bold text-white font-Alexandria sm:text-5xl"
        >
          سَاعِدْ مُبَرْجَ
        </a>

        <ul className="hidden xl:flex gap-12 text-2xl text-white border border-black/20 px-12 py-6 rounded-[100px] font-Alexandria backdrop-blur-5xl bg-white/15 shadow-lg">
          <Link href="/convertToCode" className="hover:text-[#556244] cursor-pointer transition">
            تحويل من كتابه الي كود
          </Link>
          <Link href="/ImproveCode" className="hover:text-[#556244] cursor-pointer transition">
            تحسين الأداء
          </Link>
          <Link href="/codeReview" className="hover:text-[#556244] cursor-pointer transition">
            مراجعة الكود
          </Link>
          <Link href="/debugger" className="hover:text-[#556244] cursor-pointer transition">
            مصحح الأخطاء
          </Link >
        </ul>

        <button
          className="xl:hidden flex flex-col justify-between w-8 h-6 cursor-pointer z-20 ml-[-70px]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block h-1 w-full bg-white rounded transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-white rounded transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-white rounded transition-all ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        <ul
          className={`xl:hidden fixed top-16 right-0 w-full backdrop-blur-lg bg-white/10 backdrop-saturate-150 transition-all duration-300 ease-in-out z-30 flex flex-col items-center gap-6 p-6 -mt-20
    ${
      menuOpen
        ? "opacity-100 max-h-[80vh] translate-y-0"
        : "opacity-0 max-h-0 -translate-y-4 overflow-hidden"
    }
  `}
        >
          <button
            className="self-end text-white text-3xl mb-4 hover:text-[#556244] transition "
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

          <Link href="/convertToCode" className="text-2xl text-black hover:text-[#556244] transition cursor-pointer font-Cairo">
            تحويل من كتابه الي كود
          </Link>
          <Link href="/ImproveCode" className="text-2xl text-black hover:text-[#556244] transition cursor-pointer font-Cairo">
            تحسين الأداء
          </Link>
          <Link href="/codeReview" className="text-2xl text-black hover:text-[#556244] transition cursor-pointer font-Cairo">
            مراجعة الكود
          </Link>
          <Link href="/debugger" className="text-2xl text-black hover:text-[#556244] transition cursor-pointer font-Cairo ">
            مصحح الأخطاء
          </Link >
        </ul>
      </nav>
    </header>
  );
}
