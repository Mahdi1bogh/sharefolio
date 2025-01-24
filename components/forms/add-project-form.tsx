"use client";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SkillsPicker from "../skills-picker";
import { v4 as uuidv4 } from "uuid"; // Use UUID for unique naming
import { createClient } from "@/utils/supabase/client";
import { createProject } from "@/app/protected/(admin)/projects/actions";

const projectSchema = z.object({
  description: z.string().nonempty("Description is required"),
  github_link: z.string().nullable(),
  project_link: z.string().optional(),
  skills: z.array(z.string()).nullable(),
  title: z.string().nonempty("Title is required"),
});

// TypeScript type for form values
export type ProjectFormInputs = z.infer<typeof projectSchema>;
const supabase = createClient();

export default function ProjectForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormInputs>({
    resolver: zodResolver(projectSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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

    const uniqueFileName = `projects/${uuidv4()}-${avatarFile.name}`;

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
      setImageUrl(process.env.NEXT_PUBLIC_BUCKEt_URl + data.path);
    }
  };
  const onSubmit = async (values: ProjectFormInputs) => {
    if (!imageUrl) {
      toast.error("Please upload an image.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await createProject(
        { ...values, description: values.description.trim() },
        imageUrl
      );
      if (error) {
        toast.error("Couldn't create project. Please try again.");
        console.log(error);
      } else {
        toast.success("Project created successfully");
        router.push("/protected/profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Ecommerce store"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            description
          </label>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded"
            id="description"
            {...register("description")}
            placeholder="This project is about building a web application ..."
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium">
            Skills
          </label>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <SkillsPicker
                selectedSkills={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="github_link" className="block text-sm font-medium">
            github link
          </label>
          <Input
            id="github_link"
            {...register("github_link")}
            placeholder="Your github link"
          />
          {errors.github_link && (
            <p className="text-red-500">{errors.github_link.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="project_link" className="block text-sm font-medium">
            Project link
          </label>
          <Input
            id="project_link"
            {...register("project_link")}
            placeholder="your porject link"
          />
          {errors.project_link && (
            <p className="text-red-500">{errors.project_link.message}</p>
          )}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="img_thumbnail">Thumbnail picture</label>
          <Input
            onChange={(e) => handleImageUpload(e)}
            id="img_thumbnail"
            type="file"
          />
        </div>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Card>
  );
}
