// This component is used to render the different products onto the Homepage component

import React from "react";
import "../styles/HeroSection.css";
import iphone from "../assets/iphone.jpg";

const HeroSection = ({ title, subtitle, image, link }) => {
  return (
    <section className="hero_section">
      <div className="align_center">
        <h2 className="hero_title">{title}</h2>
        <p className="hero_subtitle">
          {subtitle}
          <br />
          <br />
          <a href={link} className="hero_link">
            Discover
          </a>
        </p>
      </div>
      <div className="align_center">
        <img src={image} alt="hero_image" className="hero_image" />
      </div>
    </section>
  );
};

export default HeroSection;
