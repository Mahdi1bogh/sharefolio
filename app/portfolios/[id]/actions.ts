"use server";

import { Portfolio, Project, User } from "@/types/app.types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";


export const getPortfolioById = async (id: number):Promise<Portfolio | null> => {
    const supabase = await createClient();
    const { data,error } = await supabase.from("portfolios").select().eq("id", id).single();
    if (error) {
        throw error;
    }

    return data;
};

export const fetchProjectsByPortfolioId = async (id: number):Promise<Project[] | string> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select().eq("portfolio_id", id).order("created_at", { ascending: false });
    if (error) {
        return "Error fetching projects";
    }

    return data;
};
export const getUserByPortfolioId = async (Portfolio: Portfolio):Promise<User | string> => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("users").select().eq("id", Portfolio.owner_id).single();
    if (error) {
        return "Error fetching user";
    }
    if(!data){
        return "User not found";
    }

    return data;
};