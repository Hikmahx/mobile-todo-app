import React, { useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import TodoItem from "../components/TodoItem";
import Loading from "./Loading";
import tw from "../lib/tailwind";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

const Bottom = () => {
  const { darkMode, todos, error, errMessage, total, filterTodos, loading } =
    useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View>
      <View
        style={tw`mt-4 py-4 relative px-4 w-full transition-colors rounded flex items-center justify-center shadow-lg ${
          !darkMode ? "bg-white" : "bg-very-dark-desaturated-blue"
        }`}
      >
        <View style={tw`flex items-center justify-between w-full`}>
          {/* {todos.length > 0 ? ( */}

          {/* <View style={tw`mx-auto mt-6`}> */}
          <View style={tw`flex flex-row justify-center mx-auto`}>
            <View style={tw`w-full flex flex-row items-center justify-center`}>
              <TouchableOpacity
                // onPress={() => dispatch(displayAll)}
                style={tw`mx-3 `}
              >
                <Text
                  style={[
                    tw`text-sm text-center text-bright-blue`,
                    { fontFamily: "JosefinSans_700Bold" },
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => dispatch(displayActive)}
                style={tw`mx-3`}
              >
                <Text
                  style={[
                    tw`text-sm text-center text-dark-grayish-blue`,
                    { fontFamily: "JosefinSans_700Bold" },
                  ]}
                >
                  Active
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={displayCompleted}
                style={tw`mx-3`}
              >
                <Text
                  style={[
                    tw`text-sm text-center text-dark-grayish-blue`,
                    { fontFamily: "JosefinSans_700Bold" },
                  ]}
                >
                  Completed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
          {/* ) : null} */}
        </View>
      </View>
      <Text
        style={[
          tw`mt-12 text-sm text-center text-dark-grayish-blue`,
          { fontFamily: "JosefinSans_400Regular" },
        ]}
      >
        Drag and drop to reorder list
      </Text>
    </View>
  );
};

export default Bottom;
