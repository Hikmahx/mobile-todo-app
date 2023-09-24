import React, { useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import TodoItem from "../components/TodoItem";
import Loading from "./Loading";
import tw from "../lib/tailwind";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Bottom from "./Bottom";
import { todos } from "../todos.json";
import { GET_TODOS } from "../GraphQL/Queries/todoQueries";
import { useQuery } from "@apollo/client";

const Todos = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  const {
    darkMode,
    // error,
    errMessage,
    total,
    filterTodos,
    //  loading
  } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  interface TodoItem {
    id: number;
    todo: string;
    completed: boolean;
  }

  interface Data {
    id: number;
    todo: string;
    completed: boolean;
  }
  [];

  if (error) {
    console.log(error);

    return (
      <View style={tw`mt-16`}>
        <Text style={tw`text-center`}>{error.message}</Text>
        <Button title="Reload Data" onPress={() => refetch()} />
      </View>
    );
  }

  if ( loading ) {
    return (
      <View style={tw`flex justify-center mx-auto mt-6`}>
        <Loading />
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 px-6`}>
      <View
        style={tw`mt-4 pb-6 relative px-4 w-full   rounded flex items-center justify-center shadow-lg ${
          !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
        }`}
      >
        {/* {loading && (
          <View style={tw`flex justify-center mx-auto mt-6`}>
            <Loading />
          </View>
        )} */}

        <View style={tw`max-w-34rem mx-auto w-full`}>
          {data.todos.map((item: Data) => (
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
            style={tw` flex flex-col items-center relative shadow-xl rounded`}
          ></View>
        </View>
      </View>
      <Bottom />
    </ScrollView>
  );
};

export default Todos;
