import {StyleSheet} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../constants/Layout";

export const headerStyles = StyleSheet.create({
  root: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  panel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  panelButton: {
    padding: 10,
  },
  counter: {
    color: "#ccc",
    paddingHorizontal: 10,
  },
});

export const videoStyles = StyleSheet.create({
  videoWrapper: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",

  },
  video: {
    maxHeight: "50%",
    backgroundColor: "#000",
  },
});

export const lightBoxStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.97)",
  },
  viewPager: {
    flex: 1,
  },
});

export default null;
