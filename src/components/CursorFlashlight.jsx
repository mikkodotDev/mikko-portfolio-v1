import { useState, useEffect } from "react";

export default function CursorFlashlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 w-full h-full transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{
        background: `radial-gradient(circle 900px at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)`,
        zIndex: 10,
      }}
    />
  );
}
