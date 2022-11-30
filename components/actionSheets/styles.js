import {StyleSheet, Platform} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {MAX_WIDTH} from "../../constants/Layout";
import {DEFAULT_BORDER, ORANGE_COLOR} from "../../constants/Colors";

export const cardSize = {
  width: 100,
  height: 120,
};

export const actionSheetStyles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  actionSheet: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: DEFAULT_BORDER,
    borderRadius: 4,
    width: widthPercentageToDP(100) - 8,
    maxWidth: MAX_WIDTH,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: {
          width: widthPercentageToDP(0),
          height: widthPercentageToDP(0.5),
        },
      },
      android: {
        // elevation: 1,
      },
    }),
  },
  imagePickerControls: {
    marginBottom: -8,
  },
  divider: {
    backgroundColor: "#e5e5e5",
    marginBottom: 8,
  },
});

export const imagePickerStyles = StyleSheet.create({
  modal: {
    ...actionSheetStyles.modal,
  },
  actionSheet: {
    ...actionSheetStyles.actionSheet,
  },
  previewLine: {
    marginBottom: 8,
  },
  button: {
    marginBottom: 4,
    justifyContent: "space-between",
  },
  sendButton: {
    marginBottom: 4,
  },
  cancelButton: {
    marginBottom: -4,
  },
  card: {
    ...cardSize,
    borderRadius: 2,
    borderWidth: 0,
    overflow: "hidden",
    borderColor: DEFAULT_BORDER,
    marginRight: 8,
    backgroundColor: "transparent",
  },
  preview: {
    flex: 1,
    resizeMode: "cover",
  },
  checkBox: {
    position: "absolute",
    zIndex: 2,
    bottom: 5,
    right: 5,
    borderWidth: 2,
    borderColor: "rgb(230,230,230)",
    backgroundColor: ORANGE_COLOR,
    width: 22,
    height: 22,
    borderRadius: 11,
    overflow: "hidden",
    padding: 1,
  },
  check: {
    width: 9,
    height: 5,
    marginTop: 5,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 4,
    borderBottomColor: "#FFF",
    borderBottomWidth: 2,
    borderLeftColor: "#FFF",
    borderLeftWidth: 2,
    transform: [{rotate: "-50deg"}],
  },
});

export default null;
