import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
    onPress: any;
}


const IconButton = ({ children, className, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center ${className}`}
    >
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
