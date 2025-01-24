"use client";

import { useEffect, useState } from "react";

import { Edit, Plus, Trash2 } from "lucide-react";
import { Experience } from "@/types/app.types";
import {
  deleteExperience,
  fetchExperiences,
} from "@/app/protected/(admin)/profile/actions";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExperienceForm from "./forms/add-experience-form";
import EditExperienceForm from "./forms/edit-experience-form";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

export default function ExperienceShowcase() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadExperiences() {
      const { ok, data, error } = await fetchExperiences();
      if (ok && data) {
        setExperiences(data!);
      }
    }
    setLoading(false);
    loadExperiences();
  }, []);
  const handleDelete = async (experience: Experience) => {
    const { message, error } = await deleteExperience(experience);
    if (error) {
      console.log(error);
      toast.error("Error deleting experience:");
      return;
    }
    toast.success(message);
    setExperiences(experiences.filter((exp) => exp.id !== "" + experience.id));
  };
  if (loading) return <Skeleton className="h-48 w-full rounded-lg" />;
  const component =
    loading && experiences.length > 0 ? (
      [1, 1].map(() => <Skeleton className="h-24 w-full rounded-lg" />)
    ) : (
      <p>No experiences found</p>
    );
  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experiences</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} /> Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="ml-2">+ New experience</DialogTitle>
              <ExperienceForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {experiences.length === 0
          ? component
          : experiences.map((experience) => (
              <div
                key={experience.id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-medium">
                    {experience.job_title} at {experience.company_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {experience.start_date} -{" "}
                    {experience.is_current ? "Present" : experience.end_date}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Edit size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="ml-2">
                          + New experience
                        </DialogTitle>
                        <EditExperienceForm experience={experience} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <form onSubmit={() => handleDelete(experience)}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="icon"
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </form>
                </div>
              </div>
            ))}
      </div>
    </Card>
  );
}
