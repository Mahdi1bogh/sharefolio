"use server"

import { getUserData } from "@/app/actions";
import { portfolioSchema } from "@/components/forms/onboarding-form";
import { createClient } from "@/utils/supabase/server";

export const createPortfolio = async (formData:portfolioSchema) => {
    const supabase = await createClient();
    const userData = await getUserData();
  
    if (!userData) {
      return { error: 'No user data' };
    }
  
    const { error, data: portfolios } = await supabase
      .from('portfolios')
      .insert({...formData,owner_id:userData.id})
      .select('*');
  
    if (error) {
      return { error };
    }

  
    return { data: portfolios };
  
  };