import React, { useState } from "react";

// Note: Replace 'YOUR_API_KEY' with your actual Gemini API key
const API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    {...props}
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
      props.disabled ? "opacity-50 cursor-not-allowed" : ""
    } ${props.className || ""}`}
  >
    {children}
  </button>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <input
    {...props}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      props.className || ""
    }`}
  />
);

const Alert: React.FC<{
  children: React.ReactNode;
  variant: "error" | "success";
}> = ({ children, variant }) => (
  <div
    className={`${
      variant === "error"
        ? "bg-red-100 border-red-400 text-red-700"
        : "bg-green-100 border-green-400 text-green-700"
    } border px-4 py-3 rounded relative`}
    role="alert"
  >
    {children}
  </div>
);

const GeminiTextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateText = async (prompt: string) => {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate text");
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGeneratedText("");

    try {
      const text = await generateText(prompt);
      setGeneratedText(text);
    } catch (err) {
      setError("Failed to generate text. Please try again." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Gemini Text Generator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Generating..." : "Generate Text"}
        </Button>
      </form>
      {error && (
        <Alert variant="error">
          <p>{error}</p>
        </Alert>
      )}
      {generatedText && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Text:</h3>
          <p className="bg-gray-100 p-4 rounded-lg">{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiTextGenerator;
