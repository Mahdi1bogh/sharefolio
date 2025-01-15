import { getUserData } from "@/app/actions";
import OnBoardingForm from "@/components/forms/onboarding-form";
import Typography from "@/components/ui/typography";

export default async function Page() {
  const user = await getUserData();
  return (
    <div>
      <Typography
        text={`👋 Welcome ${user?.name || user?.email}`}
        variant="h3"
      />
      <Typography
        text="We are gonna build your portfolio now , it will take few seconds"
        variant="p"
        className="my-3"
      />
      <Typography text="Let's get Started" variant="h3" className="my-3" />
      <OnBoardingForm />
    </div>
  );
}
