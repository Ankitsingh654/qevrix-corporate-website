import React from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "QEVRIX Internship Portal",
      description: "Building a React-based internship management dashboard.",
      progress: 90,
      status: "Completed",
      mentor: "Mr. Sharma",
    },
    {
      title: "Frontend UI Enhancement",
      description: "Redesigning the student dashboard with TailwindCSS.",
      progress: 60,
      status: "In Progress",
      mentor: "Ms. Nidhi",
    },
    {
      title: "API Integration",
      description: "Integrate backend APIs with frontend components.",
      progress: 35,
      status: "Pending",
      mentor: "Mr. Sharma",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="text-green-400 text-xl" />;
      case "In Progress":
        return <FaClock className="text-qx-primary text-xl" />;
      default:
        return <FaTimesCircle className="text-red-400 text-xl" />;
    }
  };

  return (
    <div className="bg-qx-surface text-white p-8 rounded-xl shadow-lg border border-qx-borderHover">
      <h1 className="text-3xl font-bold text-qx-primary mb-8 text-center">
        🧩 Internship Projects
      </h1>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-qx-surface p-6 rounded-xl border border-qx-border hover:border-qx-borderHover transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-qx-primary">
                {project.title}
              </h2>
              {getStatusIcon(project.status)}
            </div>
            <p className="text-qx-textMuted mb-3">{project.description}</p>
            <p className="text-sm text-qx-textMuted mb-2">
              👨‍🏫 Mentor: <span className="text-qx-primary">{project.mentor}</span>
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-qx-surfaceHover h-3 rounded-lg mt-2">
              <div
                className={`h-3 rounded-lg ${
                  project.progress >= 80
                    ? "bg-green-500"
                    : project.progress >= 50
                    ? "bg-qx-primary"
                    : "bg-red-500"
                }`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            <p className="text-sm text-qx-textMuted mt-1">
              Progress: {project.progress}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
