import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://auhhmjgbkefnvmklydhm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1aGhtamdia2VmbnZta2x5ZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2ODU5ODQsImV4cCI6MjA1NjI2MTk4NH0.v82DUpKz4iFEpipFEu1OjPqCbNltoz39hYycBVg9neI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Basket = {
  id: number;
  name: string;
  created_at: string;
  basket_items: BasketItem[];
};

export type BasketItem = {
  id: number;
  basketId: number;
  baseItemId: number;
  price: number;
  quantity: number;
  name: string;
  created_at: string;
}