// Contact section for portfolio homepage
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaUser,
  FaComment,
  FaCheckCircle,
  FaRocket,
  FaBolt,
  FaBullseye,
  FaWrench,
  FaLightbulb,
  FaHandPointer,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [slingRingClicks, setSlingRingClicks] = useState(0);
  const [showSlingRing, setShowSlingRing] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [isPortalClosing, setIsPortalClosing] = useState(false);
  const [slingRingSparks, setSlingRingSparks] = useState([]);
  const [portalSparks, setPortalSparks] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(0);
  const [carouselRotation, setCarouselRotation] = useState(0);
  const [isPortalExpanding, setIsPortalExpanding] = useState(false);

  const portfolioVersions = [
    {
      title: "V1: Classic",
      url: "https://v1-portfolio.example.com",
      image: "./images/placeholder.jpg",
    },
    {
      title: "V2: Modern",
      url: "https://v2-portfolio.example.com",
      image: "./images/placeholder-v2.jpg",
    },
    {
      title: "V3: Minimal",
      url: "https://v3-portfolio.example.com",
      image: "./images/placeholder-v3.jpg",
    },
    { title: "V4: Current", url: "#", image: "./images/placeholder-v4.jpg" },
  ];

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

  useEffect(() => {
    if (!showPortal) return;

    const sparkInterval = setInterval(() => {
      const newSpark = {
        id: Math.random(),
        angle: Math.random() * 360,
        delay: 0,
      };

      setPortalSparks((prev) => [...prev, newSpark]);

      // Remove spark after animation completes
      setTimeout(() => {
        setPortalSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 800);
    }, 80); // Generate new spark every 80ms for more density

    return () => clearInterval(sparkInterval);
  }, [showPortal]);

  const handleSlingRingClick = () => {
    const newCount = slingRingClicks + 1;
    setSlingRingClicks(newCount);

    if (newCount === 3) {
      setShowSlingRing(true);
      setIsDisappearing(false);

      // Start disappear animation at 9.4 seconds
      setTimeout(() => {
        setIsDisappearing(true);
      }, 9400);

      // Actually hide at 10 seconds
      setTimeout(() => {
        setSlingRingClicks(0);
        setShowSlingRing(false);
        setIsDisappearing(false);
      }, 10000);
    }
  };

  const handleSlingRingImageClick = () => {
    setShowPortal(true);
  };

  const handlePortalBackgroundClick = () => {
    setIsPortalClosing(true);
    setTimeout(() => {
      setShowPortal(false);
      setIsPortalClosing(false);
    }, 600);
  };

  const handleCarouselPrev = () => {
    setSelectedVersion(
      (prev) =>
        (prev - 1 + portfolioVersions.length) % portfolioVersions.length,
    );
    setCarouselRotation((prev) => prev - 90);
  };

  const handleCarouselNext = () => {
    setSelectedVersion((prev) => (prev + 1) % portfolioVersions.length);
    setCarouselRotation((prev) => prev + 90);
  };

  const handleStepThrough = () => {
    setIsPortalExpanding(true);
    setTimeout(() => {
      // Navigate to selected version
      if (portfolioVersions[selectedVersion].url !== "#") {
        window.location.href = portfolioVersions[selectedVersion].url;
      }
    }, 1000);
  };

  const handleSlingRingHover = () => {
    const newSparks = Array.from({ length: 5 }).map((_, i) => ({
      id: Math.random(),
      angle: i * 72 + Math.random() * 20, // 5 sparks spread around
      delay: i * 50,
    }));
    setSlingRingSparks(newSparks);

    setTimeout(() => {
      setSlingRingSparks([]);
    }, 600);
  };

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
            <span
              onClick={handleSlingRingClick}
              className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent cursor-pointer hover:opacity-75 transition-opacity"
            >
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to turn your ideas into reality? Let's discuss your next
            project and create something amazing together.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Contact Info & Form */}
          <div
            className={`space-y-8 transform transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
          >
            {/* Social Links Icons */}
            <div className="flex gap-6 md:gap-4 mb-8 justify-center md:justify-start flex-wrap md:flex-nowrap">
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
                className="group flex items-center justify-center w-full px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <FaEnvelope className="w-6 h-6 mr-3 group-hover:animate-pulse" />
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

        {/* Sling Ring Easter Egg */}
        {showSlingRing && (
          <div
            className="fixed bottom-4 right-4 z-50"
            style={{
              animation: isDisappearing
                ? "scaleOut 0.6s ease-in forwards"
                : "dropIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <img
              src="./images/sling-ring.png"
              alt="Sling Ring"
              className="w-32 h-32 object-contain drop-shadow-2xl filter brightness-110 cursor-pointer hover:brightness-125 transition-all"
              onClick={handleSlingRingImageClick}
              onMouseEnter={handleSlingRingHover}
            />

            {/* Sparks on hover */}
            {slingRingSparks.map((spark) => {
              const angle = (spark.angle * Math.PI) / 180;
              const distance = 60;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <div
                  key={spark.id}
                  className="absolute"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#f97316",
                    borderRadius: "50%",
                    top: "50%",
                    left: "50%",
                    marginTop: "-3px",
                    marginLeft: "-3px",
                    animation: `sparkFly 0.6s ease-out forwards`,
                    animationDelay: `${spark.delay}ms`,
                    pointerEvents: "none",
                    "--spark-x": `${x}px`,
                    "--spark-y": `${y}px`,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Doctor Strange Portal */}
        {showPortal && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
              isPortalExpanding ? "bg-black" : "bg-black/50 backdrop-blur-sm"
            }`}
            onClick={!isPortalExpanding ? handlePortalBackgroundClick : null}
          >
            <div
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: isPortalClosing
                  ? "portalScaleOut 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                  : isPortalExpanding
                    ? "portalExpand 1s ease-in forwards"
                    : "portalScaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              {/* Portal Circle */}
              <div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                  backgroundImage: portfolioVersions[selectedVersion]
                    ? `url(${portfolioVersions[selectedVersion].image})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "background-image 0.6s ease-in-out",
                }}
              >
                {/* Outer rotating border - Now visible on top of image */}
                <div
                  className="absolute inset-0 rounded-full border-10 border-orange-500 shadow-2xl shadow-orange-500/50"
                  style={{
                    animation:
                      "portalSpin 4s linear infinite, portalWiggle 2s ease-in-out infinite",
                  }}
                ></div>

                {/* Middle rotating border */}
                <div
                  className="absolute inset-4 rounded-full border-2 border-transparent border-t-orange-400 border-r-orange-400"
                  style={{
                    animation: "portalSpin 3s linear infinite reverse",
                  }}
                ></div>

                {/* Inner rotating dots */}
                <div
                  className="absolute inset-8 rounded-full border-2 border-transparent border-b-orange-300 border-l-orange-300"
                  style={{
                    animation: "portalSpin 2s linear infinite",
                  }}
                ></div>

                {/* Center glow */}
                <div className="absolute inset-12 bg-gradient-to-br from-orange-200 to-orange-100 rounded-full blur-xl opacity-30 pointer-events-none"></div>

                {/* Navigation Controls - Center positioning */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  {/* Previous and Next buttons - Spread apart horizontally */}
                  <div className="absolute top-1/2 left-0 right-0 w-full flex items-center justify-between px-4 sm:px-6 -translate-y-1/2">
                    <button
                      onClick={handleCarouselPrev}
                      className="p-2 sm:p-3 bg-black/40 hover:bg-orange-500/60 text-white rounded-full transition-all duration-300 flex items-center justify-center"
                    >
                      <FaChevronLeft className="text-lg sm:text-2xl" />
                    </button>
                    <button
                      onClick={handleCarouselNext}
                      className="p-2 sm:p-3 bg-black/40 hover:bg-orange-500/60 text-white rounded-full transition-all duration-300 flex items-center justify-center"
                    >
                      <FaChevronRight className="text-lg sm:text-2xl" />
                    </button>
                  </div>

                  {/* Step Through button - Bottom center */}
                  <div className="absolute bottom-6 sm:bottom-8">
                    <button
                      onClick={handleStepThrough}
                      className="px-6 sm:px-8 py-2 sm:py-3 bg-black/40 hover:bg-orange-500/60 text-white font-bold transition-all duration-300 text-sm sm:text-base rounded-lg"
                    >
                      Step Through
                    </button>
                  </div>
                </div>

                {/* Portal Border Sparks */}
                {portalSparks.map((spark) => {
                  const angle = (spark.angle * Math.PI) / 180;
                  const radius = 192; // w-96 = 384px, so radius is 192px
                  const startX = Math.cos(angle) * radius;
                  const startY = Math.sin(angle) * radius;
                  const endX = Math.cos(angle) * (radius + 80);
                  const endY = Math.sin(angle) * (radius + 80);

                  return (
                    <div
                      key={spark.id}
                      className="absolute"
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#fb923c",
                        borderRadius: "50%",
                        top: "50%",
                        left: "50%",
                        marginTop: "-2px",
                        marginLeft: "-2px",
                        animation: `portalSparkFly 0.8s ease-out forwards`,
                        pointerEvents: "none",
                        "--spark-start-x": `${startX}px`,
                        "--spark-start-y": `${startY}px`,
                        "--spark-end-x": `${endX}px`,
                        "--spark-end-y": `${endY}px`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes dropIn {
          0% {
            opacity: 0;
            transform: translateY(-100px) scale(0.3);
          }
          50% {
            opacity: 1;
            transform: translateY(10px) scale(1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes scaleOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }

        @keyframes portalSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes portalScaleIn {
          0% {
            opacity: 0;
            transform: scale(0.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes portalScaleOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.2);
          }
        }

        @keyframes portalWiggle {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
          }
          25% {
            transform: scaleX(1.02) scaleY(0.98);
          }
          50% {
            transform: scaleX(0.98) scaleY(1.02);
          }
          75% {
            transform: scaleX(1.02) scaleY(0.98);
          }
        }

        @keyframes sparkFly {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--spark-x), var(--spark-y)) scale(0);
          }
        }

        @keyframes portalSparkFly {
          0% {
            opacity: 1;
            transform: translate(var(--spark-start-x), var(--spark-start-y)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--spark-end-x), var(--spark-end-y)) scale(0);
          }
        }

        @keyframes portalExpand {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(100);
          }
        }

        @keyframes dimensionShift {
          0%, 100% {
            background: radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.15) 0%, rgba(139, 92, 246, 0.1) 35%, rgba(234, 88, 12, 0.05) 100%);
          }
          50% {
            background: radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.15) 0%, rgba(249, 115, 22, 0.1) 35%, rgba(99, 102, 241, 0.05) 100%);
          }
        }

        @keyframes limboBg {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(-5px, 5px);
          }
          75% {
            transform: translate(-10px, -5px);
          }
        }
      `}</style>
    </section>
  );
}
