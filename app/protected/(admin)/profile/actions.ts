"use server";

import { getUserData } from "@/app/actions";
import { portfolioSchema } from "@/components/forms/onboarding-form";
import { createClient } from "@/utils/supabase/server";
import { getPortfolio } from "../../actions";
import { Experience } from "@/types/app.types";
import { ExperienceFormData } from "@/components/forms/edit-experience-form";

export const updateUserPortfolio = async (formData:portfolioSchema) => {
    const supabase = await createClient();
    const userData = await getUserData();
  
    if (!userData) {
      return { error: "No user data" };
    }
  
    const { error, data: portfolios } = await supabase
      .from("portfolios")
      .update({ ...formData, owner_id: userData.id })
      .eq("owner_id", userData.id)
      .select("*");
  
    if (error) {
      return { error };
    }
  
    return { data: portfolios };
}
export async function addExperience( experienceData: any) {
  const supabase = await createClient();
  const portfolio = await getPortfolio();

  if (!portfolio) {
    return console.log("No portfolio found");
  }  
  const { data, error } = await supabase
    .from("experiences")
    .insert([{ ...experienceData, portfolio_id: portfolio.id }]);

  if (error) {
    console.error("Error adding experience:", error.message);
    return {error};
  }
  return data;
}
export async function fetchExperiences() {
  const supabase = await createClient();
  const portfolio = await getPortfolio();

  if (!portfolio) {
    return {ok:false ,data:null, error:"Portfolio not found"}; 
   }


  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("portfolio_id", portfolio.id);

  if (error) {
    console.error("Error fetching experiences:", error.message);
    return  {ok:false ,data:null, error};
  }
  return {ok:true , data ,error:null};
}
export async function fetchExperiencesByPortfolioId(id:number):Promise<{ok:boolean,data:Experience[]|null,error:string|null}> {
  const supabase = await createClient();
  const portfolio = await supabase.from("portfolios").select("*").eq("id", id).single();

  if (!portfolio) {
    return {ok:false ,data:null, error:"Portfolio not found"}; 
   }


  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("portfolio_id", id);

  if (error) {
    console.error("Error fetching experiences:", error.message);
    return  {ok:false ,data:null, error:"Error fetching experiences"};
  }
  return {ok:true , data ,error:null};
}


export async function editExperience(experienceId: string, updatedData: ExperienceFormData) {
  const supabase = await createClient();
  const portfolio = await getPortfolio();

  if (!portfolio) {
    return { error: "No portfolio found" };
  }

  const { data, error } = await supabase
    .from("experiences")
    .update(updatedData)
    .eq("id", experienceId)
    .eq("portfolio_id", portfolio.id);

  if (error) {
    console.error("Error updating experience:", error.message);
    return { error };
  }

  return { data };
}

export async function deleteExperience(experience:Experience) {
  const supabase = await createClient();
  const portfolio = await getPortfolio();

  if (!portfolio) {
    return { error: "No portfolio found" };
  }

  const { error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", experience.id)
    .eq("portfolio_id", portfolio.id);

  if (error) {
    console.error("Error deleting experience:", error.message);
    return { error };
  }

  return { message: "Experience deleted successfully" };
}
