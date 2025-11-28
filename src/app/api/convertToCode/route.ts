import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, language } = await req.json();

    if (!text || !language) {
      return NextResponse.json({ error: "Missing text or language" }, { status: 400 });
    }

    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY;

    const body = {
      contents: [
        {
          parts: [
            {
              text: `
تحليل الوصف التالي وإعادة تحويله إلى كود فقط:
- اكتشف لغة الوصف تلقائيا.
- تجاهل لغة الوصف الأصلية.
- اكتب الكود النهائي فقط بلغة: ${language}
- لا تضف شرح.
- لا تضف أي كلام خارج الكود.

النص:
${text}
              `,
            },
          ],
        },
      ],
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const code =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "// No output from Gemini";

    return NextResponse.json({ code });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
