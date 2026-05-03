import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowUp,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaImage,
} from "react-icons/fa";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCarouselClosing, setIsCarouselClosing] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    // Fetch versions data from JSON file
    fetch("/versions.json")
      .then((response) => response.json())
      .then((data) => setCarouselImages(data))
      .catch((error) => console.error("Error loading versions:", error));
  }, []);

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

  const openCarousel = () => {
    setShowCarousel(true);
    setIsCarouselClosing(false);
  };

  const closeCarousel = () => {
    setIsCarouselClosing(true);
    setTimeout(() => {
      setShowCarousel(false);
      setIsCarouselClosing(false);
    }, 300);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const handleVersionClick = () => {
    if (
      carouselImages[selectedImageIndex]?.link &&
      carouselImages[selectedImageIndex].link !== "#"
    ) {
      window.location.href = carouselImages[selectedImageIndex].link;
    }
  };

  const handleCarouselBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCarousel();
    }
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
    <>
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
              <span
                onClick={openCarousel}
                className="mt-4 cursor-pointer hover:text-orange-300 transition-colors duration-300 inline-block"
              >
                Versions
              </span>
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
              <h4 className="text-lg font-semibold text-white mb-4">
                Follow Me
              </h4>
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
                © {new Date().getFullYear()} Mikko Jardenico. All rights
                reserved.
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

      {/* Image Carousel Modal */}
      {showCarousel && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 ${
            isCarouselClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleCarouselBackgroundClick}
        >
          <div
            className={`relative w-full max-w-4xl mx-auto px-4 transform transition-all duration-300 ${
              isCarouselClosing ? "scale-95 opacity-0" : "bounceIn"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeCarousel}
              className="absolute -top-12 right-0 p-2 text-white hover:text-orange-400 transition-colors duration-300 z-10"
              aria-label="Close carousel"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            {/* Carousel Container */}
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              {/* Image Display */}
              <div className="relative w-full aspect-video bg-gray-800 flex items-center justify-center overflow-hidden">
                {carouselImages.map((item, index) => (
                  <img
                    key={index}
                    src={item.image}
                    alt={item.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      index === selectedImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                {/* Fallback if image not found */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-500">
                  <div className="text-center">
                    <FaImage className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Image not available</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  onClick={handlePrevImage}
                  className="pointer-events-auto p-3 bg-black/40 hover:bg-orange-500/60 text-white rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="pointer-events-auto p-3 bg-black/40 hover:bg-orange-500/60 text-white rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label="Next image"
                >
                  <FaChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Version Info with Link */}
              <div className="bg-gray-800/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {carouselImages[selectedImageIndex]?.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400">
                    {selectedImageIndex + 1} / {carouselImages.length}
                  </div>
                  {carouselImages[selectedImageIndex]?.link &&
                    carouselImages[selectedImageIndex].link !== "#" && (
                      <button
                        onClick={handleVersionClick}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 text-sm"
                      >
                        Step Through
                      </button>
                    )}
                </div>
              </div>

              {/* Image Indicators */}
              <div className="px-6 py-3 bg-gray-900 flex gap-2 justify-center flex-wrap">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedImageIndex
                        ? "bg-orange-400 w-6"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .bounceIn {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </>
  );
}
