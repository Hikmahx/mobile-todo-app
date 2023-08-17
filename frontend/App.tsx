import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useFonts,
  JosefinSans_700Bold,
  JosefinSans_400Regular,
} from "@expo-google-fonts/josefin-sans";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import HomeScreen from "./screens/HomeScreen";

// import { Header } from "react-native/Libraries/NewAppScreen";

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
      <HomeScreen />
    </Provider>
  );
}
