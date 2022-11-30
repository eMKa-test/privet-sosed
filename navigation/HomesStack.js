import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {
  HOMES, CREATE_HOUSE, UPLOAD_DOCS, HOUSE_FEED, NEW_POST,
} from "../constants/Vars";
import HomesScreen from "../screens/Homes";
import CreateHouseScreen from "../screens/Homes/Create";
import UploadDocsScreen from "../screens/Homes/UploadDocs";
import HouseFeedScreen from "../screens/Homes/Feed";
import NewPostScreen from "../screens/NewPost";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
};

function HomesStack() {
  return (
    <Stack.Navigator initialRouteName={HOMES}>
      <Stack.Screen
        name={HOMES}
        component={HomesScreen}
        options={options} />
      <Stack.Screen
        name={CREATE_HOUSE}
        component={CreateHouseScreen}
        options={options} />
      <Stack.Screen
        name={UPLOAD_DOCS}
        component={UploadDocsScreen}
        options={options} />
      <Stack.Screen
        name={HOUSE_FEED}
        component={HouseFeedScreen}
        options={options} />
      <Stack.Screen
        name={NEW_POST}
        component={NewPostScreen}
        options={options} />
    </Stack.Navigator>
  );
}

export default HomesStack;
