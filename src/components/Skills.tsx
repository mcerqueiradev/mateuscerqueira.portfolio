function Skills() {
  const skills = [
    {
      category: "Front-End",
      items: ["Angular", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      category: "Back-End",
      items: [
        "C#",
        ".NET",
        "ASP.NET MVC",
        "SQL",
        "Entity Framework",
        "POO",
        "JWT",
      ],
    },
    {
      category: "Tools",
      items: [
        "Azure DevOps",
        "Git",
        "Photoshop/Illustrator",
        "Figma",
        "VSCode",
        "Design/UX",
      ],
    },
  ];

  return (
    <section className="flex flex-col justify-between py-10 mt-32 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start p-5 lg:p-10 gap-10">
        {/* Left Column - Title */}
        <div className="flex-1">
          <h2 className="text-4xl lg:text-6xl font-bold mb-5 font-display">
            Skills & Expertise
          </h2>
          <p className="text-neutral-600 text-lg lg:text-xl max-w-md">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Right Column - Skills Grid */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <div key={index} className="flex flex-col gap-4 ">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-blue rounded-full"></div>
                <span className="text-neutral-600 font-medium text-sm">
                  {skillGroup.category}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="text-xl font-bold hover:text-blue transition-colors cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
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
              Projects
            </span>
            <h3 className="text-xl font-bold">6 Completed</h3>
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

export default Skills;
