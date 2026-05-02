import { useState, useEffect } from "react";
import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiWordpress,
  SiPhp,
  SiFigma,
  SiAdobephotoshop,
} from "react-icons/si";

// Only include icons that match your listed technical skills.
const techIconMap = {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiWordpress,
  SiPhp,
  SiFigma,
  SiAdobephotoshop,
};

// Whitelist of allowed technology icon names (based on your skills list)
const allowedTechNames = new Set([
  "SiReact",
  "SiTailwindcss",
  "SiJavascript",
  "SiNodedotjs",
  "SiWordpress",
  "SiPhp",
  "SiFigma",
  "SiAdobephotoshop",
]);

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleServices, setVisibleServices] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const servicesElement = document.getElementById("services");
    if (servicesElement) {
      observer.observe(servicesElement);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch services from JSON
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}services.json`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data.services);
      })
      .catch((error) => console.error("Error loading services:", error));
  }, []);

  useEffect(() => {
    if (isVisible) {
      services.forEach((_, index) => {
        setTimeout(() => {
          setVisibleServices((prev) => [...prev, index]);
        }, index * 100);
      });
    }
  }, [isVisible]);

  return (
    <section
      id="services"
      className="px-4 py-16 md:py-20 md:sticky md:top-0 bg-[#181c23] overflow-hidden"
      style={{ zIndex: 60 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 text-white transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8"
            }`}
          >
            My{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p
            className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Comprehensive solutions tailored to bring your vision to life with
            expertise and innovation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className={`group transition-all duration-1000 transform ${
                  visibleServices.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Stacked Cards Effect */}
                <div className="relative h-80 cursor-pointer">
                  {/* Back Card */}
                  <div
                    className="absolute inset-0 p-6 bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-2xl transform transition-all duration-300"
                    style={{
                      transform: "translateY(12px) translateX(12px)",
                      zIndex: 1,
                    }}
                  ></div>

                  {/* Middle Card */}
                  <div
                    className="absolute inset-0 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl transform transition-all duration-300 group-hover:translate-y-1"
                    style={{
                      transform: "translateY(6px) translateX(6px)",
                      zIndex: 2,
                    }}
                  ></div>

                  {/* Front Card */}
                  <div
                    className="absolute inset-0 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 hover:border-orange-400/50 rounded-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/20 group-hover:-translate-y-1 group-hover:-translate-x-1 flex flex-col justify-between"
                    style={{ zIndex: 3 }}
                  >
                    {/* Title */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {service.description}
                      </p>
                    </div>

                    {/* Tech Stack Icons (filtered to match your skills) */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {service.technologies
                        .filter((techName) => allowedTechNames.has(techName))
                        .map((techName, techIndex) => {
                          const TechIcon = techIconMap[techName];
                          return TechIcon ? (
                            <div
                              key={techIndex}
                              className="p-2 bg-gray-700/40 rounded-lg hover:bg-orange-400/20 transition-all duration-300"
                              title={techName}
                            >
                              <TechIcon className="text-lg text-gray-300 group-hover:text-orange-400 transition-colors" />
                            </div>
                          ) : null;
                        })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
