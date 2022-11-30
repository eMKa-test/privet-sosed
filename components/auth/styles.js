import {StyleSheet} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {LIGHT_FONT, REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "90%",
    maxWidth: 360,
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: widthPercentageToDP("99%"),
  },
  title: {
    marginTop: 8,
    marginBottom: 32,
    color: "#8d8d8d",
    fontFamily: LIGHT_FONT,
  },
  linkText: {
    fontSize: 16,
    lineHeight: 20,
    color: "#1a1a1a",
    fontFamily: LIGHT_FONT,
  },
  dimmed: {
    color: "#8d8d8d",
    fontFamily: LIGHT_FONT,
    fontSize: 16,
    lineHeight: 20,
  },
  inputWrapper: {
    marginBottom: 18,
  },
  input: {
    fontSize: 14,
    fontFamily: REGULAR_FONT,
    height: 40,
    paddingLeft: 12,
    borderColor: "#d7e0e7",
    borderWidth: 2,
    borderRadius: 4,
    color: "#333333",
  },
  onError: {
    borderColor: "#F15248",
  },
  inFocus: {
    borderColor: "#9bb2c3",
  },
  iconWrapper: {
    height: 40,
    width: 44,
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontFamily: REGULAR_FONT,
    color: "#F15248",
  },
  oauthRoot: {
    marginTop: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  authIcon: {
    marginHorizontal: 8,
  },
  submitButton: {
    marginTop: 4,
  },
});

export default styles;
