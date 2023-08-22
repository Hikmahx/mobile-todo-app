import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { XMarkIcon } from "react-native-heroicons/outline";

const TagsInput = () => {
  const { darkMode } = useSelector((state: RootState) => state.todo);

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addTag = () => {
    if (newTag.trim() !== "" && newTag.length > 1) {
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setNewTag("");
    }
  };

  return (
    <View style={tw`mb-8 mt-4`}>
      <View
        style={tw`relative px-4 py-2 w-full rounded shadow-lg ${
          !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
        }`}
      >
        {/* {tags.length > 0 && ( */}
        <View style={tw`flex flex-row flex-wrap`}>
          {tags.map((tag, index) => (
            <View key={tag} style={tw`m-1`}>
              <View
                style={tw`px-3 py-1 flex flex-row items-center rounded-full ${
                  index % 2 == 0 ? "bg-purple" : "bg-blue"
                }`}
              >
                <Text style={tw`text-xs text-white lowercase`}>{tag}</Text>
                <TouchableOpacity
                  onPress={() => removeTag(tag)}
                  style={tw`ml-1`}
                >
                  <XMarkIcon style={tw`text-white`} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TextInput
            style={tw`bg-transparent lowercase flex-1 h-8 min-w-[40px] flex focus:outline-none pl-3 text-xs lg:text-lg focus:border 
            ${
              !darkMode
                ? "text-darkest-grayish-blue"
                : "text-gray placeholder:text-white"
            }
            `}
            value={newTag}
            onChangeText={setNewTag}
            onSubmitEditing={addTag}
            placeholder="Add a tag (optional)..."
            placeholderTextColor={`${darkMode ? "#fff" : "#333"}`}
          />
        </View>
        {/* )} */}
      </View>
    </View>
  );
};

export default TagsInput;
