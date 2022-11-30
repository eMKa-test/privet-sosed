import {StyleSheet} from "react-native";
import cardStyles from "../../components/card/styles";
import staticNavChildStyles from "../../components/StaticNav/styles";
import {LIGHT_FONT, REGULAR_FONT} from "../../constants/Vars";

export const userInfoStyles = StyleSheet.create({
  root: {
    ...cardStyles.root,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 15,
    marginRight: 12,
  },
});

export const mainNavStyles = StyleSheet.create({
  root: {
    ...cardStyles.root,
    paddingVertical: 15,
    paddingLeft: 7,
    alignItems: "flex-start",
  },
  element: {
    marginTop: 8,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  elementTitle: {
    fontFamily: LIGHT_FONT,
    fontWeight: "300",
    fontSize: 16,
    color: "#1a1a1a",
    marginLeft: 9,
    marginTop: 2,
  },
});

export const staticNavStyles = StyleSheet.create({
  root: {
    ...cardStyles.root,
    paddingVertical: 15,
    paddingLeft: 7,
  },
  elementTitle: {
    ...staticNavChildStyles.title,
    alignSelf: "flex-start",
  },
});

const indexScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default indexScreenStyles;
