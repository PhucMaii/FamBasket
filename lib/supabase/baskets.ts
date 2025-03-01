import { getUser } from "./auth";
import { supabase } from "./config";

export const createBasket = async (name: string) => {
    // Create basket
    const { data: newBasket, error: newBasketError }: any = await supabase.from("baskets").insert({ name }).select("*");
    
    if (newBasketError) {
        return { data: null, error: newBasketError };
    }

    console.log(newBasket[0].id, 'newBasket');

    const {data: user} = await getUser();
    
    if (!user) {    
        return { data: null, error: 'User not found' };
    }
    
    const userId = user.user?.id;
    
    // Connect basket to user
    const { error } = await supabase.from('users_baskets').insert({userId: userId, basketId: newBasket[0].id}).select("*");
    

    // Return basket
    return { newBasket: newBasket[0], error };
};

export const getBaskets = async () => {
    const { data: user, error: userError } = await getUser();

    if (!user) {
        return { data: null, error: userError };
    }

    const userId = user.user?.id;

    if (!userId) {
        return { data: null, error: 'User Id not found' };
    }

    const { data: userBaskets, error: userBasketsError } = await supabase.from("users_baskets").select("*").eq("userId", userId);

    if (userBasketsError) {
        return { data: null, error: userBasketsError };
    }

    const baskets = userBaskets.map((baskets) => baskets.basketId);
    const { data: basketsData, error: basketsError } = await supabase.from("baskets").select("*").in("id", baskets);

    if (basketsError) {
        return { data: null, error: basketsError };
    }

    return { data: basketsData, error: null };
}

export const updateBasket = async (basketId: number, name: string) => {
    const { data, error } = await supabase.from("baskets").update({ name }).eq("id", basketId).select("*");

    if (!data || error) {
        return { data: null, error };
    }

    return { data: data[0], error };
}

export const deleteBasket = async (basketId: number) => {
    const { data, error } = await supabase.from("baskets").delete().eq("id", basketId);
    

    if (!data || error) {
        console.log(error, 'error deleting basket');
        return { data: null, error };
    }

    return { data: data[0], error };
}