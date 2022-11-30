import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {Text} from "react-native-elements";
import {heightPercentageToDP} from "react-native-responsive-screen";
import {BOLD_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  text: {
    fontFamily: BOLD_FONT,
    fontWeight: "700",
    color: "#181818",
    marginTop: heightPercentageToDP("2%"),
    marginBottom: heightPercentageToDP("4%"),
  },
  center: {
    textAlign: "center",
  },
});

function Heading(props) {
  const {
    style, children, center, ...rest
  } = props;
  const _styles = [styles.text];
  if (style) {
    _styles.push(style);
  }
  if (center) {
    _styles.push(styles.center);
  }
  return (
    <Text
      style={_styles}
      h1Style={styles.text}
      h2Style={styles.text}
      h3Style={styles.text}
      h4Style={styles.text}
      {...rest}>
      {children}
    </Text>
  );
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  center: PropTypes.bool,
};

export default React.memo(Heading);
