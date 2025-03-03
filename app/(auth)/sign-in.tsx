import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Divider from "@/components/Divider";
import { Link, router } from "expo-router";
import { signInWithEmail, signInWithGoogle } from "@/lib/supabase/auth";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    setIsLoading(true);
    await signInWithEmail(email, password);
    router.replace("/baskets");
    setIsLoading(false);
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="flex-1 px-4 justify-center w-full h-full">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-36 h-36"
          />

          <Text className="text-3xl font-pbold text-black mt-4">
            Login to FamBasket
          </Text>

          <FormField
            title="Email"
            placeholder="Enter your email"
            type="email"
            otherStyles="mt-8"
            value={email}
            onChangeText={(text: any) => setEmail(text)}
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            type="password"
            otherStyles="mt-8"
            value={password}
            onChangeText={(text: any) => setPassword(text)}
          />

          <CustomButton
            isLoading={isLoading}
            title="Login"
            onPress={handleLogin}
            containerStyles="bg-secondary mt-8"
            textStyles="text-primary text-xl"
          />

          <Divider otherStyles="my-4">Or</Divider>

          <CustomButton
            title="Login with Google"
            onPress={signInWithGoogle}
            containerStyles="bg-primary"
            textStyles="text-secondary text-xl"
          />

          <View className="flex flex-row items-center justify-center mt-4 gap-1">
            <Text className="text-gray-200">Don't have an account yet?</Text>
            <Link className="text-primary font-psemibold " href="/sign-up">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
