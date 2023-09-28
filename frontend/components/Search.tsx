import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import tw from "../lib/tailwind";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const Search = () => {
  const { darkMode } = useSelector((state: RootState) => state.todo);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <View style={tw`mx-6 -mt-6`}>
      <View
        style={tw`relative px-4 h-12 rounded flex items-center justify-center shadow-lg ${
          !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
        }`}
      >
        <View style={tw`w-full flex flex-row items-center justify-center`}>
          <TextInput
            style={tw`bg-transparent flex-1 h-8 flex focus:outline-none pl-3 text-xs lg:text-lg ${
              !darkMode
                ? "text-darkest-grayish-blue"
                : "text-gray placeholder:text-white"
            }`}
            placeholder="Search todo..."
            placeholderTextColor="#7E7E7E"
            value={searchText}
            onChangeText={handleSearch}
          />
          <MagnifyingGlassIcon color="#aaa" style={tw`mr-2`} />
        </View>
      </View>
    </View>
  );
};

export default Search;
