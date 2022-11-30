import {StyleSheet} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {MAIN_COLOR} from "../../../../../constants/Colors";
import {REGULAR_FONT, BOLD_FONT} from "../../../../../constants/Vars";
import {MODAL_BORDER_WIDTH} from "../../../../../constants/Layout";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userListContainer: {
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userListInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userListAvatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  userListTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  userListCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 30,
  },
  userListCheckboxIcon: {
    width: 13,
    height: 7,
    marginLeft: 6,
    marginTop: 7,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  divider: {
    backgroundColor: "#eeedee",
  },
  userListCreatePanel: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#fafbfc",
    borderTopColor: "#eeedee",
    borderTopWidth: 1,
    minHeight: 32,
  },
  userListCreateRoomButton: {
    backgroundColor: MAIN_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  disabled: {
    opacity: 0.5,
  },
  userListCreateRoomButtonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: REGULAR_FONT,
  },
  usersLoader: {
    marginVertical: 10,
  },
  modal: {
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
  modalHeaderText: {
    fontFamily: BOLD_FONT,
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginHorizontal: 8,
  },
  modalBody: {
    alignItems: "center",
  },
});

export default styles;
