import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { logger } from "../logger";
import { Alert } from "react-native";
import { showToast } from "../toast";

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

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showToast("error", error.message);
      return;
    }

    showToast("success", "Signed in successfully");
  } catch (error: any) {
    logger("error", error.message);
    showToast("error", error.message);
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      showToast("error", error.message);
      return;
    }

    showToast("success", "Signed up successfully");
  } catch (error: any) {
    logger("error", error.message);
    showToast("error", error.message);
  }
};

export const signInWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      showToast("error", error.message);
    }

    showToast("success", "Signed in successfully");
  } catch (error: any) {
    logger("error", error.message);
    showToast("error", error.message);
  }
};

export const getUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  } catch (error: any) {
    logger("error", error.message);
    return { data: null, error };

  }
}