import { getUserData } from "@/app/actions";
import ExperienceShowcase from "@/components/experiences-showcase";
import ExperienceForm from "@/components/forms/add-experience-form";
import UpdatePortfolioForm from "@/components/forms/edit-portfolio-form";
import ProfilePictureCard from "@/components/profile-picture-card";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";

export default async function Page() {
  const userData = await getUserData();
  if (!userData) {
    return redirect("/sign-in");
  }

  return (
    <div className="grid w-full gap-6 md:grid-cols-12 p-4">
      <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
        {userData ? (
          <ProfilePictureCard userData={userData} />
        ) : (
          <Skeleton className="h-40 w-full rounded-lg" />
        )}
        <div>
          <ExperienceShowcase />
        </div>
      </div>

      <div className="col-span-12 md:col-span-7">
        <UpdatePortfolioForm />
      </div>
    </div>
  );
}
