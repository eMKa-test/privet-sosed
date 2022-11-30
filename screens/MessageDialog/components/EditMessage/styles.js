import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  editMsfRoot: {
    paddingBottom: 10,
    paddingRight: 10,
    width: "100%",
  },
  editMsgHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    paddingHorizontal: 5,
  },
  quotedInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeftColor: "rgba(155,178,195,.4)",
    borderLeftWidth: 2,
    paddingTop: 4,
    paddingLeft: 6,
  },
  quotedInfoBody: {
    flex: 1,
  },
});

export default styles;
