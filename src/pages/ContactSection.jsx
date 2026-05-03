// Contact section for portfolio homepage
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const socialLinks = [
    {
      icon: FaGithub,
      link: "https://github.com/mikkodotDev",
      title: "GitHub",
      color: "from-gray-400 to-gray-600",
    },
    {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/mikko-jardenico-3b3626403/",
      title: "LinkedIn",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/itzmeekoh/",
      title: "Instagram",
      color: "from-pink-400 to-red-400",
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
      className="relative py-20 md:py-32 bg-[#181c23] overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div
          className={`mb-20 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">
              Let's Connect
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to <br />
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              create something
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </div>

        {/* Main Contact Area */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Left - Email CTA */}
          <div
            className={`lg:col-span-1 transform transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <a
              href="mailto:mikko.jardenico@gmail.com?subject=Let's%20Work%20Together&body=Hi%20Mikko,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you.%0A%0ABest%20regards"
              className="group relative block h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-gradient-to-br from-[#1f2635] to-[#232a3a] border border-gray-700/50 group-hover:border-orange-400/30 rounded-2xl p-8 transition-all duration-300 h-full flex flex-col justify-center">
                <div className="text-5xl text-orange-400 mb-4">
                  <FaEnvelope />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Get In Touch
                </h3>
                <p className="text-gray-400 mb-6">
                  Send me an email and I'll get back to you within 24 hours
                </p>
                <div className="flex items-center gap-2 text-orange-400 group-hover:text-orange-300 transition-colors">
                  <span className="font-semibold">Email Me</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </a>
          </div>

          {/* Center - Info */}
          <div
            className={`lg:col-span-1 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-[#1f2635] to-[#232a3a] border border-gray-700/50 rounded-2xl p-8 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Response Time
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Email Response</p>
                  <p className="text-white font-semibold">Within 24 hours</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Current Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold">
                      Open for freelance
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Based In</p>
                  <p className="text-white font-semibold">Davao City, PH</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Social Links */}
          <div
            className={`lg:col-span-1 transform transition-all duration-1000 delay-400 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-[#1f2635] to-[#232a3a] border border-gray-700/50 rounded-2xl p-8 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.title}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredLink(social.title)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="group flex items-center gap-3 p-3 rounded-lg border border-gray-700/30 hover:border-orange-400/50 hover:bg-orange-400/5 transition-all duration-300"
                    >
                      <div
                        className={`text-xl bg-gradient-to-r ${social.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent />
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
                        {social.title}
                      </span>
                      <FaArrowRight className="ml-auto text-gray-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all text-sm" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-r from-[#1f2635] to-[#232a3a] border border-orange-400/20 rounded-2xl p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Have a project in mind?
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Whether you need a website, mobile app, or UI/UX design, I'm
                here to help bring your ideas to life.
              </p>
              <a
                href="mailto:mikko.jardenico@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Start a Conversation
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
