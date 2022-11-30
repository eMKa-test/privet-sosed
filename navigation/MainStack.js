import React from "react";
import * as PropTypes from "prop-types";
import {createStackNavigator} from "@react-navigation/stack";
import get from "lodash/get";
import {connect} from "react-redux";
import {Platform, StatusBar} from "react-native";
import {AUTH, HOME} from "../constants/Vars";
import SwitchScreenNavigator from "./SwitchScreenNavigator";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
};

function MainStack({authToken}) {
  return (
    <React.Fragment>
      {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
      <Stack.Navigator>
        {authToken ? (
          <Stack.Screen
            name={HOME}
            component={SwitchScreenNavigator}
            options={options} />
        ) : (
          <Stack.Screen
            name={AUTH}
            component={AuthStack}
            headerMode={false}
            options={options} />
        )}
      </Stack.Navigator>
    </React.Fragment>
  );
}

MainStack.propTypes = {
  authToken: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authToken: Boolean(get(state, "common.authToken", false)),
});

export default connect(mapStateToProps)(MainStack);
