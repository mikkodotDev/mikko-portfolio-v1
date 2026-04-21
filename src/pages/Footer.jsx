import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowUp,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      link: "https://github.com/mikkodotDev",
      title: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/mikko-jardenico-3b3626403/",
      title: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/itzmeekoh/",
      title: "Instagram",
      color: "hover:text-pink-400",
    },
  ];

  return (
    <footer
      id="footer"
      className={`relative bg-gradient-to-br from-[#181c23] via-[#0f1217] to-[#0a0d12] border-t border-gray-800/50 transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-orange-500/50 transform hover:scale-110 transition-all duration-300 z-40 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Mikko Jardenico
            </h3>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Full-stack developer passionate about creating beautiful and
              functional web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm capitalize"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.title}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.title}
                    className={`text-gray-400 text-lg transition-colors duration-300 ${social.color}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
            <p>
              © {new Date().getFullYear()} Mikko Jardenico. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p>Made with</p>
            <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
            <p>using React & Tailwind CSS</p>
          </div>
        </div>
      </div>

      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </footer>
  );
}
