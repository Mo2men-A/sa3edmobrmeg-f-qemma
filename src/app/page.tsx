export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden py-[clamp(24px,5vw,80px)] px-[clamp(16px,4vw,64px)]">
        <div className="relative text-right ml-auto w-full lg:w-1/2" dir="rtl">
          
          <h1 className="text-[clamp(24px,6vw,64px)] font-bold tracking-tight font-Cairo text-white cursor-default leading-[clamp(1.2,1.1vw,1.1)]">
            سَاعِدْ مُبَرْمِج — منصّة ذكية لدعم المبرمج العربي
          </h1>

          <p className="mt-[clamp(16px,4vw,40px)] text-[clamp(16px,2.5vw,24px)] leading-[clamp(1.4,2.5vw,2)] text-[#E4D7B5] max-w-full lg:max-w-4xl">
            سَاعِدْ مُبَرْمِج هو موقع يعتمد على الذكاء الاصطناعي لمساعدة
            المبرمج العربي في جميع مراحل كتابة الكود — من تحويل الأفكار إلى
            كود جاهز، وتنظيم وتحسين الأداء، إلى مراجعة الأخطاء وتصحيحها.
            يقدّم الموقع تجربة سهلة، سريعة، وذكية تساعد المطوّر على رفع
            جودة برمجته وتسريع إنتاجه في المشاريع.
          </p>

          <div className="mt-[clamp(16px,4vw,40px)] flex justify-start lg: gap-x-[clamp(8px,2vw,24px)]">
            <a
              href="/knowMore"
              className="rounded-md bg-[#556244] px-[clamp(12px,3vw,48px)] py-[clamp(8px,2vw,20px)] text-[clamp(16px,2.5vw,24px)] font-semibold text-white shadow-sm font-Alexandria mt-20 "
            >
              اعرف اكتر
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
