import { View, Text, FlatList } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import IconButton from "@/components/IconButton";
import { ArrowLeft, MoreVertical } from "lucide-react-native";
import BasketItemRow from "@/components/BasketItemRow";
import Divider from "@/components/Divider";

const BasketDetails = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle() {
            return (
              <View className="flex flex-row justify-start w-full">
                <Text className="text-2xl font-psemibold text-primary text-left">
                  Superstore
                </Text>
              </View>
            );
          },
          headerLeft: () => (
            <IconButton
              onPress={() => router.replace("/baskets")}
              className="bg-transparent"
            >
              <ArrowLeft size={24} color="#11441F" />
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
          data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
          renderItem={({ item }) => (
            <>
                <BasketItemRow />
                <Divider></Divider>
            </>
        )}
        />
      </View>
    </>
  );
};

export default BasketDetails;
