"use client";

import { useState } from "react";

export default function ReviewPage() {
  const [code, setCode] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleReview = async () => {
    setIsLoading(true);
    setError(null);
    setReview("");
    setSuggestions("");

    try {
      const response = await fetch("/api/codeReviewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeToReview: code }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const aiResult: string = data.result;
        const suggestionsIndex = aiResult.toLowerCase().indexOf(" الاقتراحات");

        if (suggestionsIndex !== -1) {
          setReview(aiResult.slice(0, suggestionsIndex).trim());
          setSuggestions(aiResult.slice(suggestionsIndex).trim());
        } else {
          setReview(aiResult.trim());
          setSuggestions("لم يتم توفير اقتراحات من الـ AI");
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
        مراجعة الكود
      </h1>

      {error && (
        <div className="mb-6 bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
          <strong>Error: </strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
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
          <h2 className="text-xl font-semibold mb-2 font-Alexandria text-right">مراجعة AI</h2>

          <div className="relative">
            <button
              onClick={() => copyToClipboard(review)}
              className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 text-xs rounded cursor-pointer"
            >
              Copy
            </button>

            <pre className="w-full h-120 p-4 bg-gray-900 text-gray-200 rounded-md border border-gray-700 overflow-auto whitespace-pre-wrap">
              {review}
            </pre>
          </div>
        </div>
      </div>

      <button
        onClick={handleReview}
        disabled={isLoading}
        className="mt-20 bg-[#556244] text-white py-5 px-6 rounded-md font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors justify-center flex mx-auto font-Cairo"
      >
        {isLoading ? "يتم المراجعة" : "ابدأ المراجعة"}
      </button>
    </div>
  );
}
