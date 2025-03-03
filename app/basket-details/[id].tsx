import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import IconButton from "@/components/IconButton";
import { Activity, ArrowLeft, MoreVertical, Plus } from "lucide-react-native";
import BasketItemRow from "@/components/BasketItemRow";
import Divider from "@/components/Divider";
import { Basket } from "@/lib/supabase/config";
import { logger } from "@/lib/logger";
import { showToast } from "@/lib/toast";
import { getBasketById } from "@/lib/supabase/baskets";
import images from "@/constants/images";

const BasketDetails = () => {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    handleFetchBasket();
  }, [id]);

  const handleFetchBasket = async () => {
    setIsLoading(true);
    try {
      const basket = await getBasketById(Number(id));
      setBasket(basket.data);
    } catch (error: any) {
      logger("error", error.message);
      showToast("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle() {
            return (
              <View className="flex flex-row justify-start w-full">
                <Text className="text-2xl font-psemibold text-black text-left">
                  {basket?.name || ""}
                </Text>
              </View>
            );
          },
          headerLeft: () => (
            <IconButton
              onPress={() => router.replace("/baskets")}
              className="bg-transparent"
            >
              <ArrowLeft size={24} color="black" />
            </IconButton>
          ),
          headerRight: () => (
            <IconButton onPress={() => {}} className="bg-transparent">
              <MoreVertical size={24} color="gray" />
            </IconButton>
          ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerTintColor: "#fff",
        }}
      />
      <View className="h-full bg-white">
        <FlatList
          data={basket?.basket_items || []}
          renderItem={({ item }) => (
            <>
              <BasketItemRow />
              <Divider></Divider>
            </>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 mt-20 items-center justify-center">
              <Image source={images.emptyList} className="w-36 h-36" />
              <Text className="text-gray-400 text-xl text-center font-psemibold">
                Let's plan your first basket
              </Text>
            </View>
          )}
        />

        <View className="absolute bottom-20 right-4">
          <IconButton
            onPress={() => {}}
            className="bg-primary-100 w-20 h-20 shadow-lg"
          >
            <Plus color="#11441F" size={40} />
          </IconButton>
        </View>
      </View>
    </>
  );
};

export default BasketDetails;
