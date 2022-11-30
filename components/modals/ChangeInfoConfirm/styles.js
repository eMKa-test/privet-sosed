import {StyleSheet} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {MODAL_BORDER_WIDTH} from "../../../constants/Layout";
import {REGULAR_FONT} from "../../../constants/Vars";

const styles = StyleSheet.create({
  rootConfirm: {
    margin: 0,
    width: widthPercentageToDP(100),
    borderWidth: MODAL_BORDER_WIDTH,
    borderColor: "transparent",
    justifyContent: "flex-start",
  },
  confirmOverlay: {
    backgroundColor: "#FFF",
    borderRadius: 6,
    overflow: "hidden",
  },
  confirmBody: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  confirmEditTitle: {
    marginBottom: 10,
  },
  titleInput: {
    fontFamily: REGULAR_FONT,
    fontSize: 16,
    color: "#333",
    padding: 8,
    borderWidth: 2,
    borderColor: "rgba(155,178,195,.4)",
    borderRadius: 3,
  },
  confirmFooter: {
    backgroundColor: "#fafbfc",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    marginLeft: 10,
  },
  cancelConfirm: {
    borderWidth: 2,
    borderColor: "rgba(155,178,195,.4)",
    backgroundColor: "#fff",
  },
  onConfirm: {
    backgroundColor: "#5b3582",
    borderWidth: 2,
    borderColor: "transparent",
  },
  avatarConfirmContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteCurrentAvatar: {
    marginTop: 20,
  },
});

export default styles;
