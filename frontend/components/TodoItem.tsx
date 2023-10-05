import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import { todos } from "../todos.json";
import Check from "../assets/svg/icon-check.svg";
import Pencil from "../assets/svg/icon-pencil.svg";
import Cross from "../assets/svg/icon-cross.svg";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import CheckBtn from "./CheckBtn";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../GraphQL/Mutations/todoMutations";
import { GET_TODOS } from "../GraphQL/Queries/todoQueries";
import {
  setUpdate,
  curItem,
  setModalVisible,
} from "../redux/reducers/todoSlice";

const TodoItem = ({ item }: { item: any }) => {
  const { darkMode } = useSelector((state: RootState) => state.todo);

  const [deleteTodo] = useMutation(DELETE_TODO);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteTodo = () => {
    deleteTodo({
      variables: {
        id: item.id,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const displayUpdateModal = () => {
    console.log(item);
    dispatch(setUpdate(true));
    dispatch(curItem(item));
    dispatch(setModalVisible(true));
  };

  return (
    <View style={tw`w-full max-w-lg mx-auto`}>
      <View
        style={tw`relative flex flex-col h-auto py-4 border-b ${
          !darkMode
            ? "border-light-grayish-blue"
            : "border-dark-grayish-blue-dark"
        }`}
      >
        <View style={
          tw`relative flex flex-row items-center h-auto`
        }>
        <CheckBtn completed={item.completed} id={item.id} />

        <Text
          style={[
            tw`relative px-3 sm:max-w-sm first-letter:capitalize flex-wrap flex-1 flex
            ${
              item.completed
                ? (!darkMode? "line-through text-light-grayish-blue": "line-through text-very-dark-grayish-blue")
                : (!darkMode? "text-very-dark-grayish-blue": "text-light-grayish-blue")
            }
            `,
            { fontFamily: "JosefinSans_400Regular" },
          ]}
        >
          {item.todo.charAt(0).toUpperCase() + item.todo.slice(1)}
        </Text>
        <View style={tw`mr-4 flex flex-row justify-end items-center`}>
          <TouchableOpacity onPress={displayUpdateModal}>
            <Pencil style={tw`mr-2`} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeleteTodo}>
            <Cross />
          </TouchableOpacity>
        </View>
        </View>
        <View style={tw`flex flex-row flex-wrap mt-2 ml-8 ${item.tags.length > 0? '': "mb-1"}`}>
        {item.tags.map((tag: string, index: number) => (
          <View key={tag} style={tw`m-1`}>
            <View
              style={tw`px-3 py-1 flex flex-row items-center rounded-full ${
                index % 2 == 0 ? "bg-purple" : "bg-blue"
              }`}
            >
              <Text style={tw`text-xs text-white lowercase`}>{tag}</Text>
            </View>
          </View>
        ))}
      </View>
      </View>
    </View>
  );
};

export default TodoItem;
