import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { Button } from "@/components/ui/button";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Hero />

      <main className="flex-1 flex flex-col items-center gap-6 px-4">
        <p>This landing page still under construction :p</p>
        <Button className="w-48" asChild>
          <Link href="/protected/on-boarding">onBoarding</Link>
        </Button>
      </main>
    </>
  );
}
