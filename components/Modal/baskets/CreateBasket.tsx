import { View, Text, Modal, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "../../FormField";
import CustomButton from "../../CustomButton";
import IconButton from "../../IconButton";
import { CrossIcon, X } from "lucide-react-native";
import { logger } from "@/lib/logger";
import { createBasket } from "@/lib/supabase/baskets";
import ModalWrapper from "../ModalWrapper";
import Toast from "react-native-toast-message";
import { showToast } from "@/lib/toast";

type Props = {
  open: boolean;
  onClose: () => void;
  onAddBasketUI: (item: any) => void;
};

const CreateBasket = ({ open, onClose, onAddBasketUI }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const handleAddBasket = async () => {
    setIsLoading(true);
    try {
      const { newBasket, error }: any = await createBasket(name);

      if (error) {
        Alert.alert("Error", error.message);
      }

      setIsLoading(false);

      onAddBasketUI(newBasket);
      showToast('success', 'New basket created successfully');
    } catch (error: any) {
      Alert.alert("Error", error.message);
      logger("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose} position="end">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-2xl font-psemibold text-black">New Basket</Text>
        <IconButton onPress={onClose} className="w-12 h-12 bg-transparent">
          <X />
        </IconButton>
      </View>

      <FormField
        placeholder="Enter your name"
        type="text"
        name="name"
        value={name}
        onChangeText={(text: string) => setName(text)}
        otherStyles="mt-4"
      />

      <CustomButton
        title="Add"
        onPress={handleAddBasket}
        containerStyles="bg-primary mt-4"
        textStyles="text-white text-2xl font-psemibold"
        isLoading={isLoading}
      />
    </ModalWrapper>
  );
};

export default CreateBasket;
