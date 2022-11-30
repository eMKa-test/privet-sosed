import {Dimensions, StyleSheet} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {BOLD_FONT, MEDIUM_FONT, REGULAR_FONT} from "../../../constants/Vars";
import {MAX_WIDTH, MODAL_BORDER_WIDTH, WIDTH} from "../../../constants/Layout";
import {WHITE} from "../../../constants/Colors";

export const COLS = 3;
export const GAP = 3;

const CARD_SIZE = ((WIDTH > MAX_WIDTH ? MAX_WIDTH : WIDTH) - (MODAL_BORDER_WIDTH * 2)) / COLS - (GAP * 1.25);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  modal: {
    alignSelf: "center",
    margin: 0,
    width: widthPercentageToDP(100),
    maxWidth: MAX_WIDTH,
    height: heightPercentageToDP(100),
    borderWidth: MODAL_BORDER_WIDTH,
    borderRadius: 6,
    borderColor: "transparent",
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    marginRight: GAP,
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
  },
  flatListRow: {
    marginTop: GAP,
    marginLeft: GAP,
  },
  modalContent: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 6,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalHeaderText: {
    marginLeft: 8,
    color: WHITE,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: BOLD_FONT,
    marginRight: 8,
  },
  modalHeaderHelper: {
    color: WHITE,
    fontWeight: "500",
    fontFamily: MEDIUM_FONT,
  },

  // react native standard modal
  modalOverlay: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: REGULAR_FONT,
    color: WHITE,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  modalBody: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modalParagraph: {
    paddingBottom: 6,
  },
  modalFooter: {
    marginTop: 30,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    marginRight: 15,
    paddingTop: 12,
    paddingBottom: 14,
  },
  cancelButton: {
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 38,
  },
  modalMessageBodyContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  modalMessageFooter: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fafbfc",
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
  },
  cancelButtonMessage: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  confirmButtonMessage: {
    marginLeft: 10,
    paddingTop: 10,
    marginBottom: 0,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderColor: "transparent",
  },
  headerText: {
    lineHeight: 18,
  },
  footerText: {
    lineHeight: 18,
    marginTop: 10,
  },
  linkInput: {
    fontFamily: REGULAR_FONT,
    fontSize: 16,
    color: "#333",
    borderWidth: 2,
    borderColor: "rgba(155,178,195,.4)",
    padding: 8,
    marginTop: 5,
    borderRadius: 3,
  },
  exceptionInput: {
    borderColor: "#FF0000",
  },
  exceptionText: {
    marginTop: 5,
  },
  passiveText: {
    marginBottom: 15,
  },
});
export default styles;
