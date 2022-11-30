import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  linearProgressRoot: {
    flexDirection: "row",
    height: 15,
    width: "100%",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "black",
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBar: {
    width: "90%",
    height: "100%",
  },
});

export default styles;
