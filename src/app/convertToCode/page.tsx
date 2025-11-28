'use client';

import { useState } from "react";

export default function ConvertToCode() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [loading, setLoading] = useState<boolean>(false);

  const generate = async () => {
    setLoading(true);
    setOutput("");

    try {
      const trimmed = input.trim();
      if (!trimmed) {
        setOutput("// الرجاء إدخال نص في الصندوق الأيسر.");
        return;
      }

      const res = await fetch("/api/convertToCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: trimmed,
          language,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setOutput("// Error: " + data.error);
      } else {
        setOutput(data.code);
      }

    } catch (err: any) {
      setOutput("// خطأ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (e) {}
  };

  return (
    <div className="flex flex-col items-center justify-start py-12 px-4 sm:px-8">
      <div className="w-full max-w-6xl">

        <h1 className="text-4xl font-bold mb-4 font-Alexandria text-right">
          صفحة تحويل من كتابة إلى كود
        </h1>

        <p className="text-lg text-white mb-8 font-Cairo text-right">
          اكتب وصفًا ثم اضغط <strong>Generate</strong> للحصول على كود.
        </p>

       
        <div className="flex justify-end mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 rounded-md border bg-white text-slate-700 shadow-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-slate-700">
              Input — اكتب الوصف هنا
            </label>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="مثال: مصنع زر يغير اللون عند الضغط..."
              className="min-h-[360px] resize-none p-4 rounded-lg shadow-sm border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">

                <button
                  onClick={() =>
                    setInput((s) => s + "\n\n// example: add a button that alerts 'hi'")
                  }
                  className="px-3 py-1.5 text-sm rounded-md bg-slate-100 border hover:bg-slate-200"
                >
                  Add example
                </button>

                <button
                  onClick={() => setInput("")}
                  className="px-3 py-1.5 text-sm rounded-md bg-red-50 text-red-600 border hover:bg-red-100"
                >
                  Clear
                </button>

              </div>

              <div className="text-sm text-slate-500">{input.length} characters</div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-slate-700">
              Output — الكود الناتج
            </label>

            <pre
              className="min-h-[360px] p-4 rounded-lg shadow-sm border border-slate-200 bg-slate-900 text-slate-100 overflow-auto whitespace-pre-wrap"
              aria-live="polite"
            >
              {output || "// النتيجة ستظهر هنا بعد الضغط على Generate"}
            </pre>

            <div className="flex items-center justify-between mt-3">

              <div className="flex gap-2">

                <button
                  onClick={copyOutput}
                  disabled={!output}
                  className={`px-3 py-1.5 text-sm rounded-md border ${
                    output
                      ? "bg-amber-100 hover:bg-amber-200"
                      : "bg-slate-50 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Copy
                </button>

                <button
                  onClick={() => setOutput("")}
                  className="px-3 py-1.5 text-sm rounded-md bg-slate-100 border hover:bg-slate-200"
                >
                  Clear output
                </button>

              </div>

              <div className="text-sm text-slate-500">
                {output ? `${output.split("\n").length} lines` : ""}
              </div>

            </div>
          </div>
        </div>

 
        <div className="mt-8 flex items-center justify-end gap-3">

          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Reset
          </button>

          <button
            onClick={generate}
            disabled={loading}
            className={`px-6 py-3 rounded-md text-white font-medium ${
              loading
                ? "bg-amber-300 cursor-wait"
                : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

        </div>
      </div>
    </div>
  );
}
