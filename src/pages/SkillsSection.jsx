import { useEffect, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaLaravel,
  FaDailymotion,
} from "react-icons/fa";
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiFlutter,
  SiWordpress,
  SiAdobephotoshop,
  SiReactivex,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Skills",
    skills: [
      { name: "Problem Solving", percent: 90, icon: FaHtml5 },
      { name: "API Integration", percent: 85, icon: FaCss3Alt },
      { name: "Database Design", percent: 85, icon: SiJavascript },
      { name: "Clean Code", percent: 80, icon: SiReact },
      { name: "Version Control", percent: 80, icon: SiTailwindcss },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "HTML5", percent: 90, icon: FaHtml5 },
      { name: "CSS3", percent: 85, icon: FaCss3Alt },
      { name: "JavaScript", percent: 80, icon: SiJavascript },
      { name: "PHP", percent: 65, icon: SiPhp },
      { name: "Python", percent: 60, icon: SiPython },
      { name: "Java", percent: 55, icon: FaJava },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React", percent: 75, icon: SiReact },
      { name: "Node.js", percent: 70, icon: SiNodedotjs },
      { name: "Tailwind CSS", percent: 70, icon: SiTailwindcss },
      { name: "Laravel", percent: 55, icon: FaLaravel },
      { name: "Flutter", percent: 80, icon: SiFlutter },
      { name: "React Native", percent: 65, icon: SiReactivex },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "WordPress", percent: 70, icon: SiWordpress },
      { name: "Git & GitHub", percent: 80, icon: FaCss3Alt },
      { name: "VS Code", percent: 90, icon: FaHtml5 },
      { name: "Postman", percent: 75, icon: SiNodedotjs },
      { name: "Chrome DevTools", percent: 85, icon: SiJavascript },
    ],
  },
  {
    title: "Design",
    skills: [
      { name: "Photoshop", percent: 65, icon: SiAdobephotoshop },
      { name: "Figma", percent: 70, icon: FaHtml5 },
      { name: "UI/UX Design", percent: 70, icon: FaCss3Alt },
      { name: "Prototyping", percent: 65, icon: SiReact },
      { name: "Wireframing", percent: 75, icon: FaDailymotion },
    ],
  },
];

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const skillsElement = document.getElementById("skills");
    if (skillsElement) {
      observer.observe(skillsElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      skillCategories.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCategories((prev) => [...prev, index]);
        }, index * 200);
      });
    }
  }, [isVisible]);

  return (
    <section
      id="skills"
      className="px-4 py-16 md:py-20 bg-[#181c23] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h3
            className={`text-3xl md:text-4xl font-bold mb-4 text-white transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
          >
            Technical Skills
          </h3>
          <p
            className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            My expertise across different technologies and frameworks,
            constantly evolving with industry trends.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`transition-all duration-1000 transform ${
                visibleCategories.includes(categoryIndex)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Category Title */}
              <h4 className="text-sm md:text-base font-bold text-orange-400 mb-4 uppercase tracking-wider text-center md:text-left">
                {category.title}
              </h4>

              {/* Skills List */}
              <div className="space-y-2 flex flex-col items-center md:items-start">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className={`group transition-all duration-700 transform ${
                      visibleCategories.includes(categoryIndex)
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{
                      transitionDelay: `${skillIndex * 100}ms`,
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <skill.icon className="text-lg text-gray-400 group-hover:text-orange-400 transition-colors" />
                      <span className="text-gray-300 text-sm group-hover:text-gray-100 transition-colors cursor-pointer">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Skills Tags */}
        <div
          className={`mt-16 transition-all duration-1000 delay-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Responsive Design",
              "API Integration",
              "Database Design",
              "Version Control",
              "Agile Development",
            ].map((tag, index) => (
              <span
                key={tag}
                className={`px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 rounded-full text-sm font-medium border border-gray-600 hover:border-orange-400 hover:text-orange-400 transition-all duration-300 transform hover:scale-105 ${isVisible ? "animate-pulse" : ""}`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationDuration: "2s",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
