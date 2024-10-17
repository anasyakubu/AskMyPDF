// import React from "react";
import FeatureSection from "../../section/FeatureSection/FeatureSection";
import HeroSection from "../../section/Hero/Hero";
import Nav from "../../ui/Nav";

const Landing = () => {
  return (
    <div className="Landing bg-gray-100">
      <Nav />
      <HeroSection />
      <FeatureSection />
    </div>
  );
};

export default Landing;
