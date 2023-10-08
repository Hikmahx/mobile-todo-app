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
import { useMutation, useQuery } from "@apollo/client";
import {
  filterStatus,
  setFilterTodos,
  setTodos,
  totalTodo,
} from "../redux/reducers/todoSlice";
import { CLEAR_COMPLETED } from "../GraphQL/Mutations/todoMutations";

const Todos = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [
    clearCompleted,
    { loading: clearCompletedLoading, error: clearCompletedError },
  ] = useMutation(CLEAR_COMPLETED);

  const {
    darkMode,
    // error,
    errMessage,
    total,
    filterTodos,
    todos,
    filter
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

  const handleClearCompleted = async () => {
    await clearCompleted({
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  useEffect(() => {
    if (data) {
      dispatch(
        totalTodo(data.todos.filter((item: Data) => !item.completed).length)
      );
      dispatch(setTodos(data.todos));
      dispatch(setFilterTodos(data.todos));
      dispatch(filterStatus("all"));
    }
  }, [data, dispatch]);

  if (error) {
    console.log(error);

    return (
      <View style={tw`mt-16`}>
        <Text style={tw`text-center`}>{error.message}</Text>
        <Button title="Reload Data" onPress={() => refetch()} />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={tw`flex justify-center mx-auto mt-6`}>
        <Loading />
      </View>
    );
  }

  return (
    <>
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
            {filterTodos.length > 0 ? (
              <>
                {filterTodos.map((item: Data) => (
                  <TodoItem key={item.id} item={item} />
                ))}
              </>
            ) : (
              <View>
                <Text
                style={[
                  tw`text-dark-grayish-blue text-xs text-center mt-12 mb-8 `,
                  { fontFamily: "JosefinSans_700Bold" },
                ]}>
                  No {filter} items
                </Text>
              </View>
            )}

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
                onPress={() => handleClearCompleted()}
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
      {clearCompletedLoading && (
        <View
          style={tw`absolute inset-0 px-4 w-full rounded flex items-center justify-center`}
        >
          <Text
            style={[
              tw`text-xs text-center text-purple`,
              { fontFamily: "JosefinSans_700Bold" },
            ]}
          >
            Clearing Completed...
          </Text>
        </View>
      )}
    </>
  );
};

export default Todos;
