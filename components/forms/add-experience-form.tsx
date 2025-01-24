"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { addExperience } from "@/app/protected/(admin)/profile/actions";
import { useRouter } from "next/navigation";

const experienceSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  job_title: z.string().min(1, "Job title is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  is_current: z.boolean().optional(),
});

export type ExperienceSchema = z.infer<typeof experienceSchema>;

export default function ExperienceForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: { is_current: false },
  });
  const router = useRouter();

  const onSubmit = async (values: ExperienceSchema) => {
    const result = await addExperience(values);
    if (result?.error) {
      toast.error("Failed to add experience.");
      console.error(result.error);
    } else {
      toast.success("Experience added successfully!");
      router.refresh();
    }
  };

  return (
    <Card className="p-5 ">
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="company_name" className="block text-sm font-medium">
            Company Name
          </label>
          <Input
            id="company_name"
            {...register("company_name")}
            placeholder="Company Name"
          />
          {errors.company_name && (
            <p className="text-red-500">{errors.company_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="job_title" className="block text-sm font-medium">
            Job Title
          </label>
          <Input
            id="job_title"
            {...register("job_title")}
            placeholder="Job Title"
          />
          {errors.job_title && (
            <p className="text-red-500">{errors.job_title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="start_date" className="block text-sm font-medium">
            Start Date
          </label>
          <Input type="date" id="start_date" {...register("start_date")} />
          {errors.start_date && (
            <p className="text-red-500">{errors.start_date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium">
            End Date
          </label>
          <Input type="date" id="end_date" {...register("end_date")} />
          {errors.end_date && (
            <p className="text-red-500">{errors.end_date.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="is_current"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="is_current"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label htmlFor="is_current" className="text-sm">
            I currently work here
          </label>
        </div>

        <Button type="submit">Add Experience</Button>
      </form>
    </Card>
  );
}
