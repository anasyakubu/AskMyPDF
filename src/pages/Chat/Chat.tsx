import { useState } from "react";
import { MessageSquare, Send, Plus, User, Menu, X } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default function Component() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      try {
        const result = await model.generateContent(input);
        const response = result.response;
        const formattedResponse = formatResponse(response.text());

        setIsTyping(false);
        setCurrentResponse("");

        // Reveal text effect
        for (let i = 0; i < formattedResponse.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 20)); // Adjust speed here
          setCurrentResponse((prev) => prev + formattedResponse[i]);
        }

        // Update the current response directly instead of adding it again in the messages state
        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          { role: "assistant", content: formattedResponse },
        ]);
      } catch (error) {
        console.error("Error generating response:", error);
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I encountered an error. Please try again.",
          },
        ]);
      }
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
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-purple-50 text-gray-100">
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
        fixed inset-0 z-40 bg-gray-800 p-4 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:w-64
      `}
      >
        <div className="h-full flex flex-col">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center mb-4">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </button>
          <div className="flex-grow overflow-y-auto">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                className="w-full text-left py-2 px-3 mb-1 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out flex items-center"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Conversation {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {message.role === "user" && (
                <div className="bg-gray-900 text-white rounded-full p-2 mr-2">
                  <User className="h-4 w-4" />
                </div>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-gray-900 text-white"
                    : "bg-purple-500 text-gray-100"
                } shadow-lg`}
              >
                <pre className="whitespace-pre-wrap font-sans">
                  {message.content}
                </pre>
              </div>
              {message.role === "assistant" && (
                <div className="bg-purple-700 text-white rounded-full p-2 ml-2">
                  <MessageSquare className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-purple-700 text-white rounded-full p-2 mr-2">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="bg-purple-500 text-gray-100 rounded-lg p-3 max-w-[80%] shadow-lg">
                <span className="animate-pulse">Typing...</span>
              </div>
            </div>
          )}
          {currentResponse && (
            <div className="flex justify-start mb-4">
              <div className="bg-purple-700 text-white rounded-full p-2 mr-2">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="bg-purple-500 text-gray-100 rounded-lg p-3 max-w-[80%] shadow-lg">
                <pre className="whitespace-pre-wrap font-sans">
                  {currentResponse}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Sender Message Box */}
        <div className="p-4 bg-gray-50 border-t border-gray-300">
          <div className="flex items-start mb-2">
            <div className="bg-gray-900 text-white rounded-full p-2 mr-2">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-grow bg-gray-900 rounded-lg p-3">
              <p className="text-sm font-semibold mb-1 text-white">You</p>
              <p className="text-gray-300">{input || "Type your message..."}</p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex space-x-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-gray-100 border border-black text-gray-900 placeholder-gray-500 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
