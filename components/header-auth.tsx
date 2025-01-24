import { getUserData, signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import { ChevronDown } from "lucide-react";

export default async function AuthButton() {
  const user = await getUserData();
  return (
    <>
      {user ? (
        <Popover>
          <PopoverTrigger className="cursor-pointer" asChild>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Typography
                variant="p"
                text={user.name || user.email.split("@")[0]}
              />
              <ChevronDown size={16} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-background w-52">
            <Link
              className="pl-4 text-sm py-2 hover:text-primary/85"
              href="/protected/profile"
            >
              Profile
            </Link>
            <form action={signOutAction}>
              <Button
                variant={"ghost"}
                type="submit"
                className=" ring-0 outline-0 border-transparent focus:ring-0 focus:outline-none"
              >
                Logout
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              className="opacity-75"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              className="opacity-75"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
