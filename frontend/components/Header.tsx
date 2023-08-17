import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import bgLight from "../assets/bg-mobile-light.jpg";
import bgDark from "../assets/bg-mobile-dark.jpg";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
// import tw from "../lib/tailwind";
import tw from "../lib/tailwind";
import Moon from "../assets/svg/icon-moon.svg";
import Sun from "../assets/svg/icon-sun.svg";
import { setDarkMode } from "../redux/reducers/todoSlice";

const Header = () => {
  const { darkMode } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={tw`w-full relative flex justify-center`}>
      <View style={tw`w-full relative flex justify-center inset-0`}>
        <Image source={darkMode ? bgLight : bgDark} style={tw`w-full`} />
      </View>
      <View
        style={tw`w-full max-w-xl mx-auto absolute flex flex-row items-center justify-between py-11 xl:py-16 px-6 lg:px-4`}
      >
        <Text
          style={[
            tw`uppercase text-white text-3xl tracking-wider`,
            { fontFamily: "JosefinSans_700Bold" },
          ]}
        >
          todo
        </Text>
        <View style={tw`flex items-center justify-center mb-3`}>
          {darkMode ? (
            <TouchableOpacity onPress={() => dispatch(setDarkMode(false))}>
              <Moon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => dispatch(setDarkMode(true))}>
              <Sun />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;
