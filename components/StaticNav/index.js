import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import TransparentButton from "../buttons/transparent";
import {STATIC_WEBVIEW} from "../../constants/Vars";
import {navigate} from "../../navigation/root";
import styles from "./styles";

const nav = [
  {
    title: "О проекте",
    page: "about",
  },
  {
    title: "Правовая информация",
    page: "legal",
  },
];

function StaticNav(props) {
  const {vertical, children} = props;
  const rootStyles = vertical ? styles.vertical : styles.horizontal;
  return (
    <View style={rootStyles}>
      {nav.map((el) => (
        <TransparentButton
          titleStyle={styles.title}
          key={el.page}
          title={el.title}
          onPress={() => navigate(STATIC_WEBVIEW, {label: el.title, page: el.page})} />
      ))}
      {children}
    </View>
  );
}

StaticNav.propTypes = {
  vertical: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(StaticNav);
