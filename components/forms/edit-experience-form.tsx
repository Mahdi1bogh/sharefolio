"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Experience } from "@/types/app.types";
import { editExperience } from "@/app/protected/(admin)/profile/actions";
import { toast } from "sonner";

const experienceSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  company_name: z.string().min(1, "Company name is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  is_current: z.boolean().optional(),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

type EditExperienceFormProps = {
  experience: Experience;
};

export default function EditExperienceForm({
  experience,
}: EditExperienceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      job_title: experience.job_title,
      company_name: experience.company_name,
      start_date: experience.start_date,
      end_date: experience.end_date!,
      is_current: experience.is_current || false,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: ExperienceFormData) => {
    const result = await editExperience(experience.id, data);
    if (result.error) {
      console.error("Failed to update experience:", result.error);
      toast.error("Failed to update experience.");
      return;
    }
    toast.success("Experience updated successfully!");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="job_title" className="block text-sm font-medium">
          Job Title
        </label>
        <Input id="job_title" {...register("job_title")} />
        {errors.job_title && (
          <p className="text-red-500">{errors.job_title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company_name" className="block text-sm font-medium">
          Company Name
        </label>
        <Input id="company_name" {...register("company_name")} />
        {errors.company_name && (
          <p className="text-red-500">{errors.company_name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="start_date" className="block text-sm font-medium">
          Start Date
        </label>
        <Input id="start_date" type="date" {...register("start_date")} />
        {errors.start_date && (
          <p className="text-red-500">{errors.start_date.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="end_date" className="block text-sm font-medium">
          End Date
        </label>
        <Input id="end_date" type="date" {...register("end_date")} />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="is_current" {...register("is_current")} />
        <label htmlFor="is_current">Currently Working Here</label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
