import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {
  COMMENTS, FEED, ABUSE, NEW_POST, SEARCH,
} from "../constants/Vars";
import FeedScreen from "../screens/Feed";
import CommentsScreen from "../screens/Comments";
import AbuseScreen from "../screens/Abuse";
import NewPostScreen from "../screens/NewPost";
import SearchScreen from "../screens/Search";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
};

function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={FEED}
        component={FeedScreen}
        options={options} />
      <Stack.Screen
        name={COMMENTS}
        component={CommentsScreen}
        options={options} />
      <Stack.Screen
        name={ABUSE}
        component={AbuseScreen}
        options={options} />
      <Stack.Screen
        name={NEW_POST}
        component={NewPostScreen}
        options={options} />
      <Stack.Screen
        name={SEARCH}
        component={SearchScreen}
        options={options} />
    </Stack.Navigator>
  );
}

export default FeedStack;
