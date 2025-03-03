import { showToast } from "../toast";
import { supabase } from "./config"

export const getUserItems = async (userId: string) => {
    const { data, error } = await supabase.from("user_items").select("*").eq("userId", userId);

    if (error) {
        showToast("error", error.message);
        return { data: null, error };
    }

    return { data, error: null };
}