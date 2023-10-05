import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useForm, Controller } from "react-hook-form"; // Import React Hook Form

type TagsInputProps = {
  onTagsChange: (updatedTags: string[]) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagsInput = ({ onTagsChange, tags, setTags }: TagsInputProps) => {
  const { darkMode } = useSelector((state: RootState) => state.todo);

  const [newTag, setNewTag] = useState("");

  // const [tagError, setTagError] = useState<string | null>(null);

  const { control, handleSubmit, formState, setError, clearErrors } = useForm({
    mode: "onChange",
  });

  const { errors } = formState;

  // const validateTags = (value: string[]) => {
  //   if (value.length > 3) {
  //     setError("tags", {
  //       type: "manual",
  //       message: "You can only have up to 3 tags.",
  //     });
  //   } else {
  //     clearErrors("tags");
  //   }
  //   return value;
  // };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));

    clearErrors("tags");
  };

  const addTag = () => {
    if (newTag.trim() !== "") {
      if (newTag.length < 2) {
        setError("tags", {
          type: "validate",
          message: "Tag must be at least 2 characters long.",
        });
      } else if (newTag.length > 7) {
        setError("tags", {
          type: "validate",
          message: "Tag cannot be longer than 7 characters.",
        });
      } else if (tags.length >= 3) {
        setError("tags", {
          type: "validate",
          message: "You can only have up to 3 tags.",
        });
      } else {
        if (!tags.includes(newTag)) {
          setTags([...tags, newTag]);
        }
        setNewTag("");
        clearErrors("tags");
      }
    }
  };

  return (
    <View style={tw`mb-8 mt-4`}>
      <View
        style={tw`relative px-4 py-2 w-full rounded shadow-lg ${
          !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
        }`}
      >
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
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tw`relative bg-transparent lowercase flex-1 h-8 min-w-[40px] flex focus:outline-none pl-3 text-xs lg:text-lg focus:border 
            ${
              !darkMode
                ? "text-darkest-grayish-blue"
                : "text-gray placeholder:text-white"
            }
            `}
                value={newTag}
                onChangeText={(text) => {
                  onChange(text);
                  setNewTag(text);
                  clearErrors("tags");
                }}
                onSubmitEditing={addTag}
                onBlur={onBlur}
                placeholder="Add tags (optional), press Enter after each..."
                placeholderTextColor="#333"
              />
            )}
            name="tags"
            // rules={{ validate: validateTags }}
            defaultValue={tags}
          />
          {errors.tags && typeof errors.tags.message === "string" && (
            <Text
              style={tw`absolute -bottom-6 left-0 text-red-500 text-xs italic`}
            >
              {errors.tags.message}
            </Text>
          )}
          {/* {tagError && (
            <Text style={tw`text-red-500 text-xs italic mt-1`}>{tagError}</Text>
          )} */}
        </View>
      </View>
    </View>
  );
};

export default TagsInput;
