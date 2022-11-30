import memoize from "lodash/memoize";
import {StyleSheet} from "react-native";
import {LINK_COLOR, WHITE} from "../../constants/Colors";
import {REGULAR_FONT} from "../../constants/Vars";
import {LOADER_HEIGHT} from "../../components/loader";
import {SCREEN_WIDTH} from "../../constants/Layout";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: WHITE,
  },
  prerenderView: {
    opacity: 0,
    position: "absolute",
    top: 0,
    left: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
  },
  loaderHolder: {
    marginVertical: 8,
    height: LOADER_HEIGHT,
  },
  rootMsg: {
    position: "relative",
    marginVertical: 10,
    marginRight: 10,
  },
  rootMsgMy: {
    flexDirection: "row-reverse",
  },
  rootMsgOther: {
    flexDirection: "row",
  },
  animateBg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "cyan",
  },
  dialogContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  AndroidDialogBody: {
    minHeight: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dialogFooter: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#edecec",
  },
  msgDay: {
    color: "#75797e",
  },
  msgContainer: {
    position: "relative",
  },
  eventMsgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  eventMsg: {
    marginVertical: 15,
    color: "#75797e",
  },
  myMsg: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    marginRight: 10,
    borderColor: "transparent",
    backgroundColor: "rgba(155,178,195,.2)",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 10,
  },
  otherMsg: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "rgba(155,178,195,.2)",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#fff",
  },
  msgHeader: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  msgUserName: {
    marginRight: 5,
  },
  msgCreateInfo: {
    flexDirection: "row",
  },
  msgCreatedDay: {
    color: "#75797E",
  },
  msgCreatedTime: {
    color: "#75797E",
    marginRight: 5,
  },
  msgMsgText: {
    fontSize: 15,
    fontFamily: REGULAR_FONT,
    marginTop: 5,
    color: "#333333",
  },
  msgTextAnswer: {
    fontSize: 13,
    fontFamily: REGULAR_FONT,
    marginTop: 5,
    color: "#333333",
  },
  msgLink: {
    color: LINK_COLOR,
    marginTop: 5,
    fontSize: 15,
    fontFamily: REGULAR_FONT,
  },
  msgLinkAnswer: {
    color: LINK_COLOR,
    marginTop: 5,
    fontSize: 13,
    fontFamily: REGULAR_FONT,
  },
  dialogLoader: {
    zIndex: 11,
  },
  firstLoader: {
    zIndex: 101,
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
  noMsgs: {
    color: "#75797E",
  },
  msgTypingContainer: {
    marginBottom: 5,
    paddingLeft: 5,
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  typingLoader: {
    maxWidth: 50,
    marginRight: 5,
  },
  msgTyping: {
    color: "#afafaf",
    fontSize: 13,
    fontFamily: REGULAR_FONT,
  },
  configRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  configRowLabel: {
    marginLeft: 6,
  },
  newMessages: {
    marginVertical: 30,
    paddingHorizontal: 5,
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  newMessagesTitle: {
    position: "absolute",
    zIndex: 1,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  favButtonIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "15%",
    width: 25,
    height: 25,
  },
  myFav: {
    left: -28,
  },
  otherFav: {
    right: -31,
  },
  selectButtonIcon: {
    position: "absolute",
    top: "50%",
  },
  mySelect: {
    left: -27,
  },
  otherSelect: {
    right: -26,
  },
  divider: {
    zIndex: 0,
    width: "100%",
    height: 2,
    backgroundColor: "rgba(155,178,195,.4)",
  },
  rootQuote: {
    marginTop: 5,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderLeftWidth: 2,
    borderLeftColor: "rgba(155,178,195,.4)",
    backgroundColor: "rgba(155,178,195,.2)",
    borderRadius: 5,
  },
  editedMsg: {
    color: "#75797E",
  },
  topLoaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    zIndex: 11,
  },
  IOSContentContainerStyle: {
    paddingTop: 25,
  },
});

export const getStyle = memoize((active) => {
  return StyleSheet.flatten([styles.AndroidDialogBody, {zIndex: active ? 10 : 0}]);
});

export default styles;
