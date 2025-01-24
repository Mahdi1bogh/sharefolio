import { getUserData } from "@/app/actions";
import EditProjectForm from "@/components/forms/edit-project-form";
import { redirect } from "next/navigation";
import { getProject } from "../../actions";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const _id = (await params).id;

  const userData = await getUserData();
  if (!userData) {
    return redirect("/sign-in");
  }

  const { data, error } = await getProject(_id);
  if (error) {
    return "Error fetching project";
  }
  return (
    <div>
      <EditProjectForm project={data} />
    </div>
  );
}
