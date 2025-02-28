import { View, Text } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

const BasketCard = () => {
  return (
    <View className="p-4 bg-primary-100 mt-4 rounded-xl border-2 border-gray">
      <Text className="text-2xl font-psemibold text-primary">BasketCard</Text>


      <ProgressBar value={50} label={"10 / 20"} />

      
    </View>
  );
};

export default BasketCard;
