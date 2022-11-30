import {StyleSheet} from "react-native";
import cardStyles from "../card/styles";

const footerText = {
  color: "#ABABAB",
  marginTop: 0,
  marginBottom: 0,
  fontSize: 14,
  marginLeft: 6,
};

const styles = StyleSheet.create({
  root: {
    ...cardStyles.root,
    marginBottom: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  refreshing: {
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 20,
  },
  header: {
    ...cardStyles.header,
    paddingTop: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  avatar: {
    width: 46,
    height: 46,
    backgroundColor: "#eee",
    borderRadius: 23,
    marginRight: 12,
  },
  street: {
    flexDirection: "row",
  },
  streetName: {
    marginLeft: 5,
  },
  dropdownToggler: {
    ...cardStyles.dropdown,
  },
  footer: {
    ...cardStyles.footer,
    marginTop: 15,
    paddingBottom: 12,
  },
  footerElement: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    color: "#ABABAB",
    marginTop: 0,
    marginBottom: 0,
    fontSize: 14,
  },
  likes: {
    ...footerText,
    marginRight: 22,
  },
  comments: {
    ...footerText,
  },
  viewsCount: {
    ...footerText,
  },
  linkContainer: {
    marginHorizontal: 8,
  },
  price: {
    marginLeft: 6,
    marginTop: 15,
  },
});

export default styles;
