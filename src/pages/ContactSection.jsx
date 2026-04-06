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
} from "react-icons/fa";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    {
      icon: FaEnvelope,
      link: "mailto:mikko.jardenico@gmail.com",
      title: "Email",
    },
    {
      icon: FaGithub,
      link: "https://github.com",
      title: "GitHub",
    },
    {
      icon: FaLinkedin,
      link: "https://linkedin.com",
      title: "LinkedIn",
    },
    {
      icon: FaTwitter,
      link: "https://twitter.com",
      title: "Twitter",
    },
    {
      icon: FaInstagram,
      link: "https://instagram.com",
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
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

            {/* Contact Form */}
            {submitted ? (
              <div className="p-8 bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-2xl text-center">
                <div className="text-6xl mb-4 text-green-400">
                  <FaCheckCircle className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-300">
                  Thank you for reaching out. I'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-white font-medium flex items-center"
                    >
                      <FaUser className="mr-2 text-orange-400" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-white font-medium flex items-center"
                    >
                      <FaEnvelope className="mr-2 text-orange-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-white font-medium flex items-center"
                  >
                    <FaComment className="mr-2 text-orange-400" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project idea, requirements, or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Poke Me</span>
                      <FaHandPointer className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>
              </form>
            )}
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
