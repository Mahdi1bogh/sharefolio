// import React from "react";
// type Props = {
//   projectName: string;
//   progressPercentage: number;
//   completionDate: string;
//   priority: string;
// };
// const ProjectCard: React.FC<Props> = ({
//   projectName,
//   progressPercentage,
//   completionDate,
//   priority,
// }) => {
//   return (
//     <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md w-64">
//       <div className="flex justify-between">
//         <div className="flex items-center gap-2">
//           <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
//             {/* Icon placeholder for category or project icon */}
//             <span className="icon">📁</span>
//           </span>
//           <p className="font-semibold text-sm text-gray-900">{projectName}</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <div
//             className={`w-2 h-2 rounded-full ${priority === "High" ? "bg-red-500" : "bg-gray-300"}`}
//           ></div>
//           <span className="text-xs text-gray-500">{priority}</span>
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="w-full bg-gray-200 rounded-full h-1.5">
//           <div
//             className="bg-green-500 h-1.5 rounded-full"
//             style={{ width: `${progressPercentage}%` }}
//           ></div>
//         </div>
//         <span className="text-xs font-medium text-gray-500 pl-2">
//           {progressPercentage}%
//         </span>
//       </div>

//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-1 text-xs text-gray-500">
//           {/* Icon placeholder for calendar */}
//           <span className="icon">📅</span>
//           <span>{completionDate}</span>
//         </div>
//         <button className="text-xs font-semibold text-blue-500 hover:underline">
//           Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;
import { Project } from "@/types/app.types";
import Link from "next/link";
import React from "react";
import { ImGithub } from "react-icons/im";
import { Button } from "./ui/button";

interface ProjectCardProps {
  project: Project;
  type?: string;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ project, type }) => {
  return (
    <div className="flex-1 border rounded-lg bg-card text-card-foreground p-4">
      <div className="mb-4">
        <img
          src={project.img_thumbnail}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <h2 className="text-lg font-semibold">{project.title}</h2>
      <p className="text-sm text-muted-foreground">
        {project.description!.length > 250
          ? `${project.description!.substring(0, 250)}...`
          : project.description}
      </p>{" "}
      {true && (
        <Link
          href={project.project_link ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-blue-500 hover:underline text-sm`}
        >
          View Project
        </Link>
      )}
      &nbsp;&nbsp;
      {project.github_link && (
        <Link
          href={project.github_link}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-primary hover:underline text-sm`}
        >
          Source Code
        </Link>
      )}
      <p className="text-xs text-muted-foreground mt-2">
        created at: {project.created_at}
      </p>
      {type === "admin" && (
        <div className="flex gap-2 mt-4">
          <Button asChild className="text-xs font-semibold hover:underline">
            <Link href={`/protected/projects/${project.id}/edit`}>Edit</Link>
          </Button>
          <Button
            variant={"destructive"}
            className="text-xs font-semibold hover:underline"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
