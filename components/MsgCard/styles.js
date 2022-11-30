import {StyleSheet} from "react-native";
import {CARD_BACKGROUND, ICON_COLOR} from "../../constants/Colors";
import {REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: CARD_BACKGROUND,
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomColor: "#eeedee",
    borderBottomWidth: 1,
  },
  msgPreviewHeaderDots: {
    justifyContent: "center",
  },
  p: {
    color: ICON_COLOR,
    fontFamily: REGULAR_FONT,
  },
  msgPreviewBodyLastMsg: {
    color: ICON_COLOR,
    fontFamily: REGULAR_FONT,
  },
  msgNoRooms: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: REGULAR_FONT,
    textAlign: "center",
    paddingVertical: 25,
    paddingHorizontal: 40,
    backgroundColor: "#fff",
  },
  configRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  configRowLabel: {
    marginLeft: 6,
  },
  customAvatar: {
    width: 66,
    height: 66,
    marginHorizontal: 10,
    borderRadius: 33,
  },
});

export default styles;
