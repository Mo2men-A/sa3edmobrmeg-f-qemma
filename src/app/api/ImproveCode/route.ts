import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code || code.trim() === "") {
      return NextResponse.json({ error: "لم يتم إدخال أي كود" }, { status: 400 });
    }


    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });


    const prompt = `قم بتحسين الكود التالي من حيث الأداء والقراءة مع الحفاظ على نفس الوظيفة:\n${code}   ثم قدم النسخة المحسنة من الكود فقط بدون أي شرح أو تعليقات.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ patch: responseText });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: "فشل في معالجة الطلب" }, { status: 500 });
  }
}
