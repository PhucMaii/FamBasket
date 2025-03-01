import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Swipeable } from "react-native-gesture-handler";
import IconButton from "./IconButton";
import { EditIcon, Trash2Icon } from "lucide-react-native";
import { router } from "expo-router";
import { Basket } from "@/lib/supabase/config";
import { deleteBasket } from "@/lib/supabase/baskets";

const BasketActions = ({ onEdit, onDelete }: any) => {
  return (
    <View className="w-2/3 flex-row justify-end items-end">
      <View className="bg-blue-500 text-white p-4 w-1/2 items-center rounded-l-xl">
        <IconButton className="bg-transparent" onPress={onEdit}>
          <EditIcon color="white" size={30} />
        </IconButton>
      </View>
      <View className="bg-red-500 text-white p-4 w-1/2 items-center rounded-r-xl">
        <IconButton className="bg-transparent" onPress={onDelete}>
          <Trash2Icon color="white" size={30} />
        </IconButton>
      </View>
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
      renderRightActions={() => <BasketActions onEdit={onEdit} onDelete={onRemove} />}
      onSwipeableOpen={() => {
        console.log("swiped");
      }}
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
