import React from "react";
import * as PropTypes from "prop-types";
import {
  Platform, StatusBar, StyleSheet, View,
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DefaultButton from "../components/buttons/default";
import WelcomeBlock from "../components/welcome";
import {MAIN} from "../constants/Vars";
import {welcomeComplete} from "../store/actions/commonActions";
import {navigate} from "../navigation/root";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    zIndex: 1,
  },
});

function WelcomeScreen(props) {
  return (
    <View style={styles.root}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <WelcomeBlock>
        <DefaultButton
          title="Далее"
          onPress={() => {
            props.welcomeComplete(props);
            navigate(MAIN);
          }} />
      </WelcomeBlock>
    </View>
  );
}

WelcomeScreen.propTypes = {
  welcomeComplete: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  welcomeComplete,
}, dispatch);

export default connect(null, mapDispatchToProps)(WelcomeScreen);
