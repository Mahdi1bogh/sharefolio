"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowUpDown, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { User } from "@/types/app.types";
import { signOutAction } from "@/app/actions";
type Props = {
  user: User;
};
const UserDropDown: React.FC<Props> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex bg-background border border-muted-accent/40 rounded-md px-3 py-1 focus:outline-none gap-x-2 items-center">
        <Avatar className="h-7 w-7">
          <AvatarImage src={user.avatar_url} alt="username" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {(user.name && <p>{user.name}</p>) || (
          <p>{user.email.split("@")[0].split(".")[0]}</p>
        )}
        <ArrowUpDown size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            className="flex items-center gap-x-2"
            href={"/protected/profile"}
          >
            <UserRound /> <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <form action={signOutAction}>
            <button className="flex items-center gap-x-2">
              <LogOut />
              <span>Logout</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
