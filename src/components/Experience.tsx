function Experience() {
  const experiences = [
    {
      role: "Software Developer",
      company: "Jorinf - Informática e Telecomunicações, Lda.",
      period: "Jan 2026 — Present",
      description: [
        "Working as a Software Developer allocated to the client Ansell",
        "Development and maintenance of internal systems",
        "Supporting industrial processes through IT solutions",
      ],
      stack: ["C#", ".NET", "JavaScript", "SQL", "Azure DevOps"],
    },
  ];

  return (
    <section className="flex flex-col justify-between py-10 mt-32 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start p-5 lg:p-10 gap-10">
        {/* Left Column - Title */}
        <div className="flex-1">
          <h2 className="text-4xl lg:text-6xl font-bold mb-5 font-display">
            Professional Experience
          </h2>
          <p className="text-neutral-600 text-lg lg:text-xl max-w-md">
            Roles I’ve held and work I’ve done in software development
          </p>
        </div>

        {/* Right Column - Experience List */}
        <div className="flex-1 w-full flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <div key={index} className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue rounded-full"></div>
                <span className="text-neutral-600 font-medium text-sm">
                  {exp.company} · {exp.period}
                </span>
              </div>

              {/* Role */}
              <h3 className="text-2xl font-bold">{exp.role}</h3>

              {/* Description */}
              <ul className="flex flex-col gap-2 text-neutral-600">
                {exp.description.map((item, i) => (
                  <li key={i}>- {item}</li>
                ))}
              </ul>

              {/* Stack / Skills used */}
              {exp.stack && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {exp.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-sm font-medium px-3 py-1 rounded-full border border-neutral-200 text-neutral-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Section - Additional Info */}
      <div className="flex flex-col md:flex-row justify-between items-center p-5 lg:p-10 border-t border-neutral-200 mt-10">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20 items-center">
          <div className="text-center md:text-left">
            <span className="text-xs lg:text-base text-neutral-600 font-medium">
              Academic Experience
            </span>
            <h3 className="text-xl font-bold">3 Years</h3>
          </div>
          <div className="text-center md:text-left">
            <span className="text-xs lg:text-base text-neutral-600 font-medium">
              Professional Experience
            </span>
            <h3 className="text-xl font-bold">1 Year</h3>
          </div>
          <div className="text-center md:text-left">
            <span className="text-xs lg:text-base text-neutral-600 font-medium">
              Projects
            </span>
            <h3 className="text-xl font-bold">4 Completed</h3>
          </div>
        </div>

        <div className="mt-5 md:mt-0">
          <a
            href="/Mateus_Cerqueira_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue rounded-xl lg:rounded-2xl text-sm md:text-base text-white cursor-pointer px-5 md:px-10 py-2.5 md:py-5 font-medium hover:bg-blue/90 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Experience;
