import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardSwipe } from "@/components/ui/card-swipe";
import Link from "next/link";
const images = [
  { src: "/create-portfolio.PNG", alt: "Image 1" },
  { src: "/hunt-job.PNG", alt: "Image 2" },
];
export default async function Home() {
  return (
    <>
      <main className="flex flex-col gap-y-4 justify-center">
        <h1 className="text-3xl text-center dark:text-neutral-200 font-[family-name:var(--font-geist-mono)]">
          Sharefolio
        </h1>
        <p className="text-center w-full mx-auto sm:max-w-sm dark:text-neutral-300 md:text-lg">
          A fast, focused job board for STEM professionals. Updated daily with
          new job postings.
        </p>

        <div className="w-full p-4 border grid grid-cols-1 md:grid-cols-2 rounded-md gap-4">
          <div className="dark:bg-muted/50 bg-white flex items-center flex-col p-6 space-y-4 border rounded-md">
            <h1 className="text-3xl max-md:flex-col max-md:gap-y-2 text-center dark:text-neutral-200 flex items-center justify-center gap-x-2">
              <span>For Employers</span>{" "}
              <Badge
                className="bg-yellow-400/30 text-yellow-400 border-yellow-200"
                variant="outline"
              >
                Cheap
              </Badge>
            </h1>
            <p className="text-center w-full mx-auto sm:max-w-sm dark:text-neutral-300 md:text-lg">
              Share your job postings with Sharefolio and reach out to STEM
              professionals for your next hire.
            </p>
            <Button variant="default" asChild>
              <Link href="/jobs/post-job">Create a job</Link>
            </Button>
          </div>
          <div className="dark:bg-muted/50 bg-white flex items-center flex-col p-6 space-y-4 border rounded-md">
            <h1 className="text-3xl text-center dark:text-neutral-200 font-[family-name:var(--font-geist-mono)]">
              For Job Seekers
            </h1>
            <p className="text-center w-full mx-auto sm:max-w-sm dark:text-neutral-300 md:text-lg">
              Build Your portfolio in a{" "}
              <span className="bg-gradient-to-r from-green-500 to-green-300 bg-clip-text text-transparent">
                few seconds
              </span>
              . Browse job postings from Sharefolio and apply to your dream job.
            </p>
            <Button variant="default" asChild>
              <Link href="/jobs">Browse jobs</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
