import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import GalleryModal from "../components/GalleryModal";
import ProjectGallery from "../components/ProjectGallery";
import ProjectDetails from "../components/ProjectDetails";
import ProjectHeader from "../components/ProjectHeader";

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

// Componente para Loading State
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="size-6 border border-blue border-t-transparent rounded-full"
      />
    </div>
  );
}

// Componente para Project Not Found
function ProjectNotFound({ navigate, formattedDate }) {
  return (
    <div className="min-h-screen flex flex-col justify-between p-5 lg:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Logo firstName="mateus" lastName="cerqueira" />
        <div className="flex justify-center mt-5 md:mt-0 flex-wrap gap-10 lg:gap-20 items-start md:items-center">
          <div className="text-center md:text-right">
            <span className="text-xs lg:text-base text-neutral-600 font-medium">
              Error
            </span>
            <h1 className="text-xl font-bold">Project not found</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue rounded-xl lg:rounded-2xl text-sm md:text-base text-white px-5 md:px-10 py-2.5 md:py-5 font-medium hover:bg-blue/90 transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div></div>
        <div className="text-right">
          <span className="text-xs lg:text-base text-neutral-600 font-medium">
            Current date
          </span>
          <h1 className="text-xl font-bold">{formattedDate}</h1>
        </div>
      </div>
    </div>
  );
}

// Componente para Main Project Image
function MainProjectImage({ project }) {
  if (!project.image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl w-full h-auto mx-auto"
    >
      <div
        className="
    w-full 
    h-screen 
    md:h-auto 
    md:aspect-video 
    bg-blue 
    bg-cover 
    bg-top 
    rounded-2xl
  "
        style={{ backgroundImage: `url(${project.image})` }}
      />
    </motion.div>
  );
}

export default function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para a galeria
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" });
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${month}'${day}`;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch("/projectsData.json");
        const projects = await response.json();
        const foundProject = projects.find(
          (p) => p.id.toString() === projectId
        );
        setProject(foundProject || null);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!project) {
    return (
      <ProjectNotFound navigate={navigate} formattedDate={formattedDate} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-5 lg:p-10 bg-white">
      {/* Header */}
      <ProjectHeader navigate={navigate} />

      {/* Project Title and Description */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center lg:mb-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl lg:text-7xl font-display font-bold mb-5"
        >
          {project.title}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl text-neutral-600">
          {project.description}
        </motion.p>
      </motion.div>

      {/* Main Project Image */}
      <div className="flex-1 flex items-center justify-center py-5 gap-5 mb-2 md:mb-5 lg:mb-10">
        <div className="flex w-full">
          <MainProjectImage project={project} />
        </div>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <ProjectGallery
          project={project}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setModalImageIndex={setModalImageIndex}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {/* Project Details */}
      <ProjectDetails project={project} />

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
        modalImageIndex={modalImageIndex}
        setModalImageIndex={setModalImageIndex}
      />
    </div>
  );
}
