import React from "react";
import * as PropTypes from "prop-types";
import {Text} from "react-native";
import * as Linking from "expo-linking";
import styles from "./styles";

function Link({href, title}) {
  return (
    <Text
      style={styles.link}
      onPress={() => {
        if (href) {
          Linking.openURL(href);
        }
      }}>
      {title}
    </Text>
  );
}

Link.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
};

export default Link;
