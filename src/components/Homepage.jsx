import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../assets/iphone.jpg";
import workstation from "../assets/workstation.jpg";

const Homepage = () => {
  return (
    <div>
      <HeroSection
        title="Elevate Your Digital Ecosystem"
        subtitle="Unlock Endless Possibilities: Dive Into Our Selection of Apple Products and Beyond"
        image={iphone}
        link="/"
      />

      <HeroSection
        title="Sleek Tech Essentials"
        subtitle="Craft Your Productivity Oasis with Our Selection of Tech and Accessories"
        image={workstation}
        link=""
      />
    </div>
  );
};

export default Homepage;
