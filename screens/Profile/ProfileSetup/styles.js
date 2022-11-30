import {StyleSheet} from "react-native";
import styles from "../styles";

const profileSetupStyles = StyleSheet.create({
  avatar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 15,
  },
  uploadButton: {
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: "#f4f7fb",
  },
  uploadButtonText: {
    fontSize: 14,
    color: "#9daabb",
  },
  divider: {
    ...styles.divider,
    marginBottom: 14,
    marginTop: 26,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 15,
  },
});

export const sexStyles = StyleSheet.create({
  root: {
    marginTop: 4,
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  ckeckbox: {
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
});

export default profileSetupStyles;
