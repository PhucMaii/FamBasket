import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LandingImg from "../assets/images/landingImg.png";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const LandingScreen = () => {
  return (
    <View className="bg-primary-100" style={{ height: "100%", width: "100%" }}>
      <View style={{ height: "80%" }}>
        <Image
          source={LandingImg}
          style={{ height: "100%" }}
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 items-center mt-4 gap-2">
        <Text className="text-2xl font-pbold text-primary text-center">
          Bring Family Closer Together
        </Text>
        <Text className="text-lg font-pregular text-primary text-center">
          One list at a time with FamBasket
        </Text>

        <CustomButton
          title="Let's get started"
          onPress={() => router.push("/sign-up")}
          containerStyles="mb-4 px-4 py-2 min-w-[300px]"
          textStyles="text-xl"
        />
      </View>
    </View>
  );
};

export default LandingScreen;
