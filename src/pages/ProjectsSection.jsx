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
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState({
    featured: [],
    regular: [],
  });

  const filterCategories = [
    "All",
    "Web Apps",
    "Mobile Apps",
    "UI/UX",
    // "Graphics",
    // "CMS",
  ];

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
      [0, 1, 2, 3].forEach((index) => {
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
      category: "Mobile Apps",
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
      category: "Mobile Apps",
      rating: 0,
    },
    {
      title: "UIC Clinlab Manager",
      description:
        "UIC Clinlab Manager is a comprehensive web application built to support clinical laboratory workflows, enabling efficient patient data management alongside real-time inventory tracking for supplies and equipment.",
      link: "#",
      images: ["./images/project-imgs/ClinlabUIC.jpg"],
      stars: 156,
      technologies: ["Laravel", "Livewire", "Schoolex API"],
      label: "Featured Project",
      category: "Web Apps",
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
      category: "Web Apps",
      rating: 0,
    },
    {
      title: "RentEase Davao",
      description: "A web application for managing rental properties in Davao.",
      link: "#",
      images: ["./images/placeholder.jpg"],
      stars: 92,
      technologies: ["React", "Express", "MongoDB"],
      category: "Web Apps",
      rating: 0,
    },
    {
      title: "Voltex | E-commerce web design",
      description:
        "A modern e-commerce web design showcasing 3D models and interactive product displays with smooth animations and responsive layout.",
      link: "https://mikkodotdev.github.io/voltex-ecommerce/",
      images: ["./images/project-imgs/Voltex Img.jpg"],
      stars: 128,
      technologies: ["React", "HTML", "TailwindCSS", "3D Models"],
      category: "UI/UX",
      rating: 0,
    },
    {
      title: "Nightrelief.ai | SaaS web",
      description:
        "A professional SaaS web application with intuitive user interface, modern design patterns, and smooth user experience.",
      link: "https://mikkodotdev.github.io/nightrelief-saas/",
      images: ["./images/project-imgs/Nightrelief Img.jpg"],
      stars: 105,
      technologies: ["React", "HTML", "CSS"],
      category: "UI/UX",
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

  // Filter projects based on active filter
  const getFilteredProjects = (projectList) => {
    if (activeFilter === "All") {
      return projectList;
    }
    return projectList.filter((project) => project.category === activeFilter);
  };

  const filteredFeaturedProjects = featuredProjects; // Always show all featured projects
  let filteredRegularProjects = getFilteredProjects(projects);

  // Limit to 4 projects when "All" filter is active and not expanded
  if (
    activeFilter === "All" &&
    !showAllProjects &&
    filteredRegularProjects.length > 4
  ) {
    filteredRegularProjects = filteredRegularProjects.slice(0, 4);
  }

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
            {filteredFeaturedProjects.length > 0 ? (
              filteredFeaturedProjects.map((project, index) => (
                <div
                  key={index}
                  className={`group relative h-96 rounded-lg overflow-hidden transition-all duration-1000 transform ${
                    visibleProjects.featured.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${project.images[0]})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Floating Content Box */}
                  <div className="absolute bottom-0 right-0 w-full md:w-1/2 bg-white/95 backdrop-blur-sm rounded-tl-2xl p-8 md:p-10 shadow-2xl">
                    {/* Label & Category */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block px-3 py-1 bg-orange-400/20 text-orange-500 text-xs font-bold uppercase tracking-wider rounded">
                        {project.label}
                      </span>
                      <span className="inline-block px-3 py-1 bg-cyan-400/20 text-cyan-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h5 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors flex items-center gap-2">
                      {project.title}
                      <FaArrowRight
                        size={24}
                        className="group-hover:translate-x-2 transition-transform duration-300"
                      />
                    </h5>

                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies
                        .slice(0, 4)
                        .map((tech, techIndex) => (
                          <span
                            key={`featured-${index}-tech-${techIndex}`}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full hover:bg-orange-400 hover:text-white transition-colors cursor-pointer"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={project.link}
                        className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                        title="Know More"
                      >
                        Know More
                      </a>
                      <a
                        href={project.link}
                        className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
                        title="Preview"
                      >
                        Preview
                        <FaArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 text-lg">
                  No featured projects found in this category.
                </p>
              </div>
            )}
          </div>
        </div>

        <h4
          className={`text-2xl font-bold text-white mb-8 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          Other Projects
        </h4>

        {/* Filter Tabs - Scaled Down */}
        <div
          className={`mb-8 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setShowAllProjects(false);
                }}
                className={`px-3 py-1 rounded-full font-semibold text-xs transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50 scale-105"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/30 hover:border-orange-400/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRegularProjects.length > 0 ? (
            filteredRegularProjects.map((project, index) => (
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
                <div className="flex flex-col gap-4 p-0 transition-colors duration-300">
                  {/* Project Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="flex flex-col">
                    {/* Category Badge */}
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider rounded-full w-fit">
                        {project.category}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors flex items-center gap-2">
                        {project.title}
                        <FaArrowRight
                          size={16}
                          className="group-hover:translate-x-2 transition-transform duration-300"
                        />
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={`project-${index}-tech-${techIndex}`}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded hover:bg-orange-400 hover:text-gray-900 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-3 mt-6">
                      <a
                        href={project.link}
                        className="flex-1 px-4 py-2 text-center bg-gray-800 text-white rounded hover:bg-orange-500 transition-colors text-sm font-medium"
                        title="Visit Website"
                      >
                        Visit Website
                      </a>
                      <a
                        href={project.link}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        title="View Code"
                      >
                        <FaGithub size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 col-span-full">
              <p className="text-gray-400 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>

        {/* View More Projects */}
        {activeFilter === "All" && !showAllProjects && projects.length > 4 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAllProjects(true)}
              className="inline-flex items-center text-white hover:text-orange-400 transition-colors duration-300 text-lg font-medium"
            >
              View More Projects →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
