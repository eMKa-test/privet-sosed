import { StyleSheet } from "react-native";

const baseStyleAvatar = {
  marginLeft: 10,
  marginRight: 10,
  borderRadius: 50,
  backgroundColor: "#f5f7f9",
};


const styles = StyleSheet.create({
  msgPreviewAvatar: {
    ...baseStyleAvatar,
  },
  defaultMsgPreviewAvatar: {
    ...baseStyleAvatar,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f7f9",
  },
  msgPreviewOwnLastMsg: {
    fontWeight: "500",
    fontSize: 15,
  },
  avatarUsersContainer: {
    ...baseStyleAvatar,
    overflow: "hidden",
    backgroundColor: "#fff",

  },
  noMargin: {
    marginLeft: 0,
    marginRight: 0,
  },
  avaGrid: {
    marginLeft: -2,
    marginTop: -2,
    flexWrap: "wrap",
  },
});
export default styles;
