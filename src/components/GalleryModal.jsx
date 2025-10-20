import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function GalleryModal({
  isOpen,
  onClose,
  project,
  modalImageIndex,
  setModalImageIndex,
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Scroll manual
  const handleScroll = (e) => {
    const container = e.target;
    const image = imageRef.current;
    if (!image) return;

    const maxScroll = image.scrollHeight - container.clientHeight;
    const progress =
      maxScroll > 0 ? (container.scrollTop / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  };

  // Reset scroll quando muda a imagem
  const resetScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      setScrollProgress(0);
    }
  };

  // Reset quando muda a imagem
  useEffect(() => {
    resetScroll();
  }, [modalImageIndex]);

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Detectar dimensões da imagem
  const handleImageLoad = (e) => {
    const img = e.target;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  };

  if (!isOpen) return null;

  const currentImage = project.gallery[modalImageIndex];
  const isTallImage = imageDimensions.height > imageDimensions.width * 1.5;
  const hasMultipleImages = project.gallery.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 w-full h-full bg-black/95 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
          <button
            className="text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-200 border border-white/20"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close viewer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Botão reset scroll apenas para imagens altas */}
          {isTallImage && (
            <button
              className="text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-200 border border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                resetScroll();
              }}
              aria-label="Scroll to top"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Container principal */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Container da imagem com aspect-video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-7xl max-h-[80vh]  bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Container de scroll */}
            <div
              ref={scrollContainerRef}
              className="w-full h-full  scrollbar-hide overflow-y-auto max-h-screen [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-950 [&::-webkit-scrollbar-thumb]:bg-gray-600 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500"
              onScroll={handleScroll}
            >
              <img
                ref={imageRef}
                src={currentImage}
                alt={`Landing page preview - ${modalImageIndex + 1}`}
                className="w-full h-auto object-cover"
                draggable="false"
                onLoad={handleImageLoad}
              />
            </div>

            {/* Indicador de progresso */}
            {isTallImage && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-full h-2 border border-white/20">
                <div
                  className="bg-blue h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            )}

            {/* Overlay de instruções */}
            {isTallImage && scrollProgress === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center max-w-sm mx-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Full Page Preview
                  </h3>
                  <p className="text-white/70 text-sm">
                    Scroll to explore the complete landing page
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Footer com navegação */}
        <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-t from-black/80 to-transparent">
          {/* Navegação */}
          {hasMultipleImages && (
            <div className="flex items-center gap-4">
              <button
                className="text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-200 border border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImageIndex((prev) =>
                    prev === 0 ? project.gallery.length - 1 : prev - 1
                  );
                }}
                aria-label="Previous image"
              >
                <svg
                  className="w-5 h-5"
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

              <div className="text-white text-sm bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                {modalImageIndex + 1} / {project.gallery.length}
              </div>

              <button
                className="text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-200 border border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImageIndex((prev) =>
                    prev === project.gallery.length - 1 ? 0 : prev + 1
                  );
                }}
                aria-label="Next image"
              >
                <svg
                  className="w-5 h-5"
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
            </div>
          )}

          {/* Status do scroll */}
          <div className="text-white/60 text-sm">
            {isTallImage
              ? `Scroll progress: ${Math.round(scrollProgress)}%`
              : "Full preview"}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
