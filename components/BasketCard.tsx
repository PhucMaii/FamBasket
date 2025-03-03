import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Swipeable } from "react-native-gesture-handler";
import IconButton from "./IconButton";
import { EditIcon, Trash2Icon } from "lucide-react-native";
import { router } from "expo-router";
import { Basket } from "@/lib/supabase/config";

const BasketActions = ({ progress, onEdit, onDelete }: any) => {
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: 'clamp'
  })

  return (
    <View className="w-2/3 flex-row justify-end items-end">
      <Animated.View style={{transform: [{translateX}]}} className="bg-blue-500 text-white p-4 w-1/2 items-center rounded-l-xl">
        <IconButton className="bg-transparent" onPress={onEdit}>
          <EditIcon color="white" size={30} />
        </IconButton>
      </Animated.View>
      <Animated.View style={{transform: [{translateX}]}} className="bg-red-500 text-white p-4 w-1/2 items-center rounded-r-xl">
        <IconButton className="bg-transparent" onPress={onDelete}>
          <Trash2Icon color="white" size={30} />
        </IconButton>
      </Animated.View>
    </View>
  );
};

type Props = {
  basket: Basket;
  onEdit: () => void;
  onRemove: () => void;
};

const BasketCard = ({ basket, onEdit, onRemove }: Props) => {
  const directToBasket = () => {
    router.replace(`/basket-details/${basket.id}`);
  };


  // const handleDelete = async () => {
  //   try {
  //     await deleteBasket(basket.id);
  //     onRemoveItem(basket.id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Swipeable
      renderRightActions={(progress) => <BasketActions progress={progress} onEdit={onEdit} onDelete={onRemove} />}
      friction={2}
      overshootRight={false}
    >
      <TouchableOpacity onPress={directToBasket}>
        <View className="p-4 bg-primary-100 mt-4 rounded-xl border-2 border-gray">
          <Text className="text-2xl font-psemibold text-primary">
            {basket.name}
          </Text>
          <ProgressBar value={50} label={"10 / 20"} />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default BasketCard;
