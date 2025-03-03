import { ITEM_STATUS } from "@/enum/item";
import { showToast } from "../toast";
import { supabase, UserItem } from "./config";

export const getUserItems = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_items")
    .select("*")
    .eq("userId", userId);

  if (error) {
    showToast("error", error.message);
    return { data: null, error };
  }

  return { data, error: null };
};

export const addUserItemsToBasket = async (
  basketId: number,
  userItems: UserItem[]
) => {
  const userItemsWithBasketId = userItems.map((item) => ({
    basketId: basketId,
    baseItemId: item.id,
    name: item.name,
    status: ITEM_STATUS.PENDING,
    quantity: item.quantity || 0,
    price: item?.price || 0,
  }));

  const { data, error } = await supabase
    .from("basket_items")
    .insert(userItemsWithBasketId);

  if (error) {
    showToast("error", error.message);
    return { data: null, error };
  }

  return { data, error: null };
};
