import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  optionInputContainer: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
  },
  option: {
    flex: 1,
    borderWidth: 2,
    borderColor: "rgba(155,178,195,.4)",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 4,
  },
  optionPlaceholder: {
    fontSize: 15,
    marginTop: 0,
    marginBottom: 0,
    color: "#565656",
  },
  trash: {
    marginLeft: 8,
    marginTop: 8,
    width: 30,
  },
  backgroundSelect: {
    marginTop: 10,
    marginBottom: 5,
  },
  backgroundsScroll: {
    paddingBottom: 10,
  },
  colorCard: {
    marginRight: 10,
    alignItems: "center",
  },
  cardBG: {
    width: 80,
    height: 80,
    borderRadius: 3,
    overflow: "hidden",
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 8,
  },
  whiteBG: {
    borderColor: "rgba(155,178,195,.4)",
  },
  configTitle: {
    fontSize: 14,
    marginBottom: 15,
  },
  configRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  configRowCheckbox: {
    alignSelf: "flex-start",
  },
  configRowLabel: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 6,
    fontSize: 14,
  },
});

export default styles;
