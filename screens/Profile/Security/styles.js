import {StyleSheet} from "react-native";
import {MEDIUM_FONT} from "../../../constants/Vars";

const sessionItemStyles = StyleSheet.create({
  root: {
    marginBottom: 10,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  firstRowBold: {
    fontWeight: "500",
    fontFamily: MEDIUM_FONT,
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
    marginTop: 2,
  },
  firstRowRegion: {
    fontSize: 13,
    color: "#75797e",
    marginBottom: 2,
    marginTop: 2,
  },
  secondRowText: {
    fontSize: 13,
    color: "#75797e",
    marginTop: 5,
    marginBottom: 0,
  },
  isCurrent: {
    fontSize: 13,
    color: "#4bb34b",
    marginTop: 5,
    marginBottom: 0,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#75797e",
    marginTop: 1,
    marginHorizontal: 6,
  },
});

export default sessionItemStyles;
