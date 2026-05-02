import { useState, useEffect, useRef } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show nav when: at the top, scrolling up, or near the top
      if (currentScrollY < 100 || currentScrollY < lastScrollY.current) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Hide nav when scrolling down past 100px
        setIsNavVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    // run once on mount to set initial nav visibility
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contacts" },
  ];
  return (
    <div className="min-h-screen bg-[#181c23] text-white font-sans">
      {/* Header & Navigation */}
      <header
        className={`sticky top-0 z-20 px-4 py-4 md:px-12 md:py-6 bg-[#181c23] bg-opacity-90 shadow-lg rounded-b-2xl flex items-center justify-between transition-all duration-500 ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{ zIndex: 999 }}
      >
        <div className="text-2xl font-extrabold tracking-wide drop-shadow-lg">
          Mikko Jardenico
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-2 py-1 font-medium text-lg transition-colors duration-300 hover:text-orange-400 focus:text-orange-400"
              onClick={(e) => {
                const target = document.querySelector(link.href);
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
        </nav>
        {/* Hamburger Icon */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-[#23272f] shadow-lg transition-all duration-300 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-7 h-1 bg-orange-400 mb-1 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block w-7 h-1 bg-orange-400 mb-1 rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-7 h-1 bg-orange-400 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </header>
      {/* Mobile Nav */}
      <nav
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#181c23] bg-opacity-95 flex flex-col items-center justify-center transition-transform duration-500 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ pointerEvents: menuOpen ? "auto" : "none", zIndex: 9999 }}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="py-5 text-2xl font-semibold text-white hover:text-orange-400 transition-colors duration-300"
            onClick={(e) => {
              setMenuOpen(false);
              const target = document.querySelector(link.href);
              if (target) {
                e.preventDefault();
                setTimeout(() => {
                  target.scrollIntoView({ behavior: "smooth" });
                }, 200);
              }
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
      {/* Main Sections */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
