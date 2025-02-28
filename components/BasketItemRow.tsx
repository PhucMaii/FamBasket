import { View, Text } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { EditIcon, ShoppingBasketIcon, Trash2Icon } from "lucide-react-native";
import { Swipeable } from "react-native-gesture-handler";

const ActionButtons = () => {
  return (
    <View className="flex-row w-1/2 items-center">
      <View className="bg-red-500 text-white p-4 w-1/3 items-center rounded-l-xl">
        <IconButton className="bg-transparent" onPress={() => {}}>
          <Trash2Icon color="white" size={30} />
        </IconButton>
      </View>
      <View className="bg-blue-500 text-white p-4 w-1/3 items-center">
        <IconButton className="bg-transparent" onPress={() => {}}>
          <EditIcon color="white" size={30} />
        </IconButton>
      </View>
      <View className="bg-green-500 text-white p-4 w-1/3 items-center rounded-r-xl">
        <IconButton className="bg-transparent" onPress={() => {}}>
          <ShoppingBasketIcon color="white" size={30} />
        </IconButton>
      </View>
    </View>
  );
};

const BasketItemRow = () => {
  const handleFullSwipeRight = () => {
    console.log("Full swipe right");
  };

  return (
    <Swipeable renderRightActions={ActionButtons}>
      <View className="w-full p-4 flex ietms-center flex-column gap-4 justify-between">
        <View className="w-full flex-row items-center justify-between">
          <Text className="flex-[5] text-lg font-pmedium">milk</Text>
          {/* Action buttons */}
        </View>
      </View>
    </Swipeable>
  );
};

export default BasketItemRow;
