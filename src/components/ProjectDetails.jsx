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

export default function ProjectDetails({ project }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full py-10 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        {/* Overview */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display">
            Project Overview
          </h2>
          <p className="text-lg text-neutral-700 leading-relaxed">
            {project.fullDescription || project.description}
          </p>
        </motion.div>

        {/* Details Sidebar */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Technologies */}
          {project.technologies && (
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs font-medium text-neutral-700 px-5 py-2 rounded-xl border border-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features && (
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display">
                Key Features
              </h2>
              <div className="flex flex-wrap space-y-2">
                {project.features.map((feature, index) => (
                  <div key={index} className="w-full sm:w-auto py-1 md:p-2">
                    <p className="flex text-xs font-medium text-neutral-700 p-5 rounded-xl border border-neutral-200">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* New Additional Information Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
        {/* Technical Highlights */}
        {project.technicalHighlights && (
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display">
              Technical Highlights
            </h2>
            <div className="space-y-4">
              {project.technicalHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-neutral-700 leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Project Details */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Role & Duration */}
          <div className="grid grid-cols-2 gap-4">
            {project.role && (
              <div>
                <span className="text-sm text-neutral-600 font-medium block mb-1">
                  Role
                </span>
                <p className="text-lg font-semibold">{project.role}</p>
              </div>
            )}
            {project.duration && (
              <div>
                <span className="text-sm text-neutral-600 font-medium block mb-1">
                  Duration
                </span>
                <p className="text-lg font-semibold">{project.duration}</p>
              </div>
            )}
          </div>

          {/* Client & Status */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {project.client && (
              <div>
                <span className="text-sm text-neutral-600 font-medium block mb-1">
                  Client
                </span>
                <p className="text-lg font-semibold">{project.client}</p>
              </div>
            )}
            {project.status && (
              <div>
                <span className="text-sm text-neutral-600 font-medium block mb-1">
                  Status
                </span>
                <p className="text-lg font-semibold">{project.status}</p>
              </div>
            )}
          </div>

          {/* Achievements */}
          {project.achievements && (
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display">
                Key Achievements
              </h2>
              <div className="space-y-3">
                {project.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-neutral-700 text-sm">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div variants={itemVariants} className="mt-16">
        <div className="mb-5">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-display">
            Want to see more about this project?
          </h2>
          <span className="text-neutral-700 block text-sm">
            Check the links below:
          </span>

          {/* Action Buttons */}
          <div className="flex w-full flex-wrap md:flex-nowrap gap-5 justify-center mt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue rounded-xl lg:rounded-2xl text-sm md:text-base text-white px-5 md:px-10 py-5 font-medium hover:bg-blue/90 transition-colors w-full text-center"
              >
                View Live Project
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-300 rounded-xl w-full lg:rounded-2xl text-sm md:text-base text-neutral-700 px-5 md:px-10 py-5 font-medium hover:border-neutral-500 transition-colors text-center"
              >
                Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
