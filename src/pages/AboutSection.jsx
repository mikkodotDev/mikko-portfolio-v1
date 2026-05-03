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
import {
  SiReact,
  SiFlutter,
  SiNodedotjs,
  SiFirebase,
  SiWordpress,
  SiLaravel,
} from "react-icons/si";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeWorkCategory, setActiveWorkCategory] = useState("All");
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [borderTiltStyle, setBorderTiltStyle] = useState({
    rotateX: 0,
    rotateY: 0,
  });
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

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
      technologies: [
        "React",
        "Node.js",
        "Tailwind CSS",
        "Firebase",
        "Wordpress",
      ],
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

  useEffect(() => {
    if (!isVisible) return;

    const animationDuration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = (animationDuration / 1000) * frameRate;
    let currentFrame = 0;

    const interval = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / totalFrames, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);

      setAnimatedStats([
        Math.floor(4 * easeOutQuad),
        Math.floor(2 * easeOutQuad),
        Math.floor(100 * easeOutQuad),
        Math.floor(5 * easeOutQuad),
      ]);

      if (progress === 1) clearInterval(interval);
    }, 1000 / frameRate);

    return () => clearInterval(interval);
  }, [isVisible]);

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
                  a full-stack developer focused on building clean, scalable web
                  and mobile applications. I work with React, Flutter, Firebase,
                  and Node.js to turn ideas into fast, user-friendly products
                  that actually solve real problems.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4">
                  I enjoy bridging design and development—creating interfaces
                  that not only look good but feel intuitive. Whether it's a
                  responsive web app, a mobile experience, or a WordPress-based
                  solution, I aim to deliver work that's practical, reliable,
                  and easy to use.
                </p>
                <p className="text-sm text-orange-400 font-semibold">
                  Currently open to internships, freelance projects, and junior
                  developer roles.
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
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-orange-400/50 transition-all">
                  <FaMobileAlt className="text-blue-400 text-lg" />
                  <span className="text-gray-300 text-sm font-medium">
                    React Native
                  </span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-orange-400/50 transition-all">
                  <SiWordpress className="text-blue-600 text-lg" />
                  <span className="text-gray-300 text-sm font-medium">
                    WordPress
                  </span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-orange-400/50 transition-all">
                  <SiLaravel className="text-red-600 text-lg" />
                  <span className="text-gray-300 text-sm font-medium">
                    Laravel
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Carousel */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">What I Do</h3>
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span>Auto-rotating highlights</span>
              </div>
            </div>
            <div className="flex gap-6 items-stretch">
              {/* Carousel */}
              <div className="relative h-96 overflow-hidden rounded-3xl flex-1 bg-gradient-to-br from-gray-800/40 via-gray-900/40 to-black/40 border border-gray-700/40 shadow-2xl">
                {services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <div
                      key={service.title}
                      className={`absolute inset-0 p-8 transition-all duration-500 transform flex flex-col justify-between ${
                        index === activeService
                          ? "translate-y-0 opacity-100"
                          : index < activeService
                            ? "-translate-y-full opacity-0"
                            : "translate-y-full opacity-0"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/10 text-orange-400 text-2xl border border-orange-400/20">
                          <ServiceIcon />
                        </span>
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-2">
                            {service.title}
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-lg border border-gray-700/40"
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
              <div className="flex flex-col justify-center items-center gap-4">
                {services.map((service, index) => (
                  <button
                    key={service.title}
                    onClick={() => setActiveService(index)}
                    className={`group flex items-center gap-3 transition-all duration-300 ${
                      index === activeService ? "text-white" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === activeService
                          ? "bg-orange-400 scale-125"
                          : "bg-gray-600 group-hover:bg-gray-500"
                      }`}
                    />
                    <span className="hidden lg:block text-xs uppercase tracking-widest">
                      {service.title.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={`transform transition-all duration-1000 delay-400 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      stat.highlight
                        ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/50 hover:border-orange-400"
                        : "bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700/40 hover:border-orange-400/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-white">
                        {animatedStats[index]}
                        {stat.number.replace(/\d+/g, "")}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-gray-700/40 flex items-center justify-center text-orange-400 text-xl">
                        <StatIcon />
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 font-medium">
                      {stat.label}
                    </div>
                    <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          stat.highlight
                            ? "bg-gradient-to-r from-orange-400 to-red-400"
                            : "bg-gradient-to-r from-gray-500 to-gray-600"
                        }`}
                        style={{ width: "70%" }}
                      />
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

// Found an issue where I cannot see the bottom part of about me section -- Fixing
