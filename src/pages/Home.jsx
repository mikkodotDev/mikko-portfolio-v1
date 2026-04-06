import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down, hide nav; if scrolling up, show nav
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Detect active section
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
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
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#181c23] bg-opacity-95 flex flex-col items-center justify-center z-30 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
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
      {/* Left Sidebar - Section Indicators */}
      <div className="hidden lg:flex fixed left-8 top-1/2 transform -translate-y-1/2 z-10 flex-col gap-6">
        {navLinks.map((link, index) => {
          const sectionId = link.href.substring(1); // Remove '#'
          const isActive = activeSection === sectionId;
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group flex items-center gap-4 transition-all duration-300"
            >
              <span
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-orange-400 w-8"
                    : "bg-gray-600 group-hover:bg-gray-400"
                }`}
              />
              <span
                className={`text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "text-orange-400 opacity-100"
                    : "opacity-0 group-hover:opacity-100 text-gray-400"
                }`}
              >
                {link.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Main Sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
