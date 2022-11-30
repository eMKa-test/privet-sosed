import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  rootAnswer: {
    paddingBottom: 5,
    marginBottom: 2,
    paddingRight: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  answerBody: {
    borderLeftColor: "rgba(155,178,195,.4)",
    borderLeftWidth: 2,
    flex: 1,
    paddingLeft: 6,
    paddingRight: 35,
    paddingTop: 4,
  },
  closeButton: {
    padding: 5,
  },
});

export default styles;
