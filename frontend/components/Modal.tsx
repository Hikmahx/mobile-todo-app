import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import tw from "../lib/tailwind";
import Cross from "../assets/svg/icon-cross.svg";
import Form from "./Form";
import UpdateForm from "./UpdateForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PencilIcon } from "react-native-heroicons/outline";

const TodoModal = ({
  isVisible,
  closeModal,
  darkMode,
}: {
  isVisible: boolean;
  closeModal: any;
  darkMode: boolean;
}) => {
  const { update, item } = useSelector((state: RootState) => state.todo);

  return (
    <Modal
      isVisible={isVisible}
      style={tw`pb-6 relative px-4 flex-1 rounded flex items-center shadow-lg ${
        !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
      }`}
    >
      <View
        style={tw`h-16 w-16 p-2 bg-purple rounded-full shadow-lg flex items-center justify-center mb-6`}
      >
        {update ? (
          <>
            <PencilIcon style={tw`font-bold text-3xl text-white`} />
          </>
        ) : (
          <>
            <Text style={tw`font-bold text-3xl text-white`}>+</Text>
          </>
        )}
      </View>
      <TouchableOpacity onPress={closeModal} style={tw`absolute top-8 right-8`}>
        <Cross />
      </TouchableOpacity>

      <Text
        style={[
          tw`font-bold text-xl mt-4 mb-12 ${
            !darkMode ? "text-black" : "text-white"
          }`,
          { fontFamily: "JosefinSans_400Regular" },
        ]}
      >
        {update ? "Update" : "Add"} Todo
      </Text>
      {!update ? (
        <Form closeModal={closeModal} />
      ) : (
        <UpdateForm closeModal={closeModal} item={item} />
      )}
    </Modal>
  );
};

export default TodoModal;
