"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const AboutMeContent: React.FC = () => {
  const text =
    "Versatile C# and .NET Developer with practical Full-Stack experience in Angular, SQL, and MVC architecture. Focused on building scalable web projects, emphasizing performance, best practices, and clean, layered architecture. Proficient in database integration, JWT authentication, and responsive interface design using Tailwind CSS. I am a committed team player seeking a challenging environment to deliver high-quality, optimized solutions and continuously drive innovation.";

  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center p-5 md:p-10 text-neutral-950">
      <div>
        <motion.div
          className="text-3xl text-balance break-all md:text-5xl font-bold text-left leading-snug"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {words.map((word, index) => (
            <motion.span
              variants={child}
              key={index}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMeContent;
