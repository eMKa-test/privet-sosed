import {StyleSheet} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {REGULAR_FONT} from "../../../constants/Vars";
import {MAX_WIDTH} from "../../../constants/Layout";

const selectStyles = {
  minHeight: 40,
  paddingLeft: 8,
  paddingRight: 16,
  borderColor: "#d7e0e7",
  borderWidth: 2,
  borderRadius: 4,
  flexDirection: "row",
  alignItems: "center",
};

const styles = StyleSheet.create({
  formRow: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    width: widthPercentageToDP(100),
    maxWidth: MAX_WIDTH,
    alignSelf: "center",
  },
  selectOpenModalButton: {
    ...selectStyles,
    justifyContent: "space-between",
  },
  selectOpenModalButtonText: {
    fontFamily: REGULAR_FONT,
  },
});

export default styles;
