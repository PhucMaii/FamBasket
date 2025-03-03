import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ModalWrapper from "../ModalWrapper";
import { CircleX, EditIcon, Trash2Icon, UserPlus, X } from "lucide-react-native";
import IconButton from "@/components/IconButton";

type Props = {
  open: boolean;
  onClose: () => void;
};

const BasketActions = ({ open, onClose }: Props) => {
  return (
    <ModalWrapper open={open} onClose={onClose} position="end">
      <View className="flex gap-8">
        <View className="flex items-center flex-row justify-between">
          <Text className="text-black font-pbold text-2xl">Edit List</Text>
          <IconButton className="bg-gray-50" onPress={onClose}>
            <X size={20}  color="black"/>
          </IconButton>
        </View>
        <TouchableOpacity className="flex flex-row gap-8 items-center">
            <UserPlus size={30} color="gray" />
            <Text className="text-gray-700 font-psemibold text-xl">Share</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity className="flex flex-row gap-8 items-center">
            <EditIcon size={30} color="gray" />
            <Text className="text-gray-700 font-psemibold text-xl">Edit</Text>
        </TouchableOpacity> */}
        <TouchableOpacity className="flex flex-row gap-8 items-center">
            <Trash2Icon size={30} color="red" />
            <Text className="text-red-500 font-psemibold text-xl">Remove basket items</Text>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
};

export default BasketActions;
