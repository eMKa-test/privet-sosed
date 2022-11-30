import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  itemCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoWrapper: {
    width: 35,
    flexDirection: "row",
    justifyContent: "center",
  },
  socialTitle: {
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
  },
  switchContainer: {
    width: 48,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    padding: 0,
  },
});

export default styles;
