import { getUserData, signOutAction } from "@/app/actions";
import AuthButton from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Typography from "@/components/ui/typography";
import {
  BriefcaseBusiness,
  ChevronDown,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ImProfile } from "react-icons/im";

type sidebarLinksType = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserData();
  if (!userData) {
    return redirect("/sign-in");
  }
  const sidebarLinks: sidebarLinksType[] = [
    // {
    //   label: "Dashboard",
    //   href: "/dashboard",
    //   icon: <LayoutDashboard className="text-zinc-700 dark:text-zinc-300" />,
    // },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <ImProfile size={22} className="text-zinc-700 dark:text-zinc-300" />
      ),
    },
    {
      label: "Projects",
      href: "/projects",
      icon: <BriefcaseBusiness className="text-zinc-700 dark:text-zinc-300" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="text-zinc-700 dark:text-zinc-300" />,
    },
  ];
  return (
    <div className="relative h-screen ">
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
      <aside className="fixed border-r top-0 w-60 h-full pt-20 z-10">
        <ul className="flex flex-col gap-y-4 p-4">
          {sidebarLinks.map((link, index) => (
            <li className="w-full" key={index}>
              <Link
                href={"/protected/" + link.href}
                className="flex w-full text-sm gap-x-4 text-zinc-800 dark:text-zinc-200 py-4 px-6 opacity-100 transition-all hover:opacity-80 items-center"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="h-full dark:bg-transparent bg-muted p-6 mt-20 ml-60">
        <div className="max-h-full">{children}</div>
      </main>
    </div>
  );
}
