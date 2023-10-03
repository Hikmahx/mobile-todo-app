import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Check from "../assets/svg/icon-check.svg";
import tw from "../lib/tailwind";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useMutation } from "@apollo/client";
import { UPDATE_TODO } from "../GraphQL/Mutations/todoMutations";
import { GET_TODOS } from "../GraphQL/Queries/todoQueries";

interface CheckBtnProps {
  completed: boolean;
  id?: any;
}

const CheckBtn = ({ completed, id }: CheckBtnProps) => {
  // const [completed, setCompleted] = useState(false);
  const { darkMode } = useSelector((state: RootState) => state.todo);
  const [updateTodo] = useMutation(UPDATE_TODO);

  const handleUpdateTodo = (id: any) => {
    updateTodo({
      variables: {
        id: id,
        completed: !completed,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };
  return (
    <View>
      {completed ? (
        <Pressable
          onPress={() => {
            id && handleUpdateTodo(id);
          }}
        >
          <View
            style={tw`w-2 h-2 p-3 rounded-full flex items-center justify-center ${
              !darkMode ? "bg-[#dfdfdf]" : "bg-[#6f6f6f]"
            }`}
          >
            <View
              style={tw`w-1 h-1 p-2.5 rounded-full ${
                !darkMode ? " bg-gray " : "bg-very-dark-desaturated-blue"
              } `}
            ></View>
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            id && handleUpdateTodo(id);
          }}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#57ddff", "#c058f3"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[tw`flex items-center justify-center`, styles.button]}
          >
            <Check />
          </LinearGradient>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    width: 8,
    height: 8,
    alignItems: "center",
    borderRadius: 9999,
  },
});

export default CheckBtn;
