import {StyleSheet, Platform} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {CARD_BACKGROUND, CARD_BORDER} from "../../constants/Colors";

export const cardShadow = Platform.select({
  android: {
    // elevation: 1,
    // borderWidth: 0,
  },
  ios: {
    shadowColor: "rgb(235, 236, 238)",
    shadowOpacity: 0.35,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

const styles = StyleSheet.create({
  root: {
    width: widthPercentageToDP(100),
    backgroundColor: CARD_BACKGROUND,
    borderColor: CARD_BORDER,
    borderWidth: 1,
    ...cardShadow,
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
  },
  header: {
    paddingHorizontal: 8,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tags: {
    paddingHorizontal: 8,
    flexDirection: "row",
  },
  footer: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
