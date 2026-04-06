// Hero section for portfolio homepage
import { useState, useEffect } from "react";

export default function HeroSection({ theme = "evening", colors = {} }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const roles = ["Front End Developer", "Mobile Developer", "UI/UX Designer"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Typing animation for roles
    const typeRole = () => {
      const role = roles[currentRole];
      let index = 0;
      setTypedText("");

      const typeInterval = setInterval(() => {
        setTypedText(role.substring(0, index + 1));
        index++;

        if (index === role.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }, 2000);
        }
      }, 100);
    };

    typeRole();
    const roleInterval = setInterval(typeRole, 4000);

    return () => clearInterval(roleInterval);
  }, [currentRole]);

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center px-4 md:px-8 overflow-hidden transition-colors duration-1000 ${
        theme === "morning"
          ? "bg-slate-50"
          : theme === "noon"
            ? "bg-sky-50"
            : "bg-gradient-to-br from-[#0f1419] via-[#181c23] to-[#232733]"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-400/5 to-red-400/5 rounded-full blur-2xl animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div
            className={`relative z-10 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                Available for work
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 mb-6">
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-bold ${
                  theme === "morning"
                    ? "text-slate-950"
                    : theme === "noon"
                      ? "text-slate-950"
                      : "text-white"
                }`}
              >
                <span className="block">Hello, I'm</span>
                <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  Mikko
                </span>
              </h1>

              {/* Animated Role */}
              <div className="h-12 md:h-16">
                <h2
                  className={`text-xl md:text-3xl font-semibold ${
                    theme === "morning"
                      ? "text-slate-700"
                      : theme === "noon"
                        ? "text-slate-700"
                        : "text-gray-300"
                  }`}
                >
                  {typedText}
                  <span className="animate-pulse text-orange-400">|</span>
                </h2>
              </div>
            </div>

            {/* Description */}
            <p
              className={`text-lg mb-8 max-w-lg leading-relaxed ${
                theme === "morning"
                  ? "text-slate-600"
                  : theme === "noon"
                    ? "text-slate-600"
                    : "text-gray-400"
              }`}
            >
              I craft exceptional digital experiences through clean code,
              intuitive design, and cutting-edge technology. Let's build
              something extraordinary together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10">Let's Work Together</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                className={`group px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-300 relative overflow-hidden ${
                  theme === "morning"
                    ? "border-slate-300 text-slate-600 hover:border-orange-500 hover:text-orange-500"
                    : theme === "noon"
                      ? "border-sky-300 text-slate-600 hover:border-orange-400 hover:text-orange-400"
                      : "border-gray-600 text-gray-300 hover:border-orange-400 hover:text-orange-400"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Download CV
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <p
                className={`text-sm uppercase tracking-wide ${
                  theme === "morning"
                    ? "text-slate-500"
                    : theme === "noon"
                      ? "text-slate-400"
                      : "text-gray-500"
                }`}
              >
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "React Native",
                  "Flutter",
                  "Node.js",
                  "Tailwind CSS",
                  "MongoDB",
                  "Laravel",
                  "Django",
                ].map((tech, index) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 border rounded-lg text-sm transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      theme === "morning"
                        ? "bg-slate-200/50 border-slate-300/50 text-slate-700 hover:border-orange-400 hover:text-orange-500"
                        : theme === "noon"
                          ? "bg-sky-200/50 border-sky-300/50 text-slate-700 hover:border-orange-400 hover:text-orange-400"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-orange-400/50 hover:text-orange-400"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div
            className={`relative lg:flex justify-center items-center transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            {/* Code Editor Mockup */}
            <div className="relative">
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* Window Controls */}
                <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 text-gray-400 text-sm">
                    portfolio.jsx
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-gray-500">
                    // Building amazing experiences
                  </div>
                  <div className="text-blue-400">
                    const <span className="text-white">developer</span> = {"{"}
                  </div>
                  <div className="ml-4 text-white">
                    name: <span className="text-green-400">'Mikko'</span>,
                  </div>
                  <div className="ml-4 text-white">
                    skills: [<span className="text-green-400">'React'</span>,{" "}
                    <span className="text-green-400">'Flutter'</span>],
                  </div>
                  <div className="ml-4 text-white">
                    passion:{" "}
                    <span className="text-green-400">
                      'Creating Digital Magic'
                    </span>
                  </div>
                  <div className="text-blue-400">{"};"}</div>
                  <div className="text-gray-500 animate-pulse">
                    ▶ Ready to collaborate...
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce">
                ⚡
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
