// import React from "react";
import { Moon, Brain, Sparkles, Timer } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-purple-600 flex flex-col items-center justify-center text-white p-6">
      {/* Neural Network Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 10 + "px",
              height: Math.random() * 10 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Icon Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8 justify-items-center">
          <Moon className="w-16 h-16 text-purple-200 animate-pulse" />
          <Brain className="w-16 h-16 text-purple-200 animate-pulse delay-100" />
          <Sparkles className="w-16 h-16 text-purple-200 animate-pulse delay-200" />
          <Timer className="w-16 h-16 text-purple-200 animate-pulse delay-300" />
        </div>

        {/* Main Text */}
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
          Something Amazing is Coming
        </h1>

        <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
          We're crafting the next generation of AI-powered experiences. Get
          ready to witness intelligence meet innovation.
          <br />
          <a className="text-white underline text-sm" href="/">
            Go back 👈👈
          </a>
        </p>

        {/* Email Subscription */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-72 px-6 py-3 rounded-lg bg-purple-700 border border-purple-400 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="w-full sm:w-auto px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-100 transition-colors duration-200">
            Notify Me
          </button>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-purple-700/30 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
            <p className="text-purple-200">
              Advanced machine learning algorithms at your service
            </p>
          </div>
          <div className="p-6 rounded-lg bg-purple-700/30 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-purple-200">
              Optimized for speed and performance
            </p>
          </div>
          <div className="p-6 rounded-lg bg-purple-700/30 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-purple-200">
              Enterprise-grade security protocols
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
