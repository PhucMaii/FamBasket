import { View, Text, Animated } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { EditIcon, ShoppingBasketIcon, Trash2Icon } from "lucide-react-native";
import { Swipeable } from "react-native-gesture-handler";
import { BasketItem } from "@/lib/supabase/config";

const ActionButtons = ({ progress }: any) => {
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-row w-1/2 items-center">
      <Animated.View
        style={{ transform: [{ translateX }] }}
        className="bg-red-500 text-white p-4 w-1/3 items-center rounded-l-xl"
      >
        <IconButton className="bg-transparent" onPress={() => {}}>
          <Trash2Icon color="white" size={30} />
        </IconButton>
      </Animated.View>
      <Animated.View
        style={{ transform: [{ translateX }] }}
        className="bg-blue-500 text-white p-4 w-1/3 items-center"
      >
        <IconButton className="bg-transparent" onPress={() => {}}>
          <EditIcon color="white" size={30} />
        </IconButton>
      </Animated.View>
      <Animated.View
        style={{ transform: [{ translateX }] }}
        className="bg-green-500 text-white p-4 w-1/3 items-center rounded-r-xl"
      >
        <IconButton className="bg-transparent" onPress={() => {}}>
          <ShoppingBasketIcon color="white" size={30} />
        </IconButton>
      </Animated.View>
    </View>
  );
};

type Props = {
  item: BasketItem;
};

const BasketItemRow = ({ item }: Props) => {
  const handleFullSwipeRight = () => {
    console.log("Full swipe right");
  };

  return (
    <Swipeable renderRightActions={(progress) => <ActionButtons progress={progress}  />}>
      <View className="w-full p-4 flex ietms-center flex-column gap-4 justify-between">
        <View className="px-4 w-full flex-row items-center justify-between">
          <Text className="flex-[5] text-lg font-pmedium">{item.name}</Text>
          <Text className="flex-[5] text-md font-pmedium text-gray-100 text-right">
            {item.quantity}
          </Text>

          {/* Action buttons */}
        </View>
      </View>
    </Swipeable>
  );
};

export default BasketItemRow;
