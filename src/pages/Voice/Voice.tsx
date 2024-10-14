import React, { useState, useEffect, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY
);

const VoiceInteractionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  let recognition: SpeechRecognition | null = null;
  let speechSynthesis: SpeechSynthesis | null = null;

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
    }

    speechSynthesis = window.speechSynthesis;

    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setSpeechText(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!speechText.trim()) return;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(speechText);
      const response = result.response;
      setResponseText(response.text());
      speakResponse(response.text());
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      setResponseText("Sorry, there was an error processing your request.");
      speakResponse("Sorry, there was an error processing your request.");
    }
  };

  const speakResponse = (text: string) => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsPaused(false);
      utterance.onstart = () => setIsPaused(true);
      speechSynthesis.speak(utterance);
    }
  };

  const handlePauseResume = () => {
    if (speechSynthesis) {
      if (isPaused) {
        speechSynthesis.resume();
      } else {
        speechSynthesis.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const handleStop = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsPaused(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Voice Interaction</h2>
      <div className="mb-4">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`px-4 py-2 rounded ${
            isListening ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
      <div className="mb-4">
        <textarea
          value={speechText}
          onChange={(e) => setSpeechText(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Spoken text will appear here..."
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send to AI
        </button>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">AI Response:</h3>
        <p>{responseText}</p>
      </div>
      <div>
        <button
          onClick={handlePauseResume}
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
        >
          {isPaused ? "Resume" : "Pause"} Speech
        </button>
        <button
          onClick={handleStop}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop Speech
        </button>
      </div>
    </div>
  );
};

export default VoiceInteractionComponent;
