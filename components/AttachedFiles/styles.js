import {StyleSheet} from "react-native";
import {MEDIUM_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    paddingRight: 24,
  },
  attachItemWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
  textWrapper: {
    marginLeft: 14,
  },
  fileName: {
    fontFamily: MEDIUM_FONT,
    fontSize: 14,
    lineHeight: 14,
    paddingBottom: 3,
  },
  fileSize: {
    lineHeight: 13,
  },
});

export default styles;
