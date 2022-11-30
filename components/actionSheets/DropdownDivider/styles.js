import {StyleSheet, Platform} from "react-native";
import {REGULAR_FONT} from "../../../constants/Vars";

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
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
  modalDivider: {
    backgroundColor: "#e5e5e5",
    height: 1,
    marginVertical: 5,
  },
});

export default styles;
