import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Divider from "@/components/Divider";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase/config";
import { logger } from "@/lib/logger";
import { signUpWithEmail } from "@/lib/supabase/auth";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // const handleSignUp = async () => {
  //   try {
  //     setIsLoading(true);
  //     await signUpWithEmail(email, password);
  //     setIsLoading(false);

  //   } catch (error: any) {
  //     logger('error', error.message);
  //   }
  // };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      await signUpWithEmail(email, password, username);
      setIsLoading(false);
    } catch (error: any) {
      logger("error", error.message);
      setIsLoading(false);
    }
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

          <Text className="text-3xl font-pbold text-primary mt-4">
            Sign up to FamBasket
          </Text>

          <FormField
            title="Username"
            placeholder="Enter your username"
            type="text"
            otherStyles="mt-8"
            value={username}
            onChangeText={(text: any) => setUsername(text)}
          />

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
            title="Sign up"
            onPress={handleSignup}
            containerStyles="bg-secondary mt-8"
            textStyles="text-primary text-xl"
          />

          <Divider otherStyles="my-4">Or</Divider>

          <CustomButton
            title="Login with Google"
            onPress={() => {}}
            containerStyles="bg-primary"
            textStyles="text-secondary text-xl"
          />

          <View className="flex flex-row items-center justify-center mt-4 gap-1">
            <Text className="text-gray-200">Have an account already?</Text>
            <Link className="text-primary font-psemibold " href="/sign-in">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
