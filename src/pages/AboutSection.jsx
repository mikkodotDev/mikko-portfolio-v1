// About section for portfolio homepage
import { useState, useEffect } from "react";
import {
  FaGlobe,
  FaMobileAlt,
  FaPalette,
  FaRocket,
  FaStar,
  FaClock,
  FaComments,
  FaSmile,
} from "react-icons/fa";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "Web Development",
      description:
        "Creating responsive, fast, and user-friendly websites using modern technologies.",
      icon: FaGlobe,
      technologies: ["React", "Node.js", "Tailwind CSS", "JavaScript"],
    },
    {
      title: "Mobile Development",
      description:
        "Building cross-platform mobile applications with native performance.",
      icon: FaMobileAlt,
      technologies: ["Flutter", "React Native", "API Integration", "Firebase"],
    },
    {
      title: "UI/UX Design",
      description:
        "Designing intuitive interfaces that provide exceptional user experiences.",
      icon: FaPalette,
      technologies: ["Figma", "Photoshop", "UI/UX Design", "Prototyping"],
    },
  ];

  const stats = [
    { number: "4", label: "Projects Completed", icon: FaRocket },
    { number: "85%", label: "Client Satisfaction", icon: FaStar },
    { number: "2", label: "Years Experience", icon: FaClock },
    { number: "24/7", label: "Support Available", icon: FaComments },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const aboutElement = document.getElementById("about");
    if (aboutElement) {
      observer.observe(aboutElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-gradient-to-br from-[#1a1f2e] via-[#23272f] to-[#2a2d3a] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - About Content */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
          >
            {/* Personal Story */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2">
                <span className="text-2xl text-orange-400">
                  <FaSmile />
                </span>
                <span className="text-orange-400 font-medium">
                  Nice to meet you!
                </span>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                Hi, I'm{" "}
                <span className="text-orange-400 font-semibold">Mikko</span> - a
                passionate developer who transforms ideas into exceptional
                digital experiences. I specialize in creating both web and
                mobile applications that not only function flawlessly but also
                provide intuitive and engaging user experiences.
              </p>

              <p className="text-gray-400 leading-relaxed">
                My journey in development started with curiosity and has evolved
                into a deep passion for crafting clean, efficient code and
                beautiful interfaces. I believe in the power of technology to
                solve real-world problems and improve people's lives.
              </p>
            </div>

            {/* Skills Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "Problem Solving",
                "Creative Design",
                "Clean Code",
                "User Focus",
              ].map((skill, index) => (
                <div
                  key={skill}
                  className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-orange-400/30 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300 font-medium">{skill}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <span>Let's Connect</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* Right Side - Services & Stats */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-400 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
          >
            {/* Services Carousel */}
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-6">What I Do</h3>
              <div className="relative h-64 overflow-hidden rounded-2xl">
                {services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <div
                      key={service.title}
                      className={`absolute inset-0 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl transition-all duration-500 transform ${
                        index === activeService
                          ? "translate-x-0 opacity-100"
                          : index < activeService
                            ? "-translate-x-full opacity-0"
                            : "translate-x-full opacity-0"
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-4xl text-orange-400">
                          <ServiceIcon />
                        </span>
                        <h4 className="text-xl font-bold text-white">
                          {service.title}
                        </h4>
                      </div>
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-orange-500/10 text-orange-400 text-sm rounded-lg border border-orange-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Service Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveService(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeService
                        ? "bg-orange-400 w-6"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30 hover:border-orange-400/30 transition-all duration-300 text-center"
                  >
                    <div className="text-2xl mb-2 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                      <StatIcon />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
