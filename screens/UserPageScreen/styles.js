import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  rootUserPage: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },
  headerUserPage: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    height: 160,
    zIndex: 1,
    backgroundColor: "#F4F3F8",
  },
  bg: {
    flex: 1,
  },
  userMenu: {
    position: "absolute",
    right: 5,
    top: 5,
    padding: 15,
  },
  avatarContainer: {
    position: "absolute",
    top: 50,
    width: 130,
    height: 130,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 2,
  },
  userAvatar: {
    borderWidth: 5,
    borderColor: "#fff",
    borderRadius: 70,
    width: "100%",
    height: "100%",
  },
  userTitle: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    zIndex: 0,
  },
  userAddress: {
    backgroundColor: "#fff",
    marginTop: 30,
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 15,
    minHeight: 60,
  },
  userInfoWrapper: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoItem: {
    color: "#333",
  },
  iconContainer: {
    width: 22,
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 6,
  },
  personBadgeContainer: {
    zIndex: 4,
    position: "absolute",
    bottom: 8,
    right: 13,
    borderWidth: 4,
    borderColor: "#fff",
    width: 22,
    height: 22,
    backgroundColor: "#67b457",
    borderRadius: 10,
  },
  personalContainer: {
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  personInfoTitle: {
    marginBottom: 20,
  },
  aboutContainer: {
    marginBottom: 15,
  },
  aboutTitle: {
    marginBottom: 5,
  },
});

export default styles;
