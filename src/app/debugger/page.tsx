"use client";

import { useState } from "react";

export default function DebuggerPage() {
  const [code, setCode] = useState<string>("");
  const [fixedCode, setFixedCode] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDebug = async () => {
    setIsLoading(true);
    setError(null);
    setFixedCode("");
    setExplanation("");

    try {
      const response = await fetch("/api/debugger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeToDebug: code }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const aiResult: string = data.result;
        const explanationIndex = aiResult.toLowerCase().indexOf("الخطأ");

        if (explanationIndex !== -1) {
          setFixedCode(aiResult.slice(0, explanationIndex).trim());
          setExplanation(aiResult.slice(explanationIndex).trim());
        } else {
          setFixedCode(aiResult.trim());
          setExplanation("لم يتم توفير شرح من الـ AI");
        }
      } else {
        setError(data.error || "An unknown error occurred");
      }
    } catch (err) {
      setError("Failed to connect to the API. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 ">
      <h1 className="text-4xl font-bold mb-6 text-center font-Alexandria text-white">
        مصحح اخطاء
      </h1>

      {error && (
        <div className="mb-6 bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
          <strong>Error: </strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        
        <div>
          <h2 className="text-xl font-semibold mb-2 font-Alexandria text-right">ادخل الكود</h2>
          <textarea
            rows={15}
            className="w-full h-120 p-3 bg-gray-900 text-green-400 font-mono rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f7c948] "
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
          />
        </div>

      
        <div>
          <h2 className="text-xl font-semibold mb-2 font-Alexandria text-right">الكود المصحح</h2>

          <div className="relative">
            <button
              onClick={() => copyToClipboard(fixedCode)}
              className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 text-xs rounded cursor-pointer"
            >
              Copy
            </button>

            <pre className="w-full h-120 p-4 bg-gray-900 text-gray-200 rounded-md border border-gray-700 overflow-auto">
              {fixedCode}
            </pre>
          </div>
        </div>

      
        <div>
          <h2 className="text-xl font-semibold mb-2 font-Alexandria text-right">الشرح</h2>

          <div className="relative">
            <button
              onClick={() => copyToClipboard(explanation)}
              className="absolute top-2 right-2 bg-gray-300 text-black px-2 py-1 text-xs rounded cursor-pointer"
            >
              Copy
            </button>

            <pre className="w-full h-120 p-4 bg-gray-100 text-gray-900 rounded-md border border-gray-300 overflow-auto whitespace-pre-wrap wrap-break-words font-Cairo">
              {explanation}
            </pre>
          </div>
        </div>
      </div>

      <button
        onClick={handleDebug}
        disabled={isLoading}
        className="mt-20 bg-[#556244] text-white py-5 px-6 rounded-md font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors justify-center flex mx-auto font-Cairo"
      >
        {isLoading ? "يصحح" : "ابدأ التصحيح"}
      </button>
    </div>
  );
}
