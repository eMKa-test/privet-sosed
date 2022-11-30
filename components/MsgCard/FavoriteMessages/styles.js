import {StyleSheet} from "react-native";
import {LINK_COLOR} from "../../../constants/Colors";
import {REGULAR_FONT} from "../../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 15,
  },
  favMsgContainer: {
    marginRight: 15,
  },
  usersFavMsg: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#9bb2c366",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#fff",
  },
  myFavMsg: {
    marginLeft: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "transparent",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 10,
    backgroundColor: "#9bb2c333",
  },
  favMsgHeader: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  favUserName: {
    marginRight: 5,
  },
  favCreatedTime: {
    color: "#75797E",
  },
  favCreatedDay: {
    marginRight: 5,
    color: "#75797E",
  },
  favMsgText: {
    color: "#333333",
  },
  favoriteToggler: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    marginRight: 5,
  },
  favoriteImageContainer: {
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  favoriteImage: {
    height: 100,
    flex: 1,
    flexBasis: "48%",
    margin: "1%",
  },
  linkContainer: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "rgba(155,178,195,.4)",
  },
  linkThumbContainer: {
    borderBottomWidth: 1,
    borderRadius: 2,
    borderBottomColor: "rgba(155,178,195,.4)",
  },
  linkThumb: {
    width: "100%",
    height: "100%",
  },
  linkInfo: {
    padding: 10,
  },
  linkDomain: {
    marginTop: 5,
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
  favLink: {
    color: LINK_COLOR,
    marginTop: 2,
    fontSize: 14,
    fontFamily: REGULAR_FONT,
  },
});

export default styles;
