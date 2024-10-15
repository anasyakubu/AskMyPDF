import React from "react";
import HeroSection from "../../section/Hero/Hero";
import Nav from "../../ui/Nav";

const Landing = () => {
  return (
    <div className="Landing">
      <Nav />
      <div className="mt-5"></div>
      <HeroSection />
    </div>
  );
};

export default Landing;
