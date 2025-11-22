export default function Header() {
  return (
    <header className="w-full bg-[#8B2F2F]  " dir="rtl">
      <nav className="mr-10 ml-20 px-4 py-4 flex items-center justify-between mt-8 ">
        <a href="/" className="text-5xl font-bold text-white font-Alexandria ">
          سَاعِدْ  مُبَرْجَ
        </a>

        <ul
          className="flex gap-12 text-2xl text-white border border-black/20  px-50 py-6 rounded-[100px] 
          font-Alexandria backdrop-filter:blur(100px)  backdrop-blur-5xl bg-white/15 inset-ring-2 inset-ring-[#E4D7B5] shadow-lg ">
          <li className="hover:text-[#556244] cursor-pointer transition">
           تحويل من كتابه الي كود
          </li>
          <li className="hover:text-[#556244] cursor-pointer transition">
           تنظيم الكود
          </li>
          <li className="hover:text-[#556244] cursor-pointer transition">
            تحسين الأداء
          </li>
          <li className="hover:text-[#556244] cursor-pointer transition">
           مراجعة الكود
          </li>
          <li className="hover:text-[#556244] cursor-pointer transition">
           مصحح الأخطاء
          </li>
        </ul>
      </nav>
    </header>
  );
}
