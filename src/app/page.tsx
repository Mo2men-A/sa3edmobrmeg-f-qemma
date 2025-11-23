export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden h-screen py-25">
        

        <div className="relative mr-[50px] text-right ml-auto w-1/2" dir="rtl">
          <h1 className="text-6xl h-[140px] font-bold tracking-tight font-Cairo w-3xl text-white cursor-default">
            سَاعِدْ مُبَرْمِج — منصّة ذكية لدعم المبرمج العربي
          </h1>

          <p className="mt-20 mr-20 max-w-4xl text-3xl leading-8 text-[#E4D7B5]">
            سَاعِدْ مُبَرْمِج هو موقع يعتمد على الذكاء الاصطناعي لمساعدة المبرمج
            العربي في جميع مراحل كتابة الكود — من تحويل الأفكار إلى كود جاهز،
            وتنظيم وتحسين الأداء، إلى مراجعة الأخطاء وتصحيحها. يقدّم الموقع
            تجربة سهلة، سريعة، وذكية تساعد المطوّر على رفع جودة برمجته وتسريع
            إنتاجه في المشاريع.
          </p>

          <div className="mt-40 mr-20 flex justify-right gap-x-6">
            <a
              href="/knowMore"
              className="rounded-md bg-[#556244] px-12 py-4 text-2xl font-semibold text-white shadow-sm hover:bg-[#556244] font-Alexandria"
            >
              اعرف اكتر
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
