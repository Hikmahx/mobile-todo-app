import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import tw from "../lib/tailwind";
import Cross from "../assets/svg/icon-cross.svg";

const TodoModal = ({
  isVisible,
  closeModal,
  darkMode,
}: {
  isVisible: boolean;
  closeModal: any;
  darkMode: boolean;
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={tw`mt-4 pb-6 relative px-4 rounded flex items-center justify-center shadow-lg ${
        !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
      }`}
    >
      {/* <View> */}
      <TouchableOpacity onPress={closeModal} style={tw`absolute top-8 right-8`}>
        <Cross />
      </TouchableOpacity>
      {/* </View> */}
    </Modal>
  );
};

export default TodoModal;
