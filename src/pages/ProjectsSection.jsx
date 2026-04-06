// Projects section for portfolio homepage
import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaExternalLinkAlt,
  FaGithub,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [closingProject, setClosingProject] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState({
    featured: [],
    regular: [],
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const projectsElement = document.getElementById("projects");
    if (projectsElement) {
      observer.observe(projectsElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate featured projects
      [0, 1, 2].forEach((index) => {
        setTimeout(() => {
          setVisibleProjects((prev) => ({
            ...prev,
            featured: [...prev.featured, index],
          }));
        }, index * 150);
      });

      // Animate regular projects
      [0, 1].forEach((index) => {
        setTimeout(
          () => {
            setVisibleProjects((prev) => ({
              ...prev,
              regular: [...prev.regular, index],
            }));
          },
          (index + 3) * 150,
        );
      });
    }
  }, [isVisible]);

  const featuredProjects = [
    {
      title: "RedSync PH",
      description:
        "RedSync PH is a patient-centered mobile health app that streamlines hemophilia care by enabling real-time symptom tracking, treatment management, and accessible health support tailored for Filipino patients",
      link: "#",
      images: ["./images/placeholder.jpg"],
      stars: 342,
      technologies: [
        "Flutter",
        "Firebase",
        "Hive",
        "OpenAI API",
        "GoogleMaps API",
      ],
      label: "Featured Project",
      rating: 0,
    },
    {
      title: "RentEase Davao",
      description:
        "RentEase Davao is a smart property management app that streamlines boarding house operations for landlords and keeps tenants informed through a centralized mobile platform.",
      link: "#",
      images: ["./images/placeholder.jpg"],
      stars: 289,
      technologies: ["React Native", "Supabase", "Paymongo API"],
      label: "Featured Project",
      rating: 0,
    },
    {
      title: "UIC Clinlab Manager",
      description:
        "UIC Clinlab Manager is a comprehensive web application built to support clinical laboratory workflows, enabling efficient patient data management alongside real-time inventory tracking for supplies and equipment.",
      link: "#",
      images: ["./images/placeholder.jpg"],
      stars: 156,
      technologies: ["Laravel", "Livewire", "Schoolex API"],
      label: "Featured Project",
      rating: 0,
    },
  ];

  const projects = [
    {
      title: "LabClass",
      description:
        "A web application for managing laboratory classes and schedules.",
      link: "#",
      images: ["./images/placeholder.jpg"],
      stars: 156,
      technologies: ["React", "Node.js", "MySQL"],
      rating: 0,
    },
    {
      title: "RentEase Davao",
      description: "A web application for managing rental properties in Davao.",
      link: "#",
      images: ["./images/placeholder.jpg"],
      stars: 92,
      technologies: ["React", "Express", "MongoDB"],
      rating: 0,
    },
  ];

  const handleProjectHover = (projectIndex) => {
    setHoveredProject(projectIndex);
    setCarouselIndex(0);
  };

  const handleCarouselNext = (e, projectIndex) => {
    e.preventDefault();
    const projectImages = projects[projectIndex].images;
    setCarouselIndex((prev) => (prev + 1) % projectImages.length);
  };

  const handleCarouselPrev = (e, projectIndex) => {
    e.preventDefault();
    const projectImages = projects[projectIndex].images;
    setCarouselIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length,
    );
  };

  const handleStarRating = (projectIndex, rating) => {
    setRatings((prev) => ({
      ...prev,
      [projectIndex]: rating,
    }));
  };

  const handleCloseModal = (index) => {
    setClosingProject(index);
    setTimeout(() => {
      setSelectedProject(null);
      setClosingProject(null);
    }, 300);
  };

  return (
    <section id="projects" className="px-4 py-16 md:py-20 bg-[#181c23]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h3
            className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8"
            }`}
          >
            My Projects
          </h3>
          <p
            className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            A collection of my completed and featured projects.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h4
            className={`text-2xl font-bold text-white mb-8 transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            Featured Projects
          </h4>
          <div className="space-y-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className={`group flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-8 items-stretch transition-all duration-1000 transform ${
                  visibleProjects.featured.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Card */}
                <div
                  className="flex-1 relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 hover:border-orange-400/50 transition-all duration-300"
                  onMouseEnter={() => setHoveredProject(`featured-${index}`)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Image Section */}
                  <div className="relative h-64 md:h-80 overflow-hidden bg-gray-700">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-3">
                    {/* Label */}
                    <span className="inline-block px-3 py-1 bg-orange-400/20 text-orange-400 text-xs font-bold uppercase tracking-wider rounded">
                      {project.label}
                    </span>

                    {/* Title */}
                    <h5 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                      {project.title}
                      <FaArrowRight
                        size={20}
                        className="group-hover:translate-x-2 transition-transform duration-300"
                      />
                    </h5>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={`featured-${index}-tech-${techIndex}`}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded hover:bg-orange-400 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <span className="text-orange-400 font-semibold text-sm">
                        ⭐ {project.stars.toLocaleString()}
                      </span>
                      <div className="flex gap-3">
                        <a
                          href={project.link}
                          className="p-2 text-orange-400 hover:bg-orange-400/10 rounded-lg transition-colors"
                          title="Visit Project"
                        >
                          <FaExternalLinkAlt size={16} />
                        </a>
                        <a
                          href={project.link}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                          title="View Code"
                        >
                          <FaGithub size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Spacer (empty space for timeline aesthetic) */}
                <div className="hidden lg:flex w-12 items-center justify-center">
                  <div className="w-1 h-full bg-gradient-to-b from-orange-400/50 via-orange-400/30 to-transparent rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h4
          className={`text-2xl font-bold text-white mb-8 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          Other Projects
        </h4>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                opacity: visibleProjects.regular.includes(index) ? 1 : 0,
                transform: visibleProjects.regular.includes(index)
                  ? "translateY(0)"
                  : "translateY(32px)",
                transition: "all 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div>
                <div className="flex flex-col md:flex-row gap-6 p-6 rounded-lg transition-colors duration-300 bg-transparent hover:bg-gray-800/80">
                  {/* Project Image */}
                  <div className="md:w-40 md:h-40 flex-shrink-0">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-32 md:h-40 object-cover rounded-lg bg-gray-700 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Title and Description */}
                    <div>
                      <h4 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors flex items-center gap-2">
                        {project.title}
                        <FaArrowRight
                          size={18}
                          className="group-hover:translate-x-2 transition-transform duration-300"
                        />
                      </h4>
                      <p className="text-gray-300 text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Stars and Tags */}
                    <div className="mt-4 space-y-3">
                      {/* Stars */}
                      <div className="flex items-center">
                        <span className="text-orange-400 font-semibold">
                          ⭐ {project.stars.toLocaleString()}
                        </span>
                      </div>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={`project-${index}-tech-${techIndex}`}
                            className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-orange-400 hover:text-gray-900 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Archive */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center text-white hover:text-orange-400 transition-colors duration-300 text-lg font-medium"
          >
            View Full Project Archive →
          </a>
        </div>
      </div>
    </section>
  );
}
