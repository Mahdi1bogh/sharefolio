"use server"

import { ProjectFormInputs } from "@/components/forms/add-project-form";
import { createClient } from "@/utils/supabase/server"
import { getPortfolio } from "../../actions";

export const createProject = async (formData:ProjectFormInputs,img_thumbnail:string) => {
    const supabase = await createClient();
    const portfolio = await getPortfolio();
    const { data, error } = await supabase
      .from("projects")
      .insert({...formData,portfolio_id:portfolio?.id,created_at:new Date(),img_thumbnail})
      .select();

    if (error) {
      return { error };
    }

    return { data };
}
export async function getProject(projectId: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("id", projectId).single();

    if (error) {
      console.error("Error fetching project:", error);
      return { error };
    }
    return { data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error };
  }
}
export async function editProject(projectId: string, updatedData: any) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("projects")
      .update(updatedData)
      .eq("id", projectId);

    if (error) {
      console.error("Error updating project:", error);
      return { error };
    }
    return { data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error };
  }
}
