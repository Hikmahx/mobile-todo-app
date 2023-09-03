import React, { useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import TodoItem from "../components/TodoItem";
import Loading from "./Loading";
import tw from "../lib/tailwind";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Bottom from "./Bottom";
import { todos } from "../todos.json";

const Todos = () => {
  const { darkMode, error, errMessage, total, filterTodos, loading } =
    useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  interface TodoItem {
    id: number;
    todo: string;
    completed: boolean;
  }

  if (error) {
    return (
      <View style={tw`mt-16`}>
        <Text style={tw`text-center`}>{errMessage}</Text>
        <Text style={tw`text-center`}>Please reload page</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 px-6`}>
      <View
        style={tw`mt-4 pb-6 relative px-4 w-full transition-colors rounded flex items-center justify-center shadow-lg ${
          !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
        }`}
      >
        {loading && (
          <View style={tw`flex justify-center mx-auto mt-6`}>
            <Loading />
          </View>
        )}

        <View style={tw`max-w-34rem mx-auto w-full`}>
          {todos.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}

          <View
            style={tw`w-full mt-7 flex flex-row items-center justify-between`}
          >
            <Text
              style={[
                tw`text-dark-grayish-blue text-xs text-center`,
                { fontFamily: "JosefinSans_700Bold" },
              ]}
            >
              {total} items left
            </Text>

            <TouchableOpacity
              // onPress={() => dispatch(clearCompleted)}
              style={tw``}
            >
              <Text
                style={[
                  tw`text-dark-grayish-blue text-xs text-center`,
                  { fontFamily: "JosefinSans_700Bold" },
                ]}
              >
                Clear Completed
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={tw` flex flex-col items-center relative transition-colors shadow-xl rounded`}
          ></View>
        </View>
      </View>
      <Bottom />
    </ScrollView>
  );
};

export default Todos;
