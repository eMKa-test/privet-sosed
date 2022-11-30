import React from "react";
import * as PropTypes from "prop-types";
import {Animated} from "react-native";
import get from "lodash/get";
import {connect} from "react-redux";
import StaticNav from "../../components/StaticNav";
import styles, {H} from "./styles";

function Footer(props) {
  const {keyboardVisible} = props;
  const [translateY] = React.useState(new Animated.Value(-H));
  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: keyboardVisible ? 0 : -H,
      duration: 600,
      delay: 0,
      useNativeDriver: true,
    }).start();
  }, [keyboardVisible]);
  return (
    <Animated.View
      style={[styles.footer, {
        transform: [{translateY}],
      }]}>
      <StaticNav />
    </Animated.View>
  );
}

Footer.propTypes = {
  keyboardVisible: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  keyboardVisible: get(state, "common.keyboardVisible", false),
});

export default connect(mapStateToProps)(React.memo(Footer));
