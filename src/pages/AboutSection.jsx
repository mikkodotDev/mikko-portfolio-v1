// About section for portfolio homepage
import { useState, useEffect } from "react";
import {
  FaGlobe,
  FaMobileAlt,
  FaPalette,
  FaRocket,
  FaCode,
  FaLightbulb,
  FaSmile,
  FaBriefcase,
  FaCheck,
} from "react-icons/fa";
import { SiReact, SiFlutter, SiNodedotjs, SiFirebase } from "react-icons/si";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeWorkCategory, setActiveWorkCategory] = useState("All");
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [borderTiltStyle, setBorderTiltStyle] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  const workCategories = [
    "All",
    "Web Apps",
    "Mobile Apps",
    "UI/UX Designs",
    "WordPress",
  ];

  const services = [
    {
      title: "Full-Stack Web Development",
      description:
        "Building modern, responsive web applications with React, Node.js, and Firebase. I focus on clean code, scalability, and user-centric design.",
      icon: FaGlobe,
      technologies: ["React", "Node.js", "Tailwind CSS", "Firebase"],
    },
    {
      title: "Mobile App Development",
      description:
        "Creating cross-platform mobile experiences with Flutter and React Native. I prioritize performance, intuitive UX, and smooth animations.",
      icon: FaMobileAlt,
      technologies: ["Flutter", "React Native", "Firebase", "API Integration"],
    },
    {
      title: "UI/UX & Web Design",
      description:
        "Designing beautiful, functional interfaces using modern design principles. I create prototypes and high-fidelity mockups that developers love to build.",
      icon: FaPalette,
      technologies: ["Figma", "Photoshop", "Prototyping", "Design Systems"],
    },
  ];

  const stats = [
    {
      number: "4+",
      label: "Projects Delivered",
      icon: FaRocket,
      highlight: true,
    },
    { number: "2+", label: "Years Learning & Building", icon: FaCode },
    { number: "100%", label: "Commitment to Quality", icon: FaCheck },
    { number: "5+", label: "Tech Stack Mastered", icon: FaLightbulb },
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

  const handleImageHover = (e) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Image tilts one direction
    setTiltStyle({
      rotateX: y * 20,
      rotateY: x * 20,
    });

    // Border tilts opposite direction
    setBorderTiltStyle({
      rotateX: -y * 15,
      rotateY: -x * 15,
    });
  };

  const handleImageLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 });
    setBorderTiltStyle({ rotateX: 0, rotateY: 0 });
  };

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
          {/* Left Side - Profile Image */}
          <div
            className={`flex justify-center transform transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
            style={{ perspective: "1000px" }}
          >
            {/* Border Tilt Background */}
            <div
              className="absolute w-80 h-96 rounded-3xl border-2 border-gradient-to-br from-orange-400/40 to-red-400/40 -z-10"
              style={{
                transform: `rotateX(${borderTiltStyle.rotateX}deg) rotateY(${borderTiltStyle.rotateY}deg) translateZ(0)`,
                transition: "transform 0.15s ease-out",
              }}
            />

            {/* Profile Image */}
            <div
              className="relative w-80 h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-orange-400/30 shadow-2xl cursor-pointer group"
              onMouseMove={handleImageHover}
              onMouseLeave={handleImageLeave}
              style={{
                transform: `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg) translateZ(10px)`,
                transition: "transform 0.15s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src="./images/AboutmeIMG.JPG"
                alt="Mikko Jardenico"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-40"></div>
            </div>
          </div>

          {/* Right Side - About Content */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
          >
            {/* Personal Story */}
            <div className="space-y-6">

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  I Build Digital Solutions That Users Love
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  I'm{" "}
                  <span className="text-orange-400 font-semibold">Mikko</span>,
                  a passionate full-stack developer specializing in creating
                  modern web and mobile applications. With expertise in React,
                  Flutter, and Firebase, I transform ideas into scalable,
                  user-centric digital products.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4">
                  I'm driven by clean code, intuitive design, and solving
                  real-world problems. Whether it's crafting responsive web apps
                  or building smooth mobile experiences, I bring creativity and
                  technical excellence to every project.
                </p>
                <p className="text-sm text-orange-400 font-semibold">
                  Currently Open to: Internships • Freelance Projects • Junior
                  Developer Roles
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <FaBriefcase className="w-5 h-5 mr-2" />
              <span>Let's Work Together</span>
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

            {/* Tech Stack */}
            <div>
              <p className="text-sm text-gray-400 font-semibold mb-3 uppercase tracking-wider">
                Primary Tech Stack
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-orange-400/50 transition-all">
                  <SiReact className="text-blue-400 text-lg" />
                  <span className="text-gray-300 text-sm font-medium">
                    React
                  </span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-orange-400/50 transition-all">
                  <SiFlutter className="text-blue-500 text-lg" />
                  <span className="text-gray-300 text-sm font-medium">
                    Flutter
                  </span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-orange-400/50 transition-all">
                  <SiFirebase className="text-orange-500 text-lg" />
                  <span className="text-gray-300 text-sm font-medium">
                    Firebase
                  </span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-orange-400/50 transition-all">
                  <SiNodedotjs className="text-green-500 text-lg" />
                  <span className="text-gray-300 text-sm font-medium">
                    Node.js
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Carousel */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
          >
            <h3 className="text-2xl font-bold text-white mb-6">What I Do</h3>
            <div className="flex gap-6">
              {/* Carousel */}
              <div className="relative h-80 overflow-hidden rounded-2xl flex-1">
                {services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <div
                      key={service.title}
                      className={`absolute inset-0 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl transition-all duration-500 transform flex flex-col items-center justify-center text-center ${
                        index === activeService
                          ? "translate-y-0 opacity-100"
                          : index < activeService
                            ? "-translate-y-full opacity-0"
                            : "translate-y-full opacity-0"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2 mb-4">
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
                      <div className="flex flex-wrap gap-2 justify-center">
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

              {/* Service Indicators - Right Side */}
              <div className="flex flex-col justify-center items-center gap-3">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveService(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeService
                        ? "bg-orange-400 h-6"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={`transform transition-all duration-1000 delay-400 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`group p-6 rounded-2xl border transition-all duration-300 text-center cursor-pointer transform hover:scale-105 ${
                      stat.highlight
                        ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/50 hover:border-orange-400"
                        : "bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700/30 hover:border-orange-400/30"
                    }`}
                  >
                    <div className="text-2xl mb-2 text-orange-400 group-hover:scale-125 transition-transform duration-300">
                      <StatIcon />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">
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
