'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export const getUserPortfolio = async () => {
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
     if (!user) {
        return redirect("/sign-in");
      }
    const {data,error} = await supabase.from('users').select('*').eq('id',user.id);
    if(error){
        return redirect("/sign-in");
    }
    
    const {data:portfolios,error:portfoliosError} = await supabase.from('portfolios').select('*').eq('owner_id',user.id).single();
    if(portfoliosError){
        console.log('ERROR ',portfoliosError.message)
    }
    
    if(!portfolios){
        return redirect("/protected/on-boarding");
    }
    return redirect("/protected/profile")
}