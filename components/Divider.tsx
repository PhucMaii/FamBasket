import { View, Text } from "react-native";
import React from "react";

type Props = {
    children?: string;
    otherStyles?: string;
}

const Divider = ({ children, otherStyles }: Props) => {
  return (
    <View className={`flex-row items-center justify-center ${children && "gap-4"} ${otherStyles}`}>
      <View className="h-0.5 w-full bg-gray"></View>
      {children && <Text className="text-gray-200 font-pregular">{children}</Text>}
      <View className="h-0.5 w-full bg-gray"></View>
    </View>
  );
};

export default Divider;
