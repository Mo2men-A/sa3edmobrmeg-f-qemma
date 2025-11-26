"use client";

import { useState } from "react";

export default function DebuggerPage() {
  const [code, setCode] = useState<string>("");
  const [fixedCode, setFixedCode] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
        const explanationIndex = aiResult.toLowerCase().indexOf("explanation");
        
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
      <h1 className="text-4xl font-bold mb-6 text-center font-Alexandria text-white">مصحح اخطاء</h1>

      
       {error && (
        <div className="mb-6 bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
          <strong>Error: </strong> {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Input Code</h2>
          <textarea
            rows={15}
            className="w-full  p-3 bg-gray-900 text-green-400 font-mono rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#556244]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
          />
        </div>

      
        <div>
          <h2 className="text-xl font-semibold mb-2">Fixed Code</h2>
          <pre className="w-full h-full p-4 bg-gray-900 text-gray-200 rounded-md border border-gray-700 overflow-x-auto overflow-y-auto">
            {fixedCode}
          </pre>
        </div>

       
        <div>
          <h2 className="text-xl font-semibold mb-2">Explanation (Arabic)</h2>
          <pre className="w-full h-full p-4 bg-gray-100 text-gray-900 rounded-md border border-gray-300 overflow-x-auto overflow-y-auto">
            {explanation}
          </pre>
        </div>
      </div>

      <button
        onClick={handleDebug}
        disabled={isLoading}
        className="mt-20  bg-[#556244] text-white py-5 px-6 rounded-md font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors justify-center flex mx-auto"
      >
        {isLoading ? "Debugging..." : "Debug Code"}
      </button>


      
    </div>
  );
}
