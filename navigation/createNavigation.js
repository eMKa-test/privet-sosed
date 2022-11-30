import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {MAIN, WELCOME} from "../constants/Vars";
import staticScreens from "./staticScreens";
import MainStack from "./MainStack";

const Stack = createStackNavigator();

const screens = [
  ...staticScreens,
  {
    name: MAIN,
    component: MainStack,
    headerMode: false,
    options: {
      headerShown: false,
    },
  },
];

function createNavigation(initialRouteName = WELCOME) {
  return () => (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          options={screen.options}
          component={screen.component} />
      ))}
    </Stack.Navigator>
  );
}

export default createNavigation;
