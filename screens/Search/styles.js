import { StyleSheet } from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {MODAL_BORDER_WIDTH} from "../../constants/Layout";
import {BOLD_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  modal: {
    margin: 0,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    borderWidth: MODAL_BORDER_WIDTH,
    borderColor: "transparent",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 6,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalHeaderText: {
    fontFamily: BOLD_FONT,
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginHorizontal: 8,
  },
  modalBody: {
    alignItems: "center",
  },
});

export default styles;
