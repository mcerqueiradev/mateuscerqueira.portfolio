"use client";

import React from "react";
import { VelocityScroll } from "../components/VelocityScroll";
import AboutMeContent from "./AboutMeContent";

const About: React.FC = () => {
  return (
    <section className="min-h-screen">
      <div className="py-32 w-full">
        {" "}
        <VelocityScroll
          text="CODE. ARCHITECT. OPTIMIZE. REPEAT."
          default_velocity={2}
          className="
            font-display text-8xl md:text-[10rem] lg:text-[14rem] 
            font-bold tracking-tighter 
            leading-none 
            text-neutral-950
          "
        />
      </div>
      <AboutMeContent />
    </section>
  );
};

export default About;
