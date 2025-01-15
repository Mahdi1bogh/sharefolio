"use client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import SkillsPicker from "../skills-picker";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortfolio } from "@/app/protected/on-boarding/actions";
import { toast } from "sonner";

const portfolioSchema = z.object({
  isAvailable: z.boolean().optional(),
  languages: z.array(z.string()),
  links: z.array(z.string().url()),
  location: z.string(),
  title: z.string().refine((value) => value.length > 0, "Title is required"),
  skills: z.array(z.string()),
  timezone: z.string(),
});

export type portfolioSchema = z.infer<typeof portfolioSchema>;

export default function OnBoardingForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<portfolioSchema>({
    resolver: zodResolver(portfolioSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: portfolioSchema) => {
    setIsSubmitting(true);
    const error = await createPortfolio(values);
    setIsSubmitting(false);
    if (error?.error) {
      console.log(error);
      return toast.error("Couldn't create portfolio. Please try again.");
    }
    toast.success("Onboarding is a success");
    router.push("/protected/profile");
  };

  return (
    <Card className="p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Job Title
          </label>
          <Input id="name" {...register("title")} placeholder="Web Developer" />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
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
          <label htmlFor="languages" className="block text-sm font-medium">
            Languages you speak
          </label>
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <SkillsPicker
                selectedSkills={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
          {errors.languages && (
            <p className="text-red-500">{errors.languages.message}</p>
          )}
        </div>

        <Controller
          name="links"
          control={control}
          render={({ field }) => (
            <div>
              <label htmlFor="links" className="block text-sm font-medium">
                Include your links
              </label>
              {(field.value || []).map((link, index) => (
                <div key={index} className="flex space-x-2 mt-2">
                  <Input
                    type="url"
                    value={link}
                    onChange={(e) => {
                      const updatedLinks = [...(field.value || [])];
                      updatedLinks[index] = e.target.value;
                      field.onChange(updatedLinks);
                    }}
                    placeholder={`Link ${index + 1}`}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const updatedLinks = (field.value || []).filter(
                        (_, i) => i !== index
                      );
                      field.onChange(updatedLinks);
                    }}
                    className="text-red-500"
                    size={"icon"}
                    variant={"outline"}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                variant={"outline"}
                size={"icon"}
                type="button"
                onClick={() => field.onChange([...(field.value || []), ""])}
                className="mt-2"
              >
                +
              </Button>
              {errors.links && (
                <p className="text-red-500">{errors.links.message}</p>
              )}
            </div>
          )}
        />

        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <Input
            id="location"
            {...register("location")}
            placeholder="Germany"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium">
            Timezone
          </label>
          <Input
            id="timezone"
            {...register("timezone")}
            placeholder="Timezone"
          />
          {errors.timezone && (
            <p className="text-red-500">{errors.timezone.message}</p>
          )}
        </div>

        <Controller
          name="isAvailable"
          control={control}
          render={({ field }) => (
            <div>
              <label
                htmlFor="isAvailable"
                className="block text-sm font-medium"
              >
                Are you open to work?
              </label>
              <Checkbox
                id="is_available"
                checked={field.value}
                onCheckedChange={field.onChange}
                ref={field.ref}
              />
              {errors.isAvailable && (
                <p className="text-red-500">{errors.isAvailable.message}</p>
              )}
            </div>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
}
