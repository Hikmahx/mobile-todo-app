import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";
import { setDarkMode } from "../redux/reducers/todoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Check from "../assets/svg/icon-check.svg";
import CheckBtn from "./CheckBtn";

const Form = () => {
  const { darkMode } = useSelector((state: RootState) => state.todo);
  const [input, setInput] = useState("");

  const inputTodo = (text: string) => {
    setInput(text);
  };

  const submitTodo = () => {
    // Implement your submit logic here
  };

  return (
    <View style={tw`mx-6`}>
      <View
        style={tw`-mt-6 relative px-4 w-full h-12 transition-colors rounded flex items-center justify-center shadow-lg ${
          !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
        }`}
      >
        {/* <View style={tw`w-full mx-5 `}> */}
        <View style={tw`w-full flex flex-row items-center justify-center`}>
          <CheckBtn/>
          <TextInput
            onChangeText={inputTodo}
            value={input}
            style={tw`bg-transparent flex-1 h-8 flex focus:outline-none pl-3 text-xs lg:text-lg ${
              !darkMode
                ? "text-darkest-grayish-blue"
                : "text-gray placeholder:text-white"
            }`}
            placeholder="Create a new todo..."
            placeholderTextColor={`${darkMode ? "#fff" : "#333"}`}
          />
        </View>
        {/* </View> */}
      </View>
    </View>
  );
};

export default Form;
