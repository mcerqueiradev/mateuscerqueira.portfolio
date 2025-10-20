import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";

// Variantes de animação com tipos corretos
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const socialVariants: Variants = {
  hover: {
    scale: 1.1,
    y: -2,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const socialLinks = [
    { name: "GitHub", url: "https://github.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Dribbble", url: "https://dribbble.com" },
  ];

  const quickLinks = [
    { name: "Work", url: "/work" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <footer className="min-h-screen bg-white relative overflow-hidden">
      {/* Main Content - Centro da tela */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center py-20 px-5 lg:px-10 ">
        {/* Texto Principal Grande */}
        <motion.div
          className="text-center mb-20 font-display"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-6xl lg:text-8xl font-bold mb-8 tracking-tight"
            variants={textVariants}
          >
            LET'S
            <br />
            <span className="text-blue">WORK</span>
            <br />
            TOGETHER
          </motion.h2>

          <motion.div variants={itemVariants} className="mt-16">
            <motion.button className="bg-blue text-white text-lg font-medium px-16 py-4 rounded-xl transition-all duration-300 font-inter">
              GET IN TOUCH
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom Section - Layout que você gostou */}
        <motion.div
          className="border-t border-neutral-200 pt-10 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Left - Logo & Copyright */}
            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left mb-6 lg:mb-0"
            >
              <div className="text-2xl font-bold mb-2">
                <Logo
                  firstName="mateus"
                  lastName="cerqueira"
                  disableHoverEffect={true}
                />
              </div>
              <p className="text-neutral-600 text-sm">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </motion.div>

            {/* Center - Quick Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 mb-6 lg:mb-0"
            >
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="text-neutral-600 hover:text-blue transition-colors duration-300 text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>

            {/* Right - Social & Time */}
            <motion.div
              variants={itemVariants}
              className="text-center lg:text-right"
            >
              <div className="flex gap-6 justify-center lg:justify-end mb-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    variants={socialVariants}
                    whileHover="hover"
                    className="text-neutral-600 hover:text-blue transition-colors duration-300 text-sm font-medium flex items-center gap-1"
                  >
                    {social.name}
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </motion.a>
                ))}
              </div>

              <div className="text-xs text-neutral-500">
                <span className="font-mono">{formattedTime}</span>
                <span className="mx-2">•</span>
                <span>{formattedDate}</span>
              </div>
            </motion.div>
          </div>

          {/* Signature */}
          <motion.div variants={itemVariants} className="text-center mt-10">
            <p className="text-neutral-400 text-sm">
              Crafted by Mateus Cerqueira with ❤️
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
