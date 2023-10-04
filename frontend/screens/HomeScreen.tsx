import { ScrollView, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";
import Search from "../components/Search";
import CheckBtn from "../components/CheckBtn";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import TodoItem from "../components/TodoItem";
import Todos from "../components/Todos";
import TodoModal from "../components/Modal";
import { setModalVisible, setUpdate } from "../redux/reducers/todoSlice";

const HomeScreen = () => {
  const { darkMode, isModalVisible } = useSelector((state: RootState) => state.todo);

  const dispatch = useDispatch<AppDispatch>();

  const openModal = () => {
    dispatch(setModalVisible(true));
  };

  const closeModal = () => {
    dispatch(setModalVisible(false));
    dispatch(setUpdate(false));
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
        <Search />
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
