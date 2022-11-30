import {StyleSheet} from "react-native";

export const switchStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 12,
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

export const privacySettingsStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  blockContent: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
});

const indexStyles = StyleSheet.create({
  submitButton: {
    marginTop: 30,
    marginBottom: 10,
  },
});

export default indexStyles;
