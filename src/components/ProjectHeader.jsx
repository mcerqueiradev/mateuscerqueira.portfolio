import { motion } from "framer-motion";
import Logo from "./Logo";

export default function ProjectHeader({ navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row justify-between items-center mb-10"
    >
      <Logo firstName="mateus" lastName="cerqueira" />
      <button
        onClick={() => navigate("/")}
        className="bg-blue rounded-xl lg:rounded-2xl text-sm md:text-base text-white px-5 md:px-10 py-2.5 md:py-5 font-medium hover:bg-blue/90 transition-colors mt-5 md:mt-0"
      >
        Close
      </button>
    </motion.div>
  );
}
