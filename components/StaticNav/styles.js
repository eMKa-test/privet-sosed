import {Dimensions, StyleSheet} from "react-native";
import {REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  vertical: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "flex-start",
  },
  title: {
    fontFamily: REGULAR_FONT,
    fontWeight: "400",
    fontSize: Dimensions.get("window").width < 375 ? 11 : 14,
    color: "#8d8d8d",
  },
});

export default styles;
