import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import projectsData from "../data/projectsData.json";

// Definindo a interface para os projetos
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

// Variantes de animação com tipos corretos
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const hoverVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut" as any,
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as any,
    },
  },
};

function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProjects(projectsData);
    setLoading(false);
  }, []);

  const handleProjectClick = (projectLink: string) => {
    window.location.href = projectLink;
  };

  // Teste: Verifique se o arquivo está acessível
  const testFileAccess = async () => {
    try {
      const response = await fetch("/projectsData.json");
      console.log("File access test:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (response.ok) {
        const content = await response.text();
        console.log("File content preview:", content.substring(0, 200));
      }
    } catch (err) {
      console.error("File access test failed:", err);
    }
  };

  // Execute o teste quando o componente montar
  useEffect(() => {
    testFileAccess();
  }, []);

  if (loading) {
    return (
      <section
        className="min-h-screen py-20 px-5 lg:px-10 flex items-center justify-center"
        id="#works"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="size-8 border-2 border-blue border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-neutral-600">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-5 lg:px-10">
      {/* Debug info - remova depois que funcionar */}
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
          <strong>Debug Info:</strong> {error}
        </div>
      )}

      {/* Header da Gallery */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 font-display">
            Selected Works
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl">
            Selected works showcasing innovative solutions and creative
            approaches to digital challenges.
          </p>
        </div>

        <div className="mt-5 md:mt-0">
          <span className="text-xs lg:text-base text-neutral-600 font-medium block">
            Portfolio
          </span>
          <h3 className="text-2xl font-bold">{projects.length} items</h3>
        </div>
      </motion.div>

      {/* Grid de Projetos Moderno */}
      {projects.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="group cursor-pointer relative overflow-hidden rounded-2xl"
              onClick={() => handleProjectClick(project.link)}
            >
              {/* Card com imagem de fundo */}
              <motion.div
                variants={hoverVariants}
                className="relative h-80 bg-neutral-900 rounded-2xl overflow-hidden"
              >
                {/* Imagem real do projeto */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-start"
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                >
                  {/* Overlay gradiente sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                  {/* Overlay no hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
                </div>

                {/* Conteúdo overlay - versão simplificada */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Categoria no topo */}
                  <div className="flex justify-between items-start">
                    <span className="text-white/80 text-xs font-medium bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue/10 to-purple-500/10" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-neutral-400 text-lg mb-4">No projects found</div>
          <p className="text-neutral-600">
            Please check your projectsData.json file in public folder
          </p>
          <button
            onClick={testFileAccess}
            className="mt-4 bg-blue text-white px-4 py-2 rounded"
          >
            Test File Access
          </button>
        </motion.div>
      )}
    </section>
  );
}

export default Gallery;
