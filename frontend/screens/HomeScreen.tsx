import { ScrollView, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";
import Form from "../components/Form";
import CheckBtn from "../components/CheckBtn";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TodoItem from "../components/TodoItem";
import Todos from "../components/Todos";
import TodoModal from "../components/Modal";

const HomeScreen = () => {
  const { darkMode } = useSelector((state: RootState) => state.todo);

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    // <ScrollView
    <View
      style={tw`relative min-h-full ${
        !darkMode ? "bg-gray" : "bg-very-dark-blue"
      }`}
    >
      <View style={tw` ${!darkMode ? "bg-gray" : "bg-very-dark-blue"}`}>
        <Header />
        <Form />
      </View>
      {/* <TodoItem */}

      <View style={tw`h-full flex-1`}>
        <Todos />
      </View>

      <Pressable
        style={tw`h-12 w-12 p-2 bg-purple rounded-full absolute bottom-8 left-8 shadow-lg flex items-center justify-center`}
        onPress={openModal}
        >
        <Text style={tw`font-bold text-xl text-white`}>+</Text>
      </Pressable>
      <TodoModal isVisible={isModalVisible} closeModal={closeModal} darkMode={darkMode} />


    </View>
    // </ScrollView>
  );
};

export default HomeScreen;
