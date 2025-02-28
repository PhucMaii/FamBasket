import { View, Text } from "react-native";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Swipeable } from "react-native-gesture-handler";
import IconButton from "./IconButton";
import { EditIcon, Trash2Icon } from "lucide-react-native";

const BasketActions = ({ height }: any) => {
  return (
    <View className="w-2/3 flex-row justify-end items-end">
      <View className="bg-blue-500 text-white p-4 w-1/2 items-center rounded-l-xl">
        <IconButton className="bg-transparent" onPress={() => {}}>
          <EditIcon color="white" size={30} />
        </IconButton>
      </View>
      <View className="bg-red-500 text-white p-4 w-1/2 items-center rounded-r-xl">
        <IconButton className="bg-transparent" onPress={() => {}}>
          <Trash2Icon color="white" size={30} />
        </IconButton>
      </View>
    </View>
  );
};

const BasketCard = () => {
  return (
    <Swipeable
      renderRightActions={() => <BasketActions />}
      onSwipeableOpen={() => {
        console.log("swiped");
      }}
    >
      <View className="p-4 bg-primary-100 mt-4 rounded-xl border-2 border-gray">
        <Text className="text-2xl font-psemibold text-primary">BasketCard</Text>
        <ProgressBar value={50} label={"10 / 20"} />
      </View>
    </Swipeable>
  );
};

export default BasketCard;
