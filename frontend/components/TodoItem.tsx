import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import { todos } from "../todos.json";
import Check from "../assets/svg/icon-check.svg";
import Pencil from "../assets/svg/icon-pencil.svg";
import Cross from "../assets/svg/icon-cross.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CheckBtn from "./CheckBtn";

const TodoItem = ({ item }: { item: any }) => {
  const { darkMode } = useSelector((state: RootState) => state.todo);
  // const Item = ({ item }: { item: any }) => {
    return (
      <View style={tw`w-full max-w-lg mx-auto`}>
        <View
          style={tw`todo-item relative flex flex-row items-center h-auto py-4 border-b ${
            !darkMode
              ? "border-light-grayish-blue"
              : "border-dark-grayish-blue-dark"
          }`}
        >
          {/* <View style={tw`checkbox-wrapper relative z-10`}>
            <View
              style={tw`relative rounded-full w-5 h-5 lg:w-6 lg:h-6 flex flex-row items-center justify-center" + (todo.completed ===true? ' bg-gradient-to-r from-gradient-blue to-gradient-purple':'')  
              ${
                !darkMode
                  ? "bg-very-light-grayish-blue"
                  : "bg-very-dark-grayish-blue-dark"
              }`}
            > */}
              {/* <Image source={check} /> */}
              {/* <Check /> */}

              <CheckBtn />


              {/* <View
                style={tw`checkbox absolute inset-0 transition-colors w-4 h-4 lg:w-5 lg:h-5 rounded-full m-auto" + (todo.completed ===true? ' bg-transparent dark:bg-transparent':'' 
                ${
                  !darkMode
                    ? "bg-very-light-grayish-blue"
                    : "bg-very-dark-grayish-blue-dark"
                }`}
              ></View>
            </View>
          </View> */}
          <Text
            style={[
              tw`"todo-task relative px-3 sm:max-w-sm first-letter:capitalize flex-wrap flex-1 flex"
            ${
              item.completed
                ? "line-through text-light-grayish-blue"
                : "text-very-dark-grayish-blue"
            }
            `,
              { fontFamily: "JosefinSans_400Regular" },
            ]}
          >
            {/* {item.todo} */}
            {item.todo.charAt(0).toUpperCase() + item.todo.slice(1)}
          </Text>
          <View
            style={tw`mr-4 flex flex-row justify-end items-center`}
          >
            <Pencil style={tw`mr-2`} />
            <Cross />
          </View>
        </View>
      </View>
    );
  // };

  // return (
  //   <View style={tw`w-full max-w-lg mx-auto`}>
  //     <View style={tw``}>
  //       {todos.map((todo) => (
  //         <>
  //           <Item key={todo.id} item={todo} />
  //         </>
  //       ))}
  //     </View>
  //   </View>
  // );
};

export default TodoItem;
