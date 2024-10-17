// import React from 'react'
import image from "../assets/markup.png";
import { TbApi } from "react-icons/tb";
import { SiAnswer } from "react-icons/si";

const FeatureTwo = () => {
  return (
    <div className="FeatureTwo py-10">
      <div className="">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="">
            <img src={image} alt="image" />
          </div>
          <div className="p-8 text-black">
            <div className="">
              <h6 className="text-lg font-light">Match your brand</h6>
              <h3 className="mt-3 text-3xl font-extrabold">
                Customize your companion
              </h3>
              <p className="mt-3 text-lg">
                You can customize the way your AI companion looks, matching your
                brand colors and initial setups.
              </p>
              <div className="list mt-5">
                <h4 className="text-xl flex gap-3">
                  <span className="py-1">
                    <SiAnswer />
                  </span>
                  <span>Suggest Answers</span>
                </h4>
                <p className="mt-3 text-sm">
                  Do not like the answer? You can suggest better answers and
                  companion will correct itself.
                </p>
                <h4 className="text-xl flex gap-3 mt-5">
                  <span className="py-1">
                    <TbApi />
                  </span>
                  <span>Custom API</span>
                </h4>
                <p className="mt-3 text-sm">
                  Need custom integration? Well you can use our APIs to interact
                  with the bot directly.
                </p>
              </div>

              <div className="mt-5">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-purple-600 text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-purple-800 transition-colors">
                    Get started
                  </button>
                  <button className="bg-white text-black px-8 py-3 rounded-md text-sm font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
                    View Pricing →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTwo;
