import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY
);

const PDFChatComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [documentContent, setDocumentContent] = useState<string>("");
  const [chat, setChat] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractDocumentContent = async (file: File): Promise<string> => {
    // This is a placeholder function. In a real implementation,
    // you'd use a library like pdf.js for PDFs or mammoth for DOC files.
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        resolve(text as string);
      };
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsLoading(true);
      try {
        const content = await extractDocumentContent(uploadedFile);
        setDocumentContent(content);
        setChat([
          `File uploaded: ${uploadedFile.name}`,
          "AI: Document processed. You can now chat about its contents.",
        ]);
      } catch (error) {
        console.error("Error processing document:", error);
        setChat(["Error processing document. Please try again."]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!file || !userInput.trim() || !documentContent) return;
    setIsLoading(true);
    setChat((prevChat) => [...prevChat, `You: ${userInput}`]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(`
        Document content: ${documentContent.substring(0, 1000)}...
    
        Based on the above document content, please respond to the following: ${userInput}
      `);
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
    if (!file || !documentContent) return;

    setIsLoading(true);
    setChat((prevChat) => [...prevChat, "Generating questions..."]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(`
        Document content: ${documentContent.substring(0, 1000)}...
        
        Based on the above document content, generate 5 relevant questions.
      `);
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
        disabled={isLoading}
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
          placeholder="Chat about the document or ask questions..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading || !file || !documentContent}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PDFChatComponent;
