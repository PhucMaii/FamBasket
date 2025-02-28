import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react-native";

type Props = {
  title?: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  otherStyles?: string;
  type?: string;
  [key: string]: any;
};

const FormField = ({
  title,
  value,
  placeholder,
  onChangeText,
  otherStyles,
  type,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title && <Text className="text-base text-gray-100 font-pmedium">{title}</Text>}

      <View className="w-full h-16 px-4 bg-gray rounded-2xl border-2 border-gray focus:border-primary flex flex-row items-center">
        <TextInput
          className="flex-1 text-primary font-psemibold text-base"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === "password" && !showPassword}
          {...props}
        />

        {type === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye style={{ outlineColor: "#9BA1A6" }} />
            ) : (
              <EyeOff style={{ outlineColor: "#9BA1A6" }} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
