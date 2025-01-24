import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  fetchProjectsByPortfolioId,
  getPortfolioById,
  getUserByPortfolioId,
} from "./actions";
import { signOutAction } from "@/app/actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Boxes,
  Briefcase,
  ChevronDown,
  Clock,
  Languages,
  Mails,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { ImGithub, ImLinkedin, ImPinterest, ImYoutube } from "react-icons/im";
import { fetchExperiencesByPortfolioId } from "@/app/protected/(admin)/profile/actions";
import ProjectCard from "@/components/project-card";
import { Experience } from "@/types/app.types";
import Typography from "@/components/ui/typography";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import CopyEmail from "@/components/copy-email";
import AuthButton from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
//
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const _id = (await params).id;
  const portfolio = await getPortfolioById(Number(_id));
  if (!portfolio) {
    return redirect("/protected/profile");
  }
  const userData = await getUserByPortfolioId(portfolio);
  if (typeof userData === "string") {
    return console.log(userData);
  }
  const { data, error } = await fetchExperiencesByPortfolioId(portfolio.id);
  if (error) {
    return console.log(error);
  }
  const projects = await fetchProjectsByPortfolioId(portfolio.id);

  if (typeof projects === "string") {
    return console.log(error);
  }

  function calculateDuration(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    const days = end.getDate() - start.getDate();

    let adjustedYears = years;
    let adjustedMonths = months;
    let adjustedDays = days;

    if (adjustedDays < 0) {
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      adjustedDays += prevMonth.getDate();
      adjustedMonths -= 1;
    }

    if (adjustedMonths < 0) {
      adjustedMonths += 12;
      adjustedYears -= 1;
    }

    return (
      <span className="text-primary">
        {`${adjustedYears ? `${adjustedYears} year${adjustedYears > 1 ? "s" : ""} ` : ""}${
          adjustedMonths
            ? `${adjustedMonths} month${adjustedMonths > 1 ? "s" : ""} `
            : ""
        }${adjustedDays ? `${adjustedDays} day${adjustedDays > 1 ? "s" : ""}` : ""}`.trim() ||
          "0 days"}
      </span>
    );
  }
  function calculateTotalExperience(experiences: Experience[]): number {
    let totalYears = 0;
    let totalMonths = 0;
    let totalDays = 0;

    experiences.forEach(({ start_date: startDate, end_date: endDate }) => {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date();

      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();

      if (days < 0) {
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
        months -= 1;
      }

      if (months < 0) {
        months += 12;
        years -= 1;
      }

      totalYears += years;
      totalMonths += months;
      totalDays += days;
    });

    // Normalize days to months
    totalMonths += Math.floor(totalDays / 30);
    totalDays = totalDays % 30;

    // Normalize months to years
    totalYears += Math.floor(totalMonths / 12);
    totalMonths = totalMonths % 12;

    const fractionalYear = totalYears + totalMonths / 12 + totalDays / 365;

    // Return rounded number of years
    return Math.round(fractionalYear);
  }
  return (
    <div className="w-full dark:bg-transparent py-24 px-4 h-screen">
      <nav className="h-20 border-b px-10 py-6 bg-background fixed top-0 left-0 right-0 z-20">
        <div className="flex justify-between">
          <div className="h-full flex items-center">
            <Link href="/">
              <Typography variant="h5" text="Sharefolio" />
            </Link>
          </div>
          <div className="flex items-center gap-x-2">
            <ThemeSwitcher />
            <AuthButton />
          </div>
        </div>
      </nav>
      <div className="flex items-center justify-center ">
        <div className="flex flex-col lg:flex-row w-full justify-center gap-4">
          {/* Description */}
          <div className="grid h-fit grid-cols-1 gap-4 lg:max-w-[400px]">
            <div className="rounded-lg border  dark:border-border bg-card text-card-foreground shadow-sm">
              <div className="p-6 pt-0 mt-5">
                <div className="flex flex-row items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatar_url} />
                    <AvatarFallback>{userData.name || "CN"}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex flex-col gap-y-1">
                    <div
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 mb-auto flex w-fit items-center justify-center gap-1 ${portfolio.isAvailable ? "bg-green-500/20 text-green-500" : "bg-pink-500/20 text-pink-500"} `}
                    >
                      <span className="font-semibold">
                        {portfolio.isAvailable
                          ? "Available To Work"
                          : "Not Available"}
                      </span>
                    </div>
                    <h1 className="text-md lg:text-2xl font-bold text-primary">
                      {userData.name || userData.email.split("@")[0]}
                    </h1>
                    <h4 className="text-sm lg:text-lg font-bold text-primary">
                      {portfolio.title || "No title"}
                    </h4>
                  </div>
                </div>
                <div className="mt-5 flex max-w-[50vh] flex-wrap gap-2 rounded-xl bg-background p-3">
                  {portfolio.languages?.map((tag) => (
                    <Tags icon={<Languages size={16} />} key={tag} tag={tag} />
                  ))}
                  <Tags icon={<MapPin size={16} />} tag={portfolio.location!} />
                  <Tags icon={<Clock size={16} />} tag={portfolio.timezone!} />
                  <Tags icon={<Briefcase size={16} />} tag={portfolio.title!} />
                </div>
                <div className="mt-5 grid grid-cols-3 lg:flex items-center gap-2">
                  <CopyEmail email={userData.email} />
                  {portfolio.links?.map((link) => (
                    <Link
                      className="bg-secondary/60 py-2 px-4 rounded-lg flex items-center gap-2  transition duration-300 hover:scale-105"
                      key={link}
                      href={link}
                    >
                      {link.includes("github") ? <ImGithub /> : null}
                      {link.includes("linkedin") ? <ImLinkedin /> : null}
                      {link.includes("youtube") ? <ImYoutube /> : null}
                      {link.includes("pinterest") ? <ImPinterest /> : null}
                      <span>
                        {
                          link
                            .replace("https://", "")
                            .replace("www.", "")
                            .split(".com")[0]
                        }
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              {/* <div className="mt-5 flex flex-row items-center gap-2"></div> */}
            </div>
            <div className="flex flex-row items-center">
              <div className="grid w-full grid-cols-2 gap-4 max-md:w-full lg:grid-cols-2">
                <div className="rounded-lg border  dark:border-border bg-card text-card-foreground shadow-sm max-md:h-full">
                  <div className="flex flex-col items-center justify-center gap-1 p-4 md:p-6">
                    <div className="flex items-center font-bold">
                      <span className="bg-gradient-to-b from-white to-gray-800 bg-clip-text font-mono text-4xl text-transparent md:text-5xl">
                        {projects.length}
                      </span>
                      <svg
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--mingcute size-6 text-primary md:size-8"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                          <path
                            fill="currentColor"
                            d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <button data-state="closed" className="cursor-help">
                      <div className="relative flex w-fit items-center justify-center gap-1 rounded-xl bg-secondary/40 px-3 py-1 md:px-3 md:py-1.5">
                        <Briefcase />
                        <span className="text-sm font-semibold text-gray-400">
                          Projects
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="rounded-lg border  dark:border-border bg-card text-card-foreground shadow-sm max-md:h-full ">
                  <div className="flex flex-col items-center justify-center gap-1 p-4 md:p-6">
                    <div className="flex items-center font-bold">
                      <span className="bg-gradient-to-b from-white to-gray-800 bg-clip-text font-mono text-4xl text-transparent md:text-5xl">
                        {calculateTotalExperience(data!)}
                      </span>
                      <svg
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--mingcute size-6 text-primary md:size-8"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                          <path
                            fill="currentColor"
                            d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <button
                      data-state="delayed-open"
                      className="cursor-default"
                      aria-describedby="radix-:r5:"
                    >
                      <div className="relative flex w-fit items-center justify-center gap-1 rounded-xl bg-secondary/40 px-3 py-1 md:px-3 md:py-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          className="iconify iconify--solar size-6 text-primary"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M18.483 16.767A8.5 8.5 0 0 1 8.118 7.081a1 1 0 0 1-.113.097c-.28.213-.63.292-1.33.45l-.635.144c-2.46.557-3.69.835-3.983 1.776c-.292.94.546 1.921 2.223 3.882l.434.507c.476.557.715.836.822 1.18c.107.345.071.717-.001 1.46l-.066.677c-.253 2.617-.38 3.925.386 4.506s1.918.052 4.22-1.009l.597-.274c.654-.302.981-.452 1.328-.452s.674.15 1.329.452l.595.274c2.303 1.06 3.455 1.59 4.22 1.01c.767-.582.64-1.89.387-4.507z"
                          ></path>
                          <path
                            fill="currentColor"
                            d="m9.153 5.408l-.328.588c-.36.646-.54.969-.82 1.182q.06-.045.113-.097a8.5 8.5 0 0 0 10.366 9.686l-.02-.19c-.071-.743-.107-1.115 0-1.46c.107-.344.345-.623.822-1.18l.434-.507c1.677-1.96 2.515-2.941 2.222-3.882c-.292-.941-1.522-1.22-3.982-1.776l-.636-.144c-.699-.158-1.049-.237-1.33-.45c-.28-.213-.46-.536-.82-1.182l-.327-.588C13.58 3.136 12.947 2 12 2s-1.58 1.136-2.847 3.408"
                            opacity=".5"
                          ></path>
                        </svg>
                        <span className="text-sm font-semibold text-gray-400">
                          Yrs Expertise
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Projects */}
          <div className="flex-1 flex max-lg:flex-col-reverse gap-4">
            <div className="flex-1 h-screen overflow-scroll scrollbar border  dark:border-border space-y-2 rounded-lg bg-card text-card-foreground p-4">
              {projects.map((project) => (
                <ProjectCard project={project} />
              ))}
            </div>
            {/* Experiences */}
            <div className="grid lg:max-w-[400px] float-right flex-1 grid-cols-1 gap-4 max-md:w-full 2xl:h-fit">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  {data?.map((item, index) => (
                    <div className="rounded-lg border  dark:border-border bg-card text-card-foreground shadow-sm max-md:h-full">
                      <div className="p-4 max-md:p-2 space-y-2">
                        <h1
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 mb-auto flex w-fit items-center justify-center gap-1 ${item.is_current ? "bg-green-500/20 text-green-500" : "bg-pink-500/20 text-pink-500"} `}
                        >
                          {item.company_name}
                        </h1>
                        <Typography
                          className=" text-primary"
                          text={item.job_title}
                          variant="h6"
                        />
                        <p className="text-sm">
                          {item.start_date} - {item.end_date || "Present"}{" "}
                          <br />
                          {calculateDuration(item.start_date, item.end_date!)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {portfolio.skills && (
                <div className="rounded-lg border p-4 space-y-4  dark:border-border bg-card text-card-foreground shadow-sm max-md:h-full">
                  <div className="flex items-center  max-md:p-2 gap-x-3">
                    <Boxes />
                    <Typography text={"My Skills"} variant="h4" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills.map((skill) => (
                      <div className="py-2 px-4 border rounded-lg max-md:p-2 space-y-2">
                        <Typography
                          className="text-primary"
                          text={`${skill.charAt(0).toUpperCase()}${skill.slice(1)}`}
                          variant="h6"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Tags = ({ tag, icon }: { tag: string; icon: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-green-500/10 dark:bg-secondary/60 py-1 pl-3 pr-4 transition duration-300 hover:scale-105 max-md:grow">
      {icon}
      <p className="text-sm font-semibold text-primary dark:text-gray-400">
        {tag}
      </p>
    </div>
  );
};
