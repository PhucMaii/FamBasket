import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import IconButton from "@/components/IconButton";
import { X } from "lucide-react-native";
import { Basket } from "@/lib/supabase/config";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { updateBasket } from "@/lib/supabase/baskets";
import { logger } from "@/lib/logger";
import { showToast } from "@/lib/toast";

type Props = {
  open: boolean;
  onClose: () => void;
  basket: Basket;
  onUpdateBasketUI: (item: any) => void;
};

const EditBasket = ({ open, onClose, basket, onUpdateBasketUI }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(basket?.name || "");

  useEffect(() => {
    setName(basket?.name || "");
  }, [basket]);

  const handleEditBasket = async () => {
    setIsLoading(true);
    try {
      const { data, error }: any = await updateBasket(basket.id, name);
      if (error) {
        showToast("error", error.message);
      }

      onUpdateBasketUI(data);
      setIsLoading(false);
      showToast("success", "Basket updated successfully");
    } catch (error: any) {
      showToast("error", error.message);
      logger("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose} position="end">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-2xl font-psemibold text-primary">
          Edit Basket
        </Text>
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
        onPress={handleEditBasket}
        containerStyles="bg-primary mt-4"
        textStyles="text-white text-2xl font-psemibold"
        isLoading={isLoading}
      />
    </ModalWrapper>
  );
};

export default EditBasket;
