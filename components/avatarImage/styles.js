import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: "flex-start",
  },
  avatarStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 10,
    marginRight: 10,
  },
  onlineIndicator: {
    position: "absolute",
    right: 11,
    bottom: 1,
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 7,
    backgroundColor: "#67b457",
  },
});

export default styles;
