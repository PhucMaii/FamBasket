import { View, Text } from "react-native";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import CustomButton from "../CustomButton";

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
  textStyles?: string;
  type?: "error" | "success";
  onSubmit: any;
};

const ConfirmModal = ({ open, onClose, message, textStyles, type, onSubmit }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        await onSubmit();
        setIsLoading(false);
    }

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Text className={`text-2xl font-psemibold ${textStyles}`}>{message}</Text>
      <View className="flex flex-row items-center justify-between gap-2">
        <CustomButton
          title="Confirm"
          onPress={handleConfirm}
          containerStyles={`bg-white p-2 w-1/2 border-${
            type === "error" ? "red" : "green"
          }`}
          textStyles={`text-xl ${
            type === "error" ? "text-red-500" : "text-green-500"
          }`}
          isLoading={isLoading}
        />
        <CustomButton
          title="Cancel"
          onPress={onClose}
          containerStyles={`p-2 w-1/2 ${
            type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
          textStyles="text-white text-xl"
        />
      </View>
    </ModalWrapper>
  );
};

export default ConfirmModal;
