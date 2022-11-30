import {StyleSheet} from "react-native";
import {ICON_COLOR, LINK_COLOR, TEXT_COLOR} from "../../constants/Colors";
import {REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  msgLink: {
    color: LINK_COLOR,
    fontSize: 15,
    fontFamily: REGULAR_FONT,
  },
  renderMsgRoot: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  msgText: {
    color: TEXT_COLOR,
    fontSize: 15,
    fontFamily: REGULAR_FONT,
  },
  msgLinkAnswer: {
    color: LINK_COLOR,
    fontSize: 13,
    fontFamily: REGULAR_FONT,
  },
  msg: {
    color: LINK_COLOR,
    fontSize: 13,
    fontFamily: REGULAR_FONT,
  },
  msgMsgText: {
    fontSize: 15,
    fontFamily: REGULAR_FONT,
    color: "#333333",
  },
  msgTextAnswer: {
    fontSize: 13,
    fontFamily: REGULAR_FONT,
    color: "#333333",
  },
  msgPreviewColor: {
    color: ICON_COLOR,
  },
});

export default styles;
