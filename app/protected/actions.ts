'use server'

import { Portfolio } from "@/types/app.types"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { getUserData } from "../actions"

export const getUserPortfolio = async ():Promise<Portfolio|null> => {
    const supabase = await createClient()
    const userData = await getUserData();
    if(!userData){
        return redirect("/sign-in");

    }
    const {data:portfolios,error:portfoliosError} = await supabase.from('portfolios').select('*').eq('owner_id',userData.id).single();
    if(portfoliosError){
        console.log('ERROR ',portfoliosError.message)
    }
    
    if(!portfolios){
        return redirect("/protected/on-boarding");
    }
    return redirect("/protected/profile")
}
export const getPortfolio = async ():Promise<Portfolio|null> => {
    const supabase = await createClient()
    const userData = await getUserData();
    if(!userData){
        return redirect("/sign-in");

    }
    const {data:portfolios,error:portfoliosError} = await supabase.from('portfolios').select('*').eq('owner_id',userData.id).single();
    if(portfoliosError){
        console.log('ERROR ',portfoliosError.message)
    }
    
    if(!portfolios){
        return redirect("/protected/on-boarding");
    }
    return portfolios
}