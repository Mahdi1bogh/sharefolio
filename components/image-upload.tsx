"use client";
import { v4 as uuidv4 } from "uuid"; // Use UUID for unique naming
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useOnBoarding } from "@/hooks/on-boarding";

import { User } from "@/types/app.types";
import { useRouter } from "next/navigation";

const supabase = createClient();

const ImageUpload = ({ userData }: { userData: User }) => {
  const { updateImageUrl } = useOnBoarding();
  const router = useRouter();
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const avatarFile =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : null;

    if (!avatarFile) {
      console.log("NO FILE");
      return;
    }

    const uniqueFileName = `users/${uuidv4()}-${avatarFile.name}`;

    const { data, error } = await supabase.storage
      .from("linktostore")
      .upload(uniqueFileName, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data);
    if (error) {
      toast.error("Upload error. Please try again.");
    } else {
      toast.success("Image uploaded successfully");
      updateImageUrl(process.env.NEXT_PUBLIC_BUCKEt_URl + data.path);
      const { data: userResponse, error } = await supabase
        .from("users")
        .update({
          avatar_url: process.env.NEXT_PUBLIC_BUCKEt_URl + data.path,
        })
        .eq("id", userData.id);
      if (error) {
        console.log(error);
        toast.error("update user avatar error. Please try again.");
      }
      router.refresh();
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Your picture</Label>
      <Input onChange={(e) => handleImageUpload(e)} id="picture" type="file" />
    </div>
  );
};

export default ImageUpload;
