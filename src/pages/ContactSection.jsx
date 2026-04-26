// Contact section for portfolio homepage
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaRocket,
  FaBolt,
  FaBullseye,
  FaWrench,
  FaLightbulb,
} from "react-icons/fa";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);

  const socialLinks = [
    {
      icon: FaGithub,
      link: "https://github.com/mikkodotDev",
      title: "GitHub",
    },
    {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/mikko-jardenico-3b3626403/",
      title: "LinkedIn",
    },
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/itzmeekoh/",
      title: "Instagram",
    },
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

    const contactElement = document.getElementById("contact");
    if (contactElement) {
      observer.observe(contactElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-br from-[#0f1419] via-[#181c23] to-[#232733] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to turn your ideas into reality? Let's discuss your next
            project and create something amazing together.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Contact Info & Form */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-200 flex flex-col items-center ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
          >
            {/* Social Links Icons */}
            <div className="flex gap-6 md:gap-4 mb-8 justify-center flex-wrap md:flex-nowrap">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.title}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.title}
                    className="group relative p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50 hover:border-orange-400/50 hover:bg-orange-400/10 transition-all duration-300 transform hover:scale-110 flex items-center justify-center overflow-hidden h-12 w-12"
                  >
                    {/* Icon */}
                    <div className="text-2xl text-orange-400 group-hover:text-orange-500 transition-all duration-300 absolute group-hover:opacity-0 opacity-100">
                      <IconComponent />
                    </div>
                    {/* Label - ascends from left */}
                    <div className="absolute text-sm font-semibold text-orange-400 whitespace-nowrap opacity-0 -translate-x-8 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                      {social.title}
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Reach Me Out Button */}
            <div className="space-y-6 flex flex-col items-center max-w-md mx-auto">
              <a
                href="mailto:mikko.jardenico@gmail.com?subject=Let's%20Work%20Together&body=Hi%20Mikko,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you.%0A%0ABest%20regards"
                className="group flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <FaEnvelope className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                Reach Me Out
              </a>
              <p className="text-center text-gray-400 text-sm">
                Click the button to open your email client and send me a message
                directly.
              </p>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div
            className={`relative transform transition-all duration-1000 delay-400 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
          >
            {/* Animated Contact Visual */}
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl transform rotate-3"></div>

              {/* Main Content */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8 overflow-hidden">
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-orange-500/20 rounded-full animate-pulse"></div>
                <div
                  className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500/20 rounded-full animate-bounce"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Content */}
                <div className="relative z-10 space-y-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce text-orange-400">
                      <FaRocket className="mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Let's Build Something Great!
                    </h3>
                    <p className="text-gray-400">
                      Transform your vision into a digital reality
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {[
                      { icon: FaBolt, text: "Fast Response Time" },
                      { icon: FaBullseye, text: "Tailored Solutions" },
                      { icon: FaWrench, text: "Ongoing Support" },
                      { icon: FaLightbulb, text: "Creative Ideas" },
                    ].map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={feature.text}
                          className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-colors"
                          style={{ animationDelay: `${index * 200}ms` }}
                        >
                          <span className="text-2xl text-orange-400">
                            <FeatureIcon />
                          </span>
                          <span className="text-gray-300">{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Call to Action */}
                  <div className="text-center pt-4">
                    <p className="text-orange-400 font-medium">
                      Available for <b>freelance projects</b>
                    </p>
                    <div className="flex items-center justify-center mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      <span className="text-green-400 text-sm">
                        Currently accepting new clients
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
