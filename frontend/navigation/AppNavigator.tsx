import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{title: 'Welcome'}}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

    // </NavigationContainer>
  );
};

export default MyStack;
