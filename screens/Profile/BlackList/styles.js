import {StyleSheet} from "react-native";
import cardStyles from "../../../components/card/styles";

const indexStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export const neighborsListStyles = StyleSheet.create({
  root: {
    // ...
  },
  flatlist: {
    ...cardStyles.root,
    flexGrow: 0,
    paddingBottom: 40,
    borderWidth: 0,
  },
  divider: {
    backgroundColor: "#eeedee",
    marginHorizontal: 10,
  },
});

export const userItemStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  info: {
    flex: 1,
    overflow: "hidden",
    minHeight: 70,
  },
  textLine: {
    marginBottom: 4,
  },
  dropdown: {
    ...cardStyles.dropdown,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default indexStyles;
