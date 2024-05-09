import React from "react";
import HeroSection from "./HeroSection";
import iphone14 from "../assets/iphone-14-pro.webp";
import workstation from "../assets/workstation.jpg";
import FeaturedProducts from "./FeaturedProducts";

const Homepage = () => {
  return (
    <div>
      <HeroSection
        title="Elevate Your Digital Ecosystem"
        subtitle="Unlock Endless Possibilities: Dive Into Our Selection of Apple Products and Beyond"
        image={iphone14}
        link="/"
      />
      <FeaturedProducts />
      <HeroSection
        title="Sleek Tech Essentials"
        subtitle="Craft Your Productivity Oasis with Our Selection of Tech and Accessories"
        image={workstation}
        link="/"
      />
    </div>
  );
};

export default Homepage;
