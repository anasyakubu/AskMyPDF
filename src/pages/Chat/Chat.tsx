import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY
);

const PDFChatComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [chat, setChat] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setChat([`File uploaded: ${uploadedFile.name}`]);
    }
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!file || !userInput.trim()) return;

    setIsLoading(true);
    setChat((prevChat) => [...prevChat, `You: ${userInput}`]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userInput);
      const response = result.response;
      setChat((prevChat) => [...prevChat, `AI: ${response.text()}`]);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      setChat((prevChat) => [
        ...prevChat,
        "AI: Sorry, there was an error processing your request.",
      ]);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  const handleGenerateQuestions = async () => {
    if (!file) return;

    setIsLoading(true);
    setChat((prevChat) => [...prevChat, "Generating questions..."]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        `Generate 5 questions based on the content of the file: ${file.name}`
      );
      const response = result.response;
      setChat((prevChat) => [
        ...prevChat,
        `AI Generated Questions:\n${response.text()}`,
      ]);
    } catch (error) {
      console.error("Error generating questions:", error);
      setChat((prevChat) => [
        ...prevChat,
        "AI: Sorry, there was an error generating questions.",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDF/DOC Chat with AI</h1>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Upload PDF/DOC
      </button>
      {file && (
        <div className="mb-4">
          <p>File uploaded: {file.name}</p>
          <button
            onClick={handleGenerateQuestions}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            disabled={isLoading}
          >
            Generate Questions
          </button>
        </div>
      )}
      <div className="border p-4 h-64 overflow-y-auto mb-4">
        {chat.map((message, index) => (
          <p key={index} className="mb-2">
            {message}
          </p>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          className="flex-grow border p-2 mr-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading || !file}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PDFChatComponent;
