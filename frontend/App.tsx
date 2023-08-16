import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useFonts,
  JosefinSans_700Bold,
  JosefinSans_400Regular,
} from "@expo-google-fonts/josefin-sans";
import tw from "twrnc";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    JosefinSans_700Bold,
    JosefinSans_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <View>
        <Text>my todo app</Text>
      </View>
    </Provider>
  );
}
