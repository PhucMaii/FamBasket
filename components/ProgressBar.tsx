import { View, Text } from "react-native";
import React from "react";

type Props = {
    value: number;
    label: string;
}

const ProgressBar = ({ value, label }: Props) => {
  return (
    <View className="flex w-full flex-row items-center gap-1">
      <View className="flex-[5] w-full h-3 bg-gray rounded-full overflow-hidden">
        <View
          style={{ width: `${value}%` }}
          className="h-full bg-green-200 rounded-full"
        />
      </View>
      <Text className="flex-[1] text-gray-100 font-psemibold">{label}</Text>
    </View>
  );
};

export default ProgressBar;
