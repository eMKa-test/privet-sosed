import {StyleSheet} from "react-native";
import {REGULAR_FONT} from "../../../../constants/Vars";

const styles = StyleSheet.create({
  searchRoot: {
    position: "absolute",
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    zIndex: 3,
    top: 0,
    left: 0,
    width: "100%",
  },
  leftItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  rightItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 17,
    color: "#333",
    width: 190,
    fontFamily: REGULAR_FONT,
  },
  searchButton: {
    backgroundColor: "#5b3582",
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 30,
    minWidth: 90,
  },
  searchClose: {
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 5,
  },
  loading: {
    backgroundColor: "rgba(155,178,195,.4)",
  },
  loader: {
    width: "100%",
  },
});

export default styles;
