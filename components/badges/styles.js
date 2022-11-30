import {StyleSheet} from "react-native";
import {REGULAR_FONT} from "../../constants/Vars";

export default StyleSheet.create({
  countBadge: {
    marginHorizontal: 2,
    borderRadius: 20,
    backgroundColor: "#e99114",
    minWidth: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  countBadgeValue: {
    color: "#fff",
    fontSize: 11,
    fontFamily: REGULAR_FONT,
  },
  statusBadgeContainer: {
    position: "relative",
  },
  statusBadge: {
    position: "absolute",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#67b457",
  },
});
