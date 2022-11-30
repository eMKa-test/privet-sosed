import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gridRoot: {
    paddingHorizontal: 5,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    backgroundColor: "#fff",
    flexGrow: 1,
    flexBasis: "49%",
    margin: "0.5%",
  },
  image: {
    flex: 1,
  },
  thumbWrapper: {
    flex: 1,
    position: "relative",
  },
  thumbButton: {
    zIndex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: "50%",
    top: "50%",
    marginLeft: -25,
    marginTop: -25,
  },
  playIcon: {
    marginLeft: 5,
    borderLeftColor: "white",
    borderLeftWidth: 15,
    borderTopColor: "transparent",
    borderTopWidth: 10,
    borderBottomColor: "transparent",
    borderBottomWidth: 10,
  },
  videoDuration: {
    zIndex: 1,
    position: "absolute",
    right: 5,
    bottom: 5,
    paddingHorizontal: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});

export default styles;
