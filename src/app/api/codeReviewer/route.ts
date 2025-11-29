import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { codeToReview } = await req.json();

    if (!codeToReview || typeof codeToReview !== "string") {
      return NextResponse.json(
        { success: false, error: "No code provided" },
        { status: 400 }
      );
    }

    const model = "gemini-2.5-flash";

    // 🔥 هنا استخدمنا المفتاح اللي انت عايزه
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Missing GEMINI_API_KEY in env" },
        { status: 500 }
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const aiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
قم بمراجعة الكود التالي:

${codeToReview}

أريد:
1. مراجعة الكود.
2. تحسينه إن لزم.
3. كتابة قسم بعنوان "الاقتراحات".

اكتب الرد كنص فقط.
                `,
              },
            ],
          },
        ],
      }),
    });

    // ⭐ ناخد الرد كنص علشان نتجنب JSON empty error
    const raw = await aiRes.text();

    if (!raw || raw.trim() === "") {
      return NextResponse.json(
        { success: false, error: "AI returned empty response" },
        { status: 500 }
      );
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          error: "AI returned invalid JSON (likely API error)",
          raw,
        },
        { status: 500 }
      );
    }

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    if (!result) {
      return NextResponse.json(
        { success: false, error: "AI did not return text", raw: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
