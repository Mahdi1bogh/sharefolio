"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import SkillsPicker from "../skills-picker";
import { toast } from "sonner";
import { getPortfolio } from "@/app/protected/actions";
import { useRouter } from "next/navigation";
import { updateUserPortfolio } from "@/app/protected/(admin)/profile/actions";
import { Checkbox } from "../ui/checkbox";
import { Trash2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const portfolioSchema = z.object({
  isAvailable: z.boolean().optional(),
  languages: z.array(z.string()),
  links: z.array(z.string().url()),
  location: z.string(),
  title: z.string().refine((value) => value.length > 0, "Title is required"),
  skills: z.array(z.string()),
  timezone: z.string(),
  description: z.string(),
});

type PortfolioSchema = z.infer<typeof portfolioSchema>;

export default function UpdatePortfolioForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PortfolioSchema>({
    resolver: zodResolver(portfolioSchema),
  });

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const portfolio = await getPortfolio();
        console.log("PORTFOLIO", portfolio);
        if (portfolio) {
          setValue("isAvailable", portfolio.isAvailable!);
          setValue("languages", portfolio.languages!);
          setValue("links", portfolio.links!);
          setValue("location", portfolio.location!);
          setValue("title", portfolio.title!);
          setValue("skills", portfolio.skills!);
          setValue("timezone", portfolio.timezone!);
          setValue("description", portfolio.description!.trim());
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch portfolio data.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPortfolio();
  }, [setValue]);

  const onSubmit = async (values: PortfolioSchema) => {
    setIsSubmitting(true);
    const error = await updateUserPortfolio(values); // Replace with your update function
    setIsSubmitting(false);
    if (error?.error) {
      console.log(error);
      toast.error("Couldn't update portfolio. Please try again.");
      return;
    }
    toast.success("Portfolio updated successfully.");
    router.refresh();
  };

  if (isLoading) {
    return <Skeleton className="h-full w-full bg-card/80 border rounded-lg" />;
  }

  return (
    <div>
      <Card className="p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Job Title
            </label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Web Developer"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              About yourself{" "}
            </label>
            <textarea
              className="w-full h-32 p-2 border  rounded"
              id="description"
              {...register("description")}
              placeholder="I am a Web Developer"
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
