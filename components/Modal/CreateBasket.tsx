import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import IconButton from "../IconButton";
import { CrossIcon, X } from "lucide-react-native";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateBasket = ({ open, onClose }: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-end">
        <View className="w-full bg-white px-4 pb-16 pt-8 shadow-offset shadow-lg">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl font-psemibold text-primary">
              New Basket
            </Text>
            <IconButton
              onPress={onClose}
              className="w-12 h-12 bg-transparent"
            >
              <X />
            </IconButton>
          </View>

          <FormField
            placeholder="Enter your name"
            type="text"
            name="name"
            value={""}
            onChangeText={() => {}}
            otherStyles="mt-4"
          />

          <CustomButton
            title="Add"
            onPress={() => {}}
            containerStyles="bg-primary mt-4"
            textStyles="text-white text-2xl font-psemibold"
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateBasket;
