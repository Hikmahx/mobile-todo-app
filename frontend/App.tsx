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
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigation/AppNavigator";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Header } from "react-native/Libraries/NewAppScreen";

// const Stack = createNativeStackNavigator();

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
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}
