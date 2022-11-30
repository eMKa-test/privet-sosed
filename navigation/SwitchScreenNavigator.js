import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import MainTabsNavigator from "./MainTabsNavigator";
import MessageDialogScreen from "../screens/MessageDialog";
import {
  DIALOG_ATTACHMENTS_SCREEN, HOME, MESSAGESDIALOG, USER_PAGE_SCREEN, ABUSE,
} from "../constants/Vars";
import DialogAttachmentsScreen from "../screens/DialogAttachmentsScreen";
import UserPageScreen from "../screens/UserPageScreen";
import AbuseScreen from "../screens/Abuse";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
};

const screens = [{
  name: HOME,
  component: MainTabsNavigator,
  options,
}, {
  name: MESSAGESDIALOG,
  component: MessageDialogScreen,
  options,
}, {
  name: DIALOG_ATTACHMENTS_SCREEN,
  component: DialogAttachmentsScreen,
  options,
}, {
  name: USER_PAGE_SCREEN,
  component: UserPageScreen,
  options,
}, {
  name: ABUSE,
  component: AbuseScreen,
  options,
}];

function SwitchScreenNavigator() {
  return (
    <Stack.Navigator initialRouteName={HOME}>
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

export default SwitchScreenNavigator;
