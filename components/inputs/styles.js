import {StyleSheet, Platform} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {BOLD_FONT, REGULAR_FONT} from "../../constants/Vars";
import {MAX_WIDTH, MODAL_BORDER_WIDTH} from "../../constants/Layout";
import {CARD_BORDER, DEFAULT_BORDER} from "../../constants/Colors";

const defaultInput = {
  fontSize: 16,
  fontFamily: REGULAR_FONT,
  color: "#333333",
  marginBottom: 12,
};

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
  label: {
    marginBottom: 6,
  },
  formRow: {
    marginBottom: 18,
  },
  formRowModal: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  multipleSelect: {
    ...selectStyles,
    flexWrap: "wrap",
    ...Platform.select({
      ios: {
        paddingTop: 3,
      },
      android: {
        paddingTop: 1,
      },
    }),
  },
  multipleSelectPlaceholder: {
    // костыльное место из-за пиксель хантинга
    height: 32,
    marginTop: -3,
    justifyContent: "center",
  },
  multipleSelectItem: {
    backgroundColor: "rgba(155,178,195,0.2)",
    paddingTop: 3,
    paddingRight: 8,
    paddingBottom: 3,
    paddingLeft: 5,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
    marginTop: 2,
    marginBottom: 2,
  },
  multipleSelectItemText: {
    marginRight: 6,
  },
  asyncSelectOpenModalButton: {
    ...selectStyles,
    justifyContent: "space-between",
  },
  asyncSelectOpenModalButtonText: {
    color: "#333333",
    fontFamily: REGULAR_FONT,
  },
  multilineWrapper: {
    borderColor: DEFAULT_BORDER,
    borderWidth: 2,
    borderRadius: 4,
    paddingTop: 4,
    paddingLeft: 8,
  },
  noBorders: {
    borderColor: "transparent",
  },
  multiline: {
    ...defaultInput,
    height: null,
    textAlignVertical: "top",
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
  modalBody: {
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalHeaderText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: BOLD_FONT,
    marginRight: 8,
  },
  inputWrapper: {
  },
  input: {
    ...defaultInput,
    paddingLeft: 10,
    borderColor: DEFAULT_BORDER,
    borderWidth: 2,
    borderRadius: 4,
    height: 40,
    width: widthPercentageToDP(100),
    maxWidth: "100%",
    backgroundColor: "#fff",
    fontSize: 15,
  },
  inFocus: {
    borderColor: "#9bb2c3",
  },
  searchIcon: {
    position: "absolute",
    left: 22,
    top: 20,
    zIndex: 1,
  },
  searchField: {
    paddingHorizontal: 12,
    paddingTop: 12,
    alignItems: "center",
    maxWidth: MAX_WIDTH,
    borderBottomWidth: 1,
    borderBottomColor: CARD_BORDER,
  },
  searchInput: {
    paddingLeft: 40,
  },
  closeIcon: {
    padding: 10,
    position: "absolute",
    top: 15,
    right: 14,
  },
  searchFocus: {
    borderColor: "#9bb2c3",
  },
  list: {
    paddingBottom: 120,
    alignItems: "center",
    maxWidth: MAX_WIDTH,
  },
  listItem: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    width: widthPercentageToDP(100),
    maxWidth: "100%",
  },
  onError: {
    borderColor: "#F15248",
  },
  phoneMask: {
    ...defaultInput,
    paddingLeft: 12,
    borderColor: DEFAULT_BORDER,
    borderWidth: 2,
    borderRadius: 4,
    height: 40,
    width: widthPercentageToDP(100),
    maxWidth: "100%",
  },
  checkBoxDefaultStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  messageInputBorder: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#f4f7fb",
    minHeight: 32,
    marginRight: 10,
    paddingHorizontal: 12,
    ...Platform.select({
      android: {
        paddingTop: 3,
        paddingBottom: 4,
      },
      ios: {
        paddingTop: 2,
        paddingBottom: 7,
      },
    }),
  },
  messageInput: {
    flex: 1,
    maxHeight: 90,
    fontFamily: REGULAR_FONT,
    fontSize: 15,
    color: "#333",
    backgroundColor: "transparent",
  },
  messageInputAttach: {
    marginRight: 10,
    ...Platform.select({
      android: {
        marginBottom: 5,
      },
      ios: {
        marginBottom: 4,
      },
    }),
  },
  messageInputSend: {
    marginLeft: 10,
    ...Platform.select({
      android: {
        marginBottom: 8,
      },
      ios: {
        marginBottom: 7,
      },
    }),
  },
});

export default styles;
