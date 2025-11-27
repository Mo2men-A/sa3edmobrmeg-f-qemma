import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { codeToDebug } = await req.json();

    if (!codeToDebug) {
      return NextResponse.json(
        { success: false, error: "No code provided" },
        { status: 400 }
      );
    }

    const MODEL = "models/gemma-3-27b-it";

    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=` +
      process.env.GEMINI_API_KEY;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text:
                  `You are a strict code fixer.\n` +
                  `Fix the following code.\n` +
                  `❗ RETURN THE FIXED CODE.\n` +
                  `❗ EXPLANATION IN ARABIC.\n` +
                  `❗EXPLAIN THE BUG ONLY. \n`+
                  `❗ NO COMMENTS.\n` +
                  `❗WRITE EXPLAINTION AS HEADER TO EXPLANATION UNDER CODE.\n` +
                  `❗ TEXT OUTSIDE THE CODE.\n` +
                  `❗ NO PUNCTUATION MARKS.\n` +
                  codeToDebug,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    const aiResult =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text || "")
        ?.join("") || "";


    if (!aiResult.trim()) {
      console.log("Full Gemini Response:", data);
      return NextResponse.json({
        success: false,
        error: "Gemini returned empty output",
      });
    }

    
    return NextResponse.json({
      success: true,
      result: aiResult.trim(),
    });

  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
