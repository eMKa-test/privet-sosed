import {Platform, StyleSheet} from "react-native";
import {TEXT_COLOR, WHITE} from "../../../constants/Colors";
import {REGULAR_FONT} from "../../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    backgroundColor: WHITE,
    padding: 10,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#edecec",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(235, 236, 238, 1)",
        shadowOpacity: 0.35,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        // elevation: 1,
      },
    }),
  },
  searchInput: {
    flex: 1,
    fontFamily: REGULAR_FONT,
    fontSize: 14.5,
    color: TEXT_COLOR,
    backgroundColor: "transparent",
    marginHorizontal: 10,
  },
  loaderSection: {
    alignItems: "flex-end",
    width: 30,
    marginRight: 10,
  },
  loader: {
    height: 20,
  },
  close: {
  },
});

export default styles;
