import {StyleSheet, Platform} from "react-native";
import {WHITE} from "../../../../constants/Colors";

const styles = StyleSheet.create({
  root: {
    shadowColor: "#ebecee",
    borderBottomWidth: 2,
    borderColor: "#ebecee",
    zIndex: 2,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.6,
        shadowRadius: 1,
      },
      android: {
        elevation: 0,
      },
    }),
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  countTitle: {
    marginRight: 5,
  },
  actionContainer: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcons: {
    width: 30,
    height: 33,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  answerButton: {
    marginLeft: 10,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#5b3582",
  },
});

export default styles;
