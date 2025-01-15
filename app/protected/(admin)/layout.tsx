import { getUserData, signOutAction } from "@/app/actions";
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
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="text-zinc-700 dark:text-zinc-300" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <ImProfile size={22} className="text-zinc-700 dark:text-zinc-300" />
      ),
    },
    {
      label: "Portfolio",
      href: "/portfolio",
      icon: <BriefcaseBusiness className="text-zinc-700 dark:text-zinc-300" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="text-zinc-700 dark:text-zinc-300" />,
    },
  ];
  return (
    <div className="relative h-[calc(100vh-40px)] ">
      <nav className="h-20 border-b px-10 py-6 fixed top-0 left-0 right-0 z-20">
        <div className="flex justify-between">
          <div className="h-full flex items-center">
            <Typography variant="h5" text="Sharefolio" />
          </div>
          <Popover>
            <PopoverTrigger className="cursor-pointer" asChild>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userData.avatar_url} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Typography
                  variant="p"
                  text={userData.name || userData.email.split("@")[0]}
                />
                <ChevronDown size={16} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-52">
              <form action={signOutAction}>
                <Button
                  variant={"ghost"}
                  type="submit"
                  className="w-full ring-0 outline-0 border-transparent focus:ring-0 focus:outline-none"
                >
                  Logout
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
      <aside className="fixed border-r top-0 w-60 h-full pt-20 z-10">
        <ul className="flex flex-col gap-y-4 p-4">
          {sidebarLinks.map((link, index) => (
            <li className="w-full" key={index}>
              <Link
                href={link.href}
                className="flex w-full text-sm gap-x-4 text-zinc-800 dark:text-zinc-200 py-4 px-6 opacity-100 transition-all hover:opacity-80 items-center"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="h-[calc(100%-80px)] pt-20 ml-60">{children}</main>
    </div>
  );
}
