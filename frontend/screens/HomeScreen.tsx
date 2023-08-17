import { View, Text } from 'react-native'
import React from 'react'
import tw from "../lib/tailwind";
import Form from '../components/Form';
import CheckBtn from '../components/CheckBtn';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TodoItem from '../components/TodoItem';

const HomeScreen = () => {
  const { darkMode } = useSelector((state: RootState) => state.todo);

  return (
    <View style={tw`min-h-full ${
      !darkMode ? "bg-gray" : "bg-very-dark-blue"
    }`}>
    <Header />
    <Form />
    {/* <TodoItem */}
  </View>
  )
}

export default HomeScreen