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
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    JosefinSans_700Bold,
    JosefinSans_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}
