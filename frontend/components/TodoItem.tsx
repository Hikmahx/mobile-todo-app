import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import { todos } from "../todos.json";
import Check from "../assets/svg/icon-check.svg";
import Pencil from "../assets/svg/icon-pencil.svg";
import Cross from "../assets/svg/icon-cross.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CheckBtn from "./CheckBtn";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../GraphQL/Mutations/todoMutations";
import { GET_TODOS } from "../GraphQL/Queries/todoQueries";

const TodoItem = ({ item }: { item: any }) => {
  const { darkMode } = useSelector((state: RootState) => state.todo);

  const [deleteTodo] = useMutation(DELETE_TODO);

  const handleDeleteTodo = () => {
    deleteTodo({
      variables: {
        id: item.id,
      },
    refetchQueries: [{ query: GET_TODOS }],
    });
  };

  return (
    <View style={tw`w-full max-w-lg mx-auto`}>
      <View
        style={tw`relative flex flex-row items-center h-auto py-4 border-b ${
          !darkMode
            ? "border-light-grayish-blue"
            : "border-dark-grayish-blue-dark"
        }`}
      >
        <CheckBtn />

        <Text
          style={[
            tw`relative px-3 sm:max-w-sm first-letter:capitalize flex-wrap flex-1 flex
            ${
              item.completed
                ? "line-through text-light-grayish-blue"
                : "text-very-dark-grayish-blue"
            }
            `,
            { fontFamily: "JosefinSans_400Regular" },
          ]}
        >
          {item.todo.charAt(0).toUpperCase() + item.todo.slice(1)}
        </Text>
        <View style={tw`mr-4 flex flex-row justify-end items-center`}>
          <Pencil style={tw`mr-2`} />
          <TouchableOpacity onPress={handleDeleteTodo}>
            <Cross />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TodoItem;
