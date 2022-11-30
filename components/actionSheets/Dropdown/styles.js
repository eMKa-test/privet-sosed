import {StyleSheet} from "react-native";
import {REGULAR_FONT} from "../../../constants/Vars";
import {ORANGE_COLOR} from "../../../constants/Colors";

const styles = StyleSheet.create({
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: REGULAR_FONT,
    textAlign: "center",
  },
  optionsHeader: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionWithIcon: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  test: {
    borderWidth: 1,
    borderColor: "black",
  },
  optionTextWithIcon: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: REGULAR_FONT,
    textAlign: "left",
  },
  isSelected: {
    color: ORANGE_COLOR,
  },
});

export default styles;
