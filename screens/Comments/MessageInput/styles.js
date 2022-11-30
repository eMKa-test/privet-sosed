import {StyleSheet, Platform} from "react-native";
import {REGULAR_FONT} from "../../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: 10,
  },
  controlsLine: {
    marginTop: 4,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  repliesToWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 3,
  },
  headerTitle: {
    marginRight: 4,
  },
  editTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 3,
    marginRight: 25,
  },
  repliesToNone: {
    paddingBottom: 4,
  },
  inputBorder: {
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
  inputText: {
    flex: 1,
    maxHeight: 90,
    fontFamily: REGULAR_FONT,
    fontSize: 15,
    color: "#333",
    backgroundColor: "transparent",
  },
  attach: {
    marginRight: 10,
    ...Platform.select({
      android: {
        marginBottom: 6,
      },
      ios: {
        marginBottom: 4,
      },
    }),
  },
  send: {
    ...Platform.select({
      android: {
        marginBottom: 9,
      },
      ios: {
        marginBottom: 8,
      },
    }),
  },
});

export default styles;
