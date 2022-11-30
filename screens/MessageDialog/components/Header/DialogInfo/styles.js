import {StyleSheet} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {MODAL_BORDER_WIDTH} from "../../../../../constants/Layout";
import {MEDIUM_FONT, REGULAR_FONT} from "../../../../../constants/Vars";

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    borderWidth: MODAL_BORDER_WIDTH,
    borderColor: "transparent",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 6,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerInfoTitle: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  modalHeaderText: {
    fontFamily: REGULAR_FONT,
    fontSize: 20,
    color: "#FFFFFF",
    marginHorizontal: 8,
  },
  modalBody: {
    flex: 1,
    paddingTop: 15,
  },
  roomHeader: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  roomAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
  },
  roomInfoBody: {
    flex: 1,
    marginLeft: 10,
  },
  roomTitle: {
    color: "#333",
    fontFamily: MEDIUM_FONT,
    fontSize: 16,
    marginBottom: 6,
    marginRight: 15,
  },
  roomAddress: {
    flexDirection: "row",
  },
  roomAddressTitle: {
    marginLeft: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  tab: {
    marginRight: 15,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButton: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomColor: "#e99114",
  },
  userItemContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#eeedee",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  userHeader: {
    flex: 1,
  },
  userTitle: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  titleMargin: {
    marginRight: 10,
  },
  userCreator: {
    backgroundColor: "rgba(155,178,195,.2)",
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  userActionMenu: {
    height: "100%",
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLoader: {
    marginVertical: 20,
  },
  divider: {
    backgroundColor: "#eeedee",
  },
  customAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 10,
  },
});

export default styles;
