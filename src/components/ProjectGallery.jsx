import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function ProjectGallery({
  project,
  currentIndex,
  setCurrentIndex,
  setModalImageIndex,
  setIsModalOpen,
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full py-10"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl lg:text-5xl font-bold mb-6 font-display"
      >
        Project Gallery
      </motion.h2>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Main Carousel Image - Agora clicável */}
        <motion.button
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full aspect-video lg:aspect-[16/8] bg-neutral-100 bg-cover bg-top rounded-2xl mb-6 lg:mb-8 cursor-zoom-in"
          style={{
            backgroundImage: `url(${project.gallery[currentIndex]})`,
          }}
          onClick={() => {
            setModalImageIndex(currentIndex);
            setIsModalOpen(true);
          }}
        />

        {/* Thumbnail Strip - Com scroll horizontal melhorado */}
        <div className="relative">
          <div className="flex gap-3 lg:gap-4 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
            {project.gallery.map((src, index) => (
              <button
                key={index}
                className={`flex-shrink-0 w-20 lg:w-24 aspect-video bg-cover bg-top rounded-lg overflow-hidden border-2 transition-all duration-300 min-w-[80px] ${
                  index === currentIndex
                    ? "border-blue-500 scale-105"
                    : "border-transparent hover:border-neutral-300"
                }`}
                style={{ backgroundImage: `url(${src})` }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          {/* Gradient overlay para indicar scroll no mobile */}
          <div className="absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden" />
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 lg:p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 lg:opacity-100 lg:group-hover:opacity-100"
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? project.gallery.length - 1 : prev - 1
            )
          }
        >
          <svg
            className="w-4 h-4 lg:w-5 lg:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 lg:p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 lg:opacity-100 lg:group-hover:opacity-100"
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === project.gallery.length - 1 ? 0 : prev + 1
            )
          }
        >
          <svg
            className="w-4 h-4 lg:w-5 lg:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentIndex + 1} / {project.gallery.length}
        </div>
      </div>
    </motion.div>
  );
}
