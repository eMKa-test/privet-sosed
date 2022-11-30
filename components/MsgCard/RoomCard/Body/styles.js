import { StyleSheet } from "react-native";
import {MEDIUM_FONT, REGULAR_FONT} from "../../../../constants/Vars";
import {ICON_COLOR} from "../../../../constants/Colors";

const styles = StyleSheet.create({
  msgPreviewBody: {
    flex: 1,
    marginRight: 15,
  },
  msgPreviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerRoot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 18,
    flex: 1,
  },
  msgPreviewHeaderTitle: {
    fontWeight: "500",
    fontFamily: MEDIUM_FONT,
    fontSize: 15,
    flex: 1,
    marginTop: 5,
    marginRight: 10,
  },
  msgPreviewHeaderTitleAddress: {
    fontWeight: "500",
    fontFamily: MEDIUM_FONT,
    fontSize: 15,
    marginRight: 10,
    marginLeft: 5,
    color: "#9bb2c3",
  },
  msgPreviewAddressValue: {
    marginLeft: 5,
    color: "#9bb2c3",
    fontFamily: MEDIUM_FONT,
    fontWeight: "500",
  },
  footerWrapper: {
    marginTop: 8,
  },
  lastTimeMsg: {
    fontSize: 14,
    margin: 0,
    padding: 0,
    color: "#ababab",
    fontFamily: REGULAR_FONT,
  },
  msgPreviewLastTime: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginRight: 2,
    height: "100%",
  },
  msgPreviewFooter: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  msgPreviewAddress: {
    flexDirection: "row",
    marginVertical: 2,
  },
  msgPreviewLastMsgUserAva: {
    width: 24,
    height: 24,
    borderRadius: 20,
    marginRight: 5,
  },
  defaultAvatar: {
    marginLeft: 0,
    marginRight: 5,
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: "#f5f7f9",
  },
  notifyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventRoomMsg: {

  },
  msgPreviewBodyLastMsg: {
    color: ICON_COLOR,
    fontFamily: REGULAR_FONT,
  },
});

export default styles;
