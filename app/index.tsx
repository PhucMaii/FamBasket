import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LandingImg from "../assets/images/landingImg.png";
import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import images from "@/constants/images";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase/config";

const LandingScreen = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (session) {
    return <Redirect href="/baskets" />;
  }

  return (
    <View className="bg-primary-100" style={{ height: "100%", width: "100%" }}>
      <View style={{ height: "60%" }}>
        <Image
          source={LandingImg}
          style={{ height: "100%" }}
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 mt-4 items-center gap-8">
        <Image
          source={images.logo}
          className="w-36 h-36"
          resizeMode="contain"
        />

        <View>
          <Text className="text-2xl font-pbold text-primary text-center">
            Bring Family Closer Together
          </Text>
          <Text className="text-lg font-pregular text-primary text-center">
            One list at a time with FamBasket
          </Text>
        </View>

        <CustomButton
          title="Let's get started"
          onPress={() => router.push("/sign-in")}
          containerStyles="bg-secondary mb-4 px-4 py-2 min-w-[300px]"
          textStyles="text-xl"
        />

        <CustomButton
          title="Log out"
          onPress={() => supabase.auth.signOut()}
          containerStyles="bg-secondary mb-4 px-4 py-2 min-w-[300px]"
          textStyles="text-xl"
        />
      </View>
    </View>
  );
};

export default LandingScreen;
