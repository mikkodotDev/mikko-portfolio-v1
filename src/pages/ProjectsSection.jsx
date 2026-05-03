// Projects section for portfolio homepage
import { useEffect, useMemo, useRef, useState } from "react";

const FILTER_CATEGORIES = ["All", "Web Apps", "Mobile Apps", "UI/UX", "CMS"];
const CARD_SIZE_PATTERN = [
  "card-large",
  "card-medium",
  "card-small",
  "card-medium",
  "card-small",
  "card-wide",
];

export default function ProjectsSection() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [ruleVisible, setRuleVisible] = useState(false);
  const sectionRef = useRef(null);
  const blobRef = useRef(null);

  // Fetch projects from JSON
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}projects.json`)
      .then((response) => response.json())
      .then((data) => {
        setFeaturedProjects(data.featured);
        setProjects(data.regular);
      })
      .catch((error) => console.error("Error loading projects:", error));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => observer.disconnect();
  }, []);

  const allProjects = useMemo(() => {
    const featured = featuredProjects.map((project) => ({
      ...project,
      isFeatured: true,
    }));
    const regular = projects.map((project) => ({
      ...project,
      isFeatured: false,
    }));
    return [...featured, ...regular];
  }, [featuredProjects, projects]);

  const matchedCount = useMemo(() => {
    if (activeFilter === "All") {
      return allProjects.length;
    }
    return allProjects.filter((project) => project.category === activeFilter)
      .length;
  }, [activeFilter, allProjects]);

  useEffect(() => {
    if (!isSectionVisible) {
      return;
    }

    const headerTimeout = setTimeout(() => setHeaderVisible(true), 80);
    const ruleTimeout = setTimeout(() => setRuleVisible(true), 120);
    const filtersTimeout = setTimeout(() => setFiltersVisible(true), 160);

    return () => {
      clearTimeout(headerTimeout);
      clearTimeout(ruleTimeout);
      clearTimeout(filtersTimeout);
    };
  }, [isSectionVisible]);

  useEffect(() => {
    if (!isSectionVisible || allProjects.length === 0) {
      return;
    }

    const timeouts = allProjects.map((_, index) =>
      setTimeout(
        () => {
          setVisibleCards((prev) =>
            prev.includes(index) ? prev : [...prev, index],
          );
        },
        120 + index * 120,
      ),
    );

    return () => timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  }, [isSectionVisible, allProjects.length]);

  useEffect(() => {
    const blob = blobRef.current;
    const sectionElement = sectionRef.current;
    if (!blob || !sectionElement) {
      return undefined;
    }

    let blobX = 0;
    let blobY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let blobVisible = false;
    let frameId = null;

    const handleMouseMove = (event) => {
      const bounds = sectionElement.getBoundingClientRect();
      mouseX = event.clientX - bounds.left;
      mouseY = event.clientY - bounds.top;

      if (!blobVisible) {
        blob.style.opacity = "1";
        blobVisible = true;
      }
    };

    const handleMouseLeave = () => {
      blob.style.opacity = "0";
      blobVisible = false;
    };

    const animateBlob = () => {
      blobX += (mouseX - blobX) * 0.08;
      blobY += (mouseY - blobY) * 0.08;
      blob.style.transform = `translate(${blobX - 150}px, ${blobY - 150}px)`;
      frameId = window.requestAnimationFrame(animateBlob);
    };

    sectionElement.addEventListener("mousemove", handleMouseMove);
    sectionElement.addEventListener("mouseleave", handleMouseLeave);
    frameId = window.requestAnimationFrame(animateBlob);

    return () => {
      sectionElement.removeEventListener("mousemove", handleMouseMove);
      sectionElement.removeEventListener("mouseleave", handleMouseLeave);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handleCardMouseMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x.toFixed(1)}%`);
    card.style.setProperty("--mouse-y", `${y.toFixed(1)}%`);
  };

  const getCardSizeClass = (index) => CARD_SIZE_PATTERN[index] || "card-medium";

  const filteredFeatured = useMemo(() => {
    if (activeFilter === "All") {
      return featuredProjects;
    }
    return featuredProjects.filter(
      (project) => project.category === activeFilter,
    );
  }, [activeFilter, featuredProjects]);

  const filteredRegular = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-grid-bg" aria-hidden="true"></div>
      <div className="projects-cursor-blob" ref={blobRef}></div>

      <div className="projects-shell">
        <div className={`section-header ${headerVisible ? "visible" : ""}`}>
          <div className="header-left">
            <div className="eyebrow">
              <div className="eyebrow-line"></div>
              <span>Selected work</span>
            </div>
            <h2>
              My
              <br />
              <em>Projects</em>
            </h2>
          </div>
          <div className="project-count">
            {String(matchedCount).padStart(2, "0")}
          </div>
        </div>

        <div className={`section-rule ${ruleVisible ? "visible" : ""}`}></div>

        <div className={`filters ${filtersVisible ? "visible" : ""}`}>
          {FILTER_CATEGORIES.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                activeFilter === category ? "active" : ""
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-subsection">
          <div className="subsection-header">
            <h3>Featured work</h3>
            <p>Highlight projects with the most impact and depth.</p>
          </div>
          <div className="projects-grid">
            {filteredFeatured.length > 0 ? (
              filteredFeatured.map((project, index) => {
                const cardSizeClass = getCardSizeClass(
                  index % CARD_SIZE_PATTERN.length,
                );
                const overallIndex = index;

                return (
                  <article
                    key={`${project.title}-${index}`}
                    className={`project-card ${cardSizeClass} ${
                      visibleCards.includes(overallIndex) ? "visible" : ""
                    }`}
                    onMouseMove={handleCardMouseMove}
                  >
                    <div className="card-spotlight"></div>
                    <div className="card-inner">
                      <div className="card-visual">
                        <div
                          className="visual-bg"
                          style={{
                            backgroundImage: `url(${project.images[0]})`,
                          }}
                        ></div>
                      </div>

                      <div className="card-meta">
                        <span className="card-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="card-status">
                          <div className="status-dot"></div>
                          {project.label ? project.label : "Live"}
                        </div>
                      </div>

                      <div className="card-title">{project.title}</div>
                      <div className="card-desc">{project.description}</div>

                      <div className="card-footer">
                        <div className="card-tags">
                          {project.technologies.map((tech) => (
                            <span
                              key={`${project.title}-${tech}`}
                              className="tag"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a
                          className="arrow-btn"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title}`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="projects-empty">No featured projects yet.</div>
            )}
          </div>
        </div>

        <div className="projects-subsection">
          <div className="subsection-header">
            <h3>Other projects</h3>
            <p>More experiments, studies, and ongoing builds.</p>
          </div>
          <div className="projects-grid">
            {filteredRegular.length > 0 ? (
              filteredRegular.map((project, index) => {
                const cardSizeClass = getCardSizeClass(
                  index % CARD_SIZE_PATTERN.length,
                );
                const overallIndex = featuredProjects.length + index;

                return (
                  <article
                    key={`${project.title}-${index}`}
                    className={`project-card ${cardSizeClass} ${
                      visibleCards.includes(overallIndex) ? "visible" : ""
                    }`}
                    onMouseMove={handleCardMouseMove}
                  >
                    <div className="card-spotlight"></div>
                    <div className="card-inner">
                      <div className="card-visual">
                        <div
                          className="visual-bg"
                          style={{
                            backgroundImage: `url(${project.images[0]})`,
                          }}
                        ></div>
                      </div>

                      <div className="card-meta">
                        <span className="card-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="card-status">
                          <div className="status-dot"></div>
                          {project.label ? project.label : "Live"}
                        </div>
                      </div>

                      <div className="card-title">{project.title}</div>
                      <div className="card-desc">{project.description}</div>

                      <div className="card-footer">
                        <div className="card-tags">
                          {project.technologies.map((tech) => (
                            <span
                              key={`${project.title}-${tech}`}
                              className="tag"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a
                          className="arrow-btn"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title}`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="projects-empty">
                No projects found for this filter.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
