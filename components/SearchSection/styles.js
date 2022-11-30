import {Platform, StyleSheet} from "react-native";
import {CARD_BACKGROUND, TEXT_COLOR} from "../../constants/Colors";
import {REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  msgSearchContainer: {
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BACKGROUND,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    ...Platform.select({
      ios: {
        paddingVertical: 18,
        shadowColor: "rgba(235, 236, 238, 1)",
        shadowOpacity: 0.35,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
      android: {
        paddingVertical: 15,
        elevation: 0,
      },
    }),
  },
  leftSideSearch: {
    flexDirection: "row",
    alignItems: "center",
    flex: 10,
  },
  msgSearchInput: {
    flex: 1,
    fontFamily: REGULAR_FONT,
    fontSize: 14.5,
    color: TEXT_COLOR,
    backgroundColor: "transparent",
    marginLeft: 10,
  },
  clearSearch: {
    padding: 2,
  },
});

export default styles;
