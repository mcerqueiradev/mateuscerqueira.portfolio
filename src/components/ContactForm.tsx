import Logo from "./Logo";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ContactForm() {
  const navigate = useNavigate();

  const handleEmailClick = () => {
    const subject = "Let's work together!";
    const body =
      "Hello Mateus,\n\nI would like to discuss a project with you.\n\nBest regards,";

    window.location.href = `mailto:mateusjesus2309@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="flex flex-col justify-between h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center mb-10 p-10"
      >
        <Logo
          firstName="mateus"
          lastName="cerqueira"
          disableHoverEffect={true}
        />
        <button
          onClick={() => navigate("/")}
          className="bg-blue rounded-xl lg:rounded-2xl text-sm md:text-base text-white px-5 md:px-10 py-2.5 md:py-5 font-medium hover:bg-blue/90 transition-colors mt-5 md:mt-0"
        >
          Close
        </button>
      </motion.div>
      <div className="flex flex-col md:flex-row justify-between items-start p-5 lg:p-10 gap-10">
        {/* Left Column - Title */}
        <div className="flex-1">
          <h2 className="text-5xl lg:text-6xl font-bold mb-5 font-display">
            Get in Touch
          </h2>
          <p className="text-neutral-600 text-lg lg:text-xl max-w-md">
            Let's work together to bring your ideas to life
          </p>

          {/* Contact Info */}
          <div className="mt-8 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-blue rounded-full"></div>
                <span className="text-neutral-600 font-medium">Email</span>
              </div>
              <p className="text-xl font-bold">mateusjesus2309@gmail.com</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-blue rounded-full"></div>
                <span className="text-neutral-600 font-medium">Location</span>
              </div>
              <p className="text-xl font-bold">Portugal</p>
            </div>
          </div>
        </div>

        {/* Right Column - Simple Contact */}
        <div className="flex-1 w-full">
          <div className="space-y-6">
            <div className="text-neutral-600 text-lg">
              <h3 className="text-2xl font-bold mb-4 text-black">
                Ready to start your project?
              </h3>
              <p className="mb-4">
                I'm currently available for freelance work and new
                opportunities. Whether you have a project in mind or just want
                to explore potential collaborations, I'd love to hear from you.
              </p>
              <p className="mb-4">
                Let's discuss how we can transform your ideas into exceptional
                digital experiences.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">
                  Available for new projects
                </span>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleEmailClick}
                  className="bg-blue rounded-xl lg:rounded-2xl text-white cursor-pointer px-8 py-4 font-medium hover:bg-blue/90 transition-colors w-full md:w-auto mt-10"
                >
                  Send me an Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Additional Info */}
      <div className="flex flex-col md:flex-row justify-between items-center p-5 lg:p-10 border-t border-neutral-200 mt-10">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20 items-center">
          <div className="text-center md:text-left">
            <span className="text-xs lg:text-base text-neutral-600 font-medium">
              Response Time
            </span>
            <h3 className="text-xl font-bold">24-48 Hours</h3>
          </div>
          <div className="text-center md:text-left">
            <span className="text-xs lg:text-base text-neutral-600 font-medium">
              Availability
            </span>
            <h3 className="text-xl font-bold">Open for Projects</h3>
          </div>
        </div>

        <div className="mt-5 md:mt-0">
          <a
            href="/Mateus_Cerqueira_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-blue rounded-xl lg:rounded-2xl text-sm md:text-base text-blue cursor-pointer px-5 md:px-10 py-2.5 md:py-5 font-medium hover:bg-blue hover:text-white transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
