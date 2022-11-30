import {StyleSheet, Platform} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {BOLD_FONT, LIGHT_FONT} from "../../../constants/Vars";
import {iphoneX} from "../../../lib/utils";

const styles = StyleSheet.create({
  anchorButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  anchorText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: BOLD_FONT,
    marginRight: 8,
  },
  anchorIcon: {
    ...Platform.select({
      ios: {
        marginTop: 6,
      },
      android: {
        marginTop: 8,
      },
    }),
  },
  optionsOverlay: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  optionsWrapper: {
    position: "absolute",
    ...Platform.select({
      ios: {
        ...iphoneX("top", 20, 25),
      },
      android: {
        top: 0,
      },
    }),
    left: 7,
    backgroundColor: "#FFF",
    paddingTop: 6,
    paddingBottom: 10,
    elevation: 4,
    shadowColor: "#333",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#e3e8ef",
    borderRadius: 3,
  },
  option: {
    borderLeftWidth: 2,
    borderLeftColor: "transparent",
    backgroundColor: "transparent",
    paddingLeft: 18,
    paddingRight: 40,
    paddingVertical: 8,
  },
  optionActive: {
    borderLeftColor: "#e99114",
    backgroundColor: "#f4f7fb",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "300",
    fontFamily: LIGHT_FONT,
  },
});

export default styles;
