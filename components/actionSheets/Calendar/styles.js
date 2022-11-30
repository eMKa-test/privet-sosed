import {StyleSheet} from "react-native";
import {ORANGE_COLOR} from "../../../constants/Colors";

const styles = StyleSheet.create({
  todayTextStyle: {
    fontWeight: "bold",
  },
  selectedDayStyle: {
    backgroundColor: ORANGE_COLOR,
  },
  changePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  datePickerFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  timePickerButton: {
    flex: 1,
    alignItems: "center",
  },
  cancelPicker: {
    flex: 1,
  },
  submitPicker: {
    flex: 1,
    alignItems: "flex-end",
  },
  changePickerToDate: {
    flex: 1,
    alignItems: "center",
  },
  submitTimePicker: {
    position: "absolute",
    bottom: 5,
    right: 0,
  },
  timeRoot: {
    height: 240,
    justifyContent: "space-between",
  },
  timeControlBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30,
    paddingHorizontal: 40,
  },
  controlArrows: {
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeSeparator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowButton: {
    padding: 20,
  },
});

export default styles;
