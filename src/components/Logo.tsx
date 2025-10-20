import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  firstName: string;
  lastName: string;
  disableHoverEffect?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  firstName,
  lastName,
  disableHoverEffect = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleClick = () => {
    navigate("/"); // Navega para a home page
  };

  const shouldShowFirstName = disableHoverEffect
    ? true
    : isMobile
    ? true
    : isHovered;

  return (
    <motion.div
      className="text-blue text-2xl font-display font-bold flex overflow-hidden cursor-pointer"
      onHoverStart={
        disableHoverEffect || isMobile ? undefined : () => setIsHovered(true)
      }
      onHoverEnd={
        disableHoverEffect || isMobile ? undefined : () => setIsHovered(false)
      }
      onClick={handleClick}
      style={{ zIndex: 10 }}
    >
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: shouldShowFirstName ? "auto" : 0,
          opacity: shouldShowFirstName ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block whitespace-nowrap overflow-hidden"
      >
        {firstName}{" "}
      </motion.span>

      <motion.span
        initial={{ x: 0 }}
        animate={{ x: shouldShowFirstName ? 0 : 0 }}
        className="block whitespace-nowrap"
      >
        {lastName}
      </motion.span>
    </motion.div>
  );
};

export default Logo;
