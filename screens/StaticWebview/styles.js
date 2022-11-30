import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wvContainer: {
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  webview: {
    flex: 1,
    zIndex: 0,
  },
});

export default styles;
