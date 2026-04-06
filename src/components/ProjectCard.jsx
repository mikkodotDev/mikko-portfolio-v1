import { FaGithub, FaEye } from "react-icons/fa";

// Reusable project card component for portfolio projects
// Props: title, description, link

export default function ProjectCard({ title, description, link, github, image }) {
    return (
        <div className="bg-[#232733] rounded-lg shadow">
            <div className="">
                <img
                    src={image || "https://via.placeholder.com/400x200?text=Project+Image"}
                    alt={title}
                    className="w-full h-40 object-cover rounded-md"
                />
            </div>
            <div className="p-5">
                <h4 className="font-bold mb-2">{title}</h4>
                <p className="text-gray-400 mb-4">{description}</p>
            <div className="flex items-center gap-4">
                {link && (
                    <a href={link} className="flex items-center text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">
                        <FaEye className="mr-1" />
                        View Project
                    </a>
                )}
                {github && (
                    <a href={github} className="flex items-center text-gray-400 hover:text-orange-400" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="mr-1" />
                        GitHub
                    </a>
                )}
            </div>
            </div>
        </div>
    );
}
