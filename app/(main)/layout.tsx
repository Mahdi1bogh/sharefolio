import { NavigationMenuDemo } from "@/components/nav-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu } from "lucide-react";
import Link from "next/link";
import { getUserData } from "../actions";
import UserDropDown from "@/components/user-dropdown";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();
  return (
    <div>
      <nav className="backdrop-blur bg-background/50 lg:max-w-[900px] max-w-4xl sm:mx-8 mx-4 lg:mx-auto shadow-sm z-50 m-4 border rounded-xl mb-0 border-muted-accent/40 fixed top-0 left-0 right-0">
        <div className="flex flex-row justify-between px-4 py-2 z-100">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <span className="text-2xl">🌳</span>
            </Link>
            <span className="text-sm font-[family-name:var(--font-geist-mono)]">
              Sharefolio
            </span>
          </div>
          <div className="hidden md:block space-x-4 z-1000 ml-auto">
            <div className="flex items-center gap-x-2">
              <ThemeSwitcher />
              <NavigationMenuDemo />
              {/* <Button
                asChild
                variant={"ghost"}
                className="w-fit bg-transparent"
              >
                <Link href="/jobs">Job postings</Link>
              </Button> */}
              {!user ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/sign-in">Login </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/sign-up">Register </Link>
                  </Button>
                </>
              ) : (
                <UserDropDown user={user} />
              )}
            </div>
          </div>
          <div className="md:hidden items-center flex gap-1">
            <Button
              className="bg-green-500/20 border border-green-600/30 text-green-700 shadow-sm hover:text-primary hover:bg-green-500/30"
              variant="ghost"
              asChild
            >
              <Link href="/sign-in">Login </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  asChild
                  className="px-1"
                  variant="outline"
                  size={"icon"}
                >
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-4 mr-4">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <main className="mt-24 ">
        <div className="container py-20 px-4 max-w-4xl md:px-0 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
