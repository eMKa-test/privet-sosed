import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
  },
  commentWrapper: {
    flexDirection: "row",
  },
  avatar: {
    width: 36,
    height: 36,
    backgroundColor: "#eee",
    borderRadius: 23,
    marginRight: 10,
  },
  deleteMessage: {
    paddingTop: 6,
  },
  commentBody: {
    flex: 1,
  },
  commentDivider: {
    marginLeft: 34,
    marginVertical: 10,
  },
  commentsFooterText: {
    paddingTop: 4,
    paddingRight: 10,
  },
  loader: {
    marginVertical: 10,
  },
  repliesSection: {
    marginLeft: 46,
  },
});

export default styles;
