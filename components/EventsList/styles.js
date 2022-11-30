import {StyleSheet} from "react-native";
import cardStyles from "../card/styles";

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 0,
    paddingBottom: 40,
  },
  refreshing: {
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 20,
  },
  newPost: {
    ...cardStyles.root,
    marginBottom: 20,
    paddingTop: 0,
    paddingBottom: 10,
  },
  header: {
    ...cardStyles.header,
    paddingTop: 8,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatar: {
    width: 46,
    height: 46,
    backgroundColor: "#eee",
    borderRadius: 23,
    marginRight: 12,
  },
  content: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  postText: {
    color: "#333",
    fontSize: 14,
  },
  html: {
    padding: 10,
    paddingTop: 5,
  },
  tabsFilterRoot: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tabsFilterItem: {
    paddingBottom: 10,
    marginRight: 10,
  },
  activeTabFilter: {
    borderBottomWidth: 2,
    borderColor: "#e99114",
  },
});

export default styles;
