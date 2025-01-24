import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import ImageUpload from "./image-upload";
import { User } from "@/types/app.types";

const ProfilePictureCard = ({ userData }: { userData: User }) => {
  return (
    <div>
      <Card className="w-50 flex flex-col items-center">
        <CardHeader>Profile Picture</CardHeader>
        <CardContent>
          <div className="flex gap-x-4 ">
            <div className="relative w-fit">
              <Avatar className="h-24 w-24 ">
                <AvatarImage src={userData.avatar_url} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full hover:bg-zinc-600 z-30 absolute bottom-0 right-0"
                  >
                    <Edit size={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <ImageUpload userData={userData} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePictureCard;
