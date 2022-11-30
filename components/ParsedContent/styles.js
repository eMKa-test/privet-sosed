import {StyleSheet} from "react-native";
import {REGULAR_FONT} from "../../constants/Vars";
import {LINK_COLOR} from "../../constants/Colors";

const textStyles = {
  fontSize: 14,
  fontFamily: REGULAR_FONT,
  fontWeight: "400",
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    minHeight: 17,
  },
  text: {
    ...textStyles,
  },
  linkWithHtml: {
    ...textStyles,
    color: LINK_COLOR,
  },
});

export default styles;
