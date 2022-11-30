import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSide: {
    flexDirection: "row",
  },
  rightSide: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 6,
  },
  footerText: {
    paddingTop: 6,
  },
  dotSeparator: {
    marginTop: 6,
  },
});

export default styles;
