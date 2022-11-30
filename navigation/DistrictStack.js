import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {connect} from "react-redux";

import {DISTRICT, ADD_DISTRICT} from "../constants/Vars";
import DistrictScreen from "../screens/District";
import AddDistrictScreen from "../screens/AddDistrict";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
};

const screens = [{
  name: DISTRICT,
  component: DistrictScreen,
  options,
}, {
  name: ADD_DISTRICT,
  component: AddDistrictScreen,
  options,
}];

function DistrictStack() {
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

DistrictStack.propTypes = {
};

const mapStateToProps = (state) => ({
  // ...
});

export default connect(mapStateToProps)(DistrictStack);
