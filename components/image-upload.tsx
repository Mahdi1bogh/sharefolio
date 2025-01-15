"use client";
import Image from "next/image";
import { ImCancelCircle } from "react-icons/im";
import { v4 as uuidv4 } from "uuid"; // Use UUID for unique naming
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useOnBoarding } from "@/hooks/on-boarding";

const supabase = createClient();

const ImageUpload = () => {
  const { imageUrl, updateImageUrl } = useOnBoarding();

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

    if (error) {
      toast.error("Upload error. Please try again.");
    } else {
      toast.success("Image uploaded successfully");
      updateImageUrl(process.env.NEXT_PUBLIC_BUCKEt_URl + data.path);
    }
  };

  if (imageUrl) {
    return (
      <div className="flex items-center justify-center h-32 w-32 relative">
        <Image
          src={imageUrl}
          className="object-cover w-full h-full rounded-md"
          alt="user profile picture"
          width={320}
          height={320}
        />
        <ImCancelCircle
          size={30}
          onClick={() => updateImageUrl("")}
          className="absolute cursor-pointer -right-2 -top-2 z-10 hover:scale-110"
        />
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Your picture</Label>
      <Input onChange={(e) => handleImageUpload(e)} id="picture" type="file" />
    </div>
  );
};

export default ImageUpload;
