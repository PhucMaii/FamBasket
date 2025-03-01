import { View, Text, Modal } from "react-native";
import React from "react";

type Props = {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    className?: string;
    modalProps?: any;
    position?: "start" | "center" | "end";
}

const ModalWrapper = ({ children, open, onClose, className, modalProps, position }: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
      {...modalProps}
    >
      <View className={`flex-1 items-center justify-${position ? position : "center"}`}>
        <View className={`w-full bg-white px-4 pb-16 pt-8 shadow-offset shadow-lg ${className}`}>
            {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalWrapper;
