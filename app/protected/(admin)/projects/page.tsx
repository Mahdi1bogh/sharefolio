import ProjectForm from "@/components/forms/add-project-form";
import ProjectCard from "@/components/project-card";
import { getPortfolio } from "../../actions";
import { fetchProjectsByPortfolioId } from "@/app/portfolios/[id]/actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const portfolio = await getPortfolio();
  if (!portfolio) {
    return redirect("/protected/on-boarding");
  }
  const projects = await fetchProjectsByPortfolioId(portfolio.id);
  if (typeof projects === "string") {
    return console.log(projects);
  }
  return (
    <div className="h-full space-y-2">
      <Button asChild>
        <Link href="/protected/projects/add-project">+ Add Project</Link>
      </Button>
      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg bg-card text-card-foreground p-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} type="admin" project={project} />
        ))}
      </div>
    </div>
  );
}
