import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Platform, StatusBar} from "react-native";
import {AUTH} from "../constants/Vars";
import AuthScreen from "../screens/Auth";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
};

function AuthStack() {
  return (
    <React.Fragment>
      {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
      <Stack.Navigator>
        <Stack.Screen
          name={AUTH}
          component={AuthScreen}
          headerMode={false}
          options={options} />
      </Stack.Navigator>
    </React.Fragment>
  );
}

export default AuthStack;
