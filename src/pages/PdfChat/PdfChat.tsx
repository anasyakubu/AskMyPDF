import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  MessageSquare,
  Send,
  Upload,
  FileText,
  Bot,
  User,
  Menu,
  X,
  Loader2,
} from "lucide-react";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default function EnhancedPDFChatComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [documentContent, setDocumentContent] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([
    {
      role: "assistant",
      content:
        "Hello! Please upload a PDF or DOC file to start chatting about its contents.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, currentResponse]);

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
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: `File uploaded: ${uploadedFile.name}. Document processed. You can now chat about its contents.`,
          },
        ]);
      } catch (error) {
        console.error("Error processing document:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: "Error processing document. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSend = async () => {
    if (!file || !input.trim() || !documentContent) return;
    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await model.generateContent(`
        Document content: ${documentContent.substring(0, 1000)}...
    
        Based on the above document content, please respond to the following: ${input}
      `);
      const response = result.response;
      const formattedResponse = formatResponse(response.text());

      setIsTyping(false);
      setCurrentResponse("");

      // Reveal text effect
      let tempResponse = "";
      for (let i = 0; i < formattedResponse.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 20)); // Adjust speed here
        tempResponse += formattedResponse[i];
        setCurrentResponse(tempResponse);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: tempResponse },
      ]);
      setCurrentResponse("");
    } catch (error) {
      console.error("Error generating response:", error);
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (text: string) => {
    // Simple formatting: add newlines before lists and indentation
    return text
      .replace(/(\d+\.\s)/g, "\n$1")
      .replace(/(-\s)/g, "\n  $1")
      .trim();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-purple-50 text-gray-900">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-50 p-2 rounded-full"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-900" />
        ) : (
          <Menu className="h-6 w-6 text-gray-900" />
        )}
      </button>

      {/* Sidebar / Mega Menu */}
      <div
        className={`
        fixed inset-0 z-40 bg-gray-900 p-4 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:w-64
      `}
      >
        <div className="h-full flex flex-col">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {file ? (
              <>
                <FileText className="mr-2 h-4 w-4" />
                {file.name}
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload PDF/DOC
              </>
            )}
          </button>
          <div className="flex-grow overflow-y-auto">
            {file && (
              <button className="w-full text-left py-2 px-3 bg-gray-200 text-black mb-1 rounded-lg hover:bg-gray-800 hover:text-gray-100 transition duration-200 ease-in-out flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Current Document Chat
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto" ref={chatContainerRef}>
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {message.role === "user" ? (
                <div className="bg-gray-900 text-white rounded-full p-2 ml-2">
                  <User className="h-4 w-4" />
                </div>
              ) : (
                <div className="bg-purple-600 text-white rounded-full p-2 mr-2">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-900"
                } shadow-lg`}
              >
                <pre className="whitespace-pre-wrap font-sans">
                  {message.content}
                </pre>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-purple-600 text-white rounded-full p-2 mr-2">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-gray-100 text-gray-900 rounded-lg p-3 max-w-[80%] shadow-lg">
                <span className="animate-pulse">Typing...</span>
              </div>
            </div>
          )}
          {currentResponse && (
            <div className="flex justify-start mb-4">
              <div className="bg-purple-600 text-white rounded-full p-2 mr-2">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-gray-100 text-gray-900 rounded-lg p-3 max-w-[80%] shadow-lg">
                <pre className="whitespace-pre-wrap font-sans">
                  {currentResponse}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-50 border-t border-gray-300">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chat about the document or ask questions..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              disabled={isLoading || !file || !documentContent}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
