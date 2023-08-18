import React, { useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import TodoItem from "../components/TodoItem";
import Loading from "./Loading";
import tw from "../lib/tailwind";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Bottom from "./Bottom";

const Todos = () => {
  const { darkMode, todos, error, errMessage, total, filterTodos, loading } =
    useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   totalTodo();
  //   setfilterTodos(todos);
  // }, [todos]);

  // useEffect(() => {
  //   dragItem();
  // }, []);

  if (error) {
    return (
      <View style={tw`mt-16`}>
        <Text style={tw`text-center`}>{errMessage}</Text>
        <Text style={tw`text-center`}>Please reload page</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`mx-6`}>
      <View
        style={tw`mt-4 py-4 pb-6 relative px-4 w-full transition-colors rounded flex items-center justify-center shadow-lg ${
          !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
        }`}
      >
        {loading && (
          <View style={tw`flex justify-center mx-auto mt-6`}>
            <Loading />
          </View>
        )}

        <View
          //  style={tw`h-40  relative px-4 w-full h-12 transition-colors rounded flex items-center justify-center shadow-lg ${
          //     !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
          //   }`}
          style={tw`max-w-34rem mx-auto w-full`}
        >
          <TodoItem />

          <View style={tw`w-full mt-7 flex flex-row items-center justify-between`}>
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
          >
            {/* {filterTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))} */}
          </View>
        </View>
      </View>
      <Bottom />
    </ScrollView>
  );
};

export default Todos;
