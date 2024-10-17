import React from "react";
import site from "../../assets/markup.png";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen  px-4 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8"></div>
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
          The AI Docs Companion you always wanted.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Train your documents, chat with your documents, and create chatbots
          that solves queries for you and your users.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-purple-800 transition-colors">
            Get started
          </button>
          <button className="bg-white text-black px-8 py-3 rounded-md text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
            View Pricing →
          </button>
        </div>
      </div>
      <div className="mt-16 my-10 w-full flex justify-center text-center bg-white rounded-3xl shadow-lg p-10">
        {/* hello */}
        <img className=" w-full" src={site} alt="site image" />
      </div>
    </div>
  );
};

export default HeroSection;
