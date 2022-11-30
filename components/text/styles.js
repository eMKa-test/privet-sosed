import {StyleSheet} from "react-native";
import {LINK_COLOR} from "../../constants/Colors";
import {REGULAR_FONT} from "../../constants/Vars";

const textStyles = {
  fontSize: 14,
  fontFamily: REGULAR_FONT,
  fontWeight: "400",
};

const styles = StyleSheet.create({
  link: {
    ...textStyles,
    color: LINK_COLOR,
  },
});

export default styles;
