import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {
  CREATE_ROOM, MESSAGES,
} from "../constants/Vars";
import MessagesScreen from "../screens/Messages";
import CreateRoomScreen from "../screens/CreateRoom";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
};

const screens = [{
  name: MESSAGES,
  component: MessagesScreen,
  options,
}, {
  name: CREATE_ROOM,
  component: CreateRoomScreen,
  options,
}];

function MessagesStack() {
  return (
    <Stack.Navigator>
      {screens.map(({name, component, options: _options}) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={_options} />
      ))}
    </Stack.Navigator>
  );
}

export default MessagesStack;
