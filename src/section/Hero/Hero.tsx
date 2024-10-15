import React from "react";
import site from "../../assets/site.png";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8"></div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          The AI Docs Companion you always wanted.
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Train your documents, chat with your documents, and create chatbots
          that solves queries for you and your users.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition-colors">
            Get started
          </button>
          <button className="bg-white text-black px-8 py-3 rounded-md text-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
            View Pricing →
          </button>
        </div>
      </div>
      <div className="mt-16 w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {/* hello */}
        <img src={site} alt="site image" />
      </div>
    </div>
  );
};

export default HeroSection;
