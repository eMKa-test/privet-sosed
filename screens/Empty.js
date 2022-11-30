import React from "react";
import * as PropTypes from "prop-types";
import {Text, View} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const EmptyScreen = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "space-around",
    }}>
    <Text>EmptyScreen</Text>
  </View>
);

EmptyScreen.propTypes = {
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // ...
}, dispatch);

export default connect(null, mapDispatchToProps)(EmptyScreen);
