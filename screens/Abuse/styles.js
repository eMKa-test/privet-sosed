import {StyleSheet} from "react-native";
import {WHITE} from "../../constants/Colors";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loaderContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  cancelButton: {
    marginRight: 15,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  submitButton: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginBottom: 0,
  },
  text: {
    marginBottom: 6,
  },
  abuseContent: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: WHITE,
  },
  checkboxOptions: {
    flexDirection: "column",
  },
  checkboxOption: {
    marginBottom: 10,
    flexDirection: "row",
  },
  checkboxIcon: {
    marginRight: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default styles;
