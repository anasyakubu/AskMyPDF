// import React from 'react'
import image from "../assets/markup.png";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { TbMathIntegralX } from "react-icons/tb";

const FeatureOne = () => {
  return (
    <div className="FeatureOne py-10">
      <div className="">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="p-8 text-black">
            <div className="">
              <h6 className="text-lg font-light">Move faster with DocsAI</h6>
              <h3 className="mt-3 text-3xl font-extrabold">
                Modernize your workflow
              </h3>
              <p className="mt-3 text-lg">
                Organize your documents and train your companion on DocsAI. Now
                you can easily find anything you search for in your documents.
              </p>
              <div className="list mt-5">
                <h4 className="text-xl flex gap-3">
                  <span className="py-1">
                    <BiSolidSelectMultiple />
                  </span>
                  <span>Multiple Sources</span>
                </h4>
                <p className="mt-3 text-sm">
                  DocsAI seamlessly integrates with a variety of sources,
                  including websites, Text Files, PDFs, Docx , Notion and
                  Confluence.
                </p>
                <h4 className="text-xl flex gap-3 mt-5">
                  <span className="py-1">
                    <TbMathIntegralX />
                  </span>
                  <span>Integrations</span>
                </h4>
                <p className="mt-3 text-sm">
                  DocsAI integrates with Slack. Integration with Crisp, Discord
                  & Other datasources like DB are coming soon.
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
          <div className="">
            <img src={image} alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureOne;
