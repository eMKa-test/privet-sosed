import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {MENU, NEIGHBORS, PROFILE} from "../constants/Vars";
import MenuScreen from "../screens/Menu";
import NeighborsScreen from "../screens/Neighbors";
import ProfileScreen from "../screens/Profile";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
};

function MenuStack() {
  return (
    <Stack.Navigator initialRouteName={MENU}>
      <Stack.Screen
        name={MENU}
        component={MenuScreen}
        options={options} />
      <Stack.Screen
        name={NEIGHBORS}
        component={NeighborsScreen}
        options={options} />
      <Stack.Screen
        name={PROFILE}
        component={ProfileScreen}
        options={options} />
    </Stack.Navigator>
  );
}

export default MenuStack;
