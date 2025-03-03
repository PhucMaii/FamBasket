import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onPress: any;
  badgeCount?: number;
  badgeStyles?: string;
};

const IconButton = ({ children, className, onPress, badgeCount = 0, badgeStyles }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-12 h-12 rounded-full flex items-center justify-center ${className}`}
    >
      {children}

      {badgeCount > 0 && (
        <View className={`absolute -top-2 left-16 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center ${badgeStyles}`}>
          <Text className="text-lg font-bold text-white">{badgeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
