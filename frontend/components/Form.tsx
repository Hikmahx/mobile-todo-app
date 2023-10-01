import {
  View,
  ScrollView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";
import { setDarkMode } from "../redux/reducers/todoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Check from "../assets/svg/icon-check.svg";
import CheckBtn from "./CheckBtn";
import TagsInput from "./TagsInput";
import { useForm, Controller } from "react-hook-form"; // Import React Hook Form

type FormData = {
  todo: string;
  tags: string[];
};

const Form = () => {
  const { darkMode } = useSelector((state: RootState) => state.todo);
  const [input, setInput] = useState("");

  const inputTodo = (text: string) => {
    setInput(text);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <View style={tw`mx-6 w-full`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        // style={tw`flex-1 mt-16`}
      >
        <View
          style={tw`relative px-4 w-full h-12 rounded flex items-center justify-center shadow-lg ${
            !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
          }`}
        >
          {/* <View style={tw`w-full mx-5 `}> */}
          <View
            style={tw`relative w-full flex flex-row items-center justify-center`}
          >
            <CheckBtn />
            <Controller
              control={control}
              rules={{
                required: "Todo is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  // onChangeText={inputTodo}
                  // value={input}
                  style={tw`bg-transparent flex-1 h-8 flex focus:outline-none pl-3 text-xs lg:text-lg ${
                    !darkMode
                      ? "text-darkest-grayish-blue"
                      : "text-gray placeholder:text-white"
                  }`}
                  selectionColor={"#146BFB"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  accessibilityLabel="Todo"
                  accessibilityHint="Enter todo item"
                  placeholder="Create a new todo..."
                  placeholderTextColor={`${darkMode ? "#fff" : "#333"}`}
                />
              )}
              name="todo"
              // defaultValue=""
            />
            {errors.todo && (
              <Text style={[tw`text-red-500 mt-1`, { fontStyle: "italic" }]}>
                {errors.todo.message}
              </Text>
            )}
          </View>
          {/* </View> */}
        </View>
        <TagsInput 
        // control={control} errors={errors} 
        />

        <View style={tw`w-full mb-4`}>
          <TouchableOpacity
            style={tw`bg-blue px-4 py-2 rounded-md w-full max-w-md mt-8 mx-auto`}
            onPress={handleSubmit(onSubmit)}
            accessibilityRole="button"
            accessibilityLabel="Register"
          >
            <Text
              style={[
                tw`text-white font-bold text-center text-lg`,
                { fontFamily: "JosefinSans_700Bold" },
              ]}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Form;
