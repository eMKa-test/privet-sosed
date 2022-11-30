import {StyleSheet} from "react-native";
import {REGULAR_FONT} from "../../../../constants/Vars";

const styles = StyleSheet.create({
  msgTypingContainer: {
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    flex: 1,
  },
  typingLoader: {
    maxWidth: 50,
    marginRight: 5,
    flex: 1,
  },
  msgTyping: {
    flex: 1,
    color: "#afafaf",
    fontSize: 13,
    fontFamily: REGULAR_FONT,
  },
  typingUsersList: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
});
export default styles;
