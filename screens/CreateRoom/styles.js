import {Platform, StyleSheet} from "react-native";
import {MAIN_COLOR, WHITE} from "../../constants/Colors";
import {REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    backgroundColor: WHITE,
    flex: 1,
  },
  userListNoUsers: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    paddingVertical: 25,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  loader: {
    marginVertical: 10,
  },
  roomModalLinearGradient: {
    flexDirection: "row",
    alignItems: "center",
  },
  roomModalRoot: {
    margin: 0,
  },
  roomModalOverlay: {
    flex: 1,
    backgroundColor: "#fff",
  },
  roomModalWithRightClose: {
    flex: 1,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchSection: {
    backgroundColor: "#fff",
    paddingTop: 10,
    zIndex: 2,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(235, 236, 238, 1)",
        shadowOpacity: 0.35,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: 3,
        },
      },
      android: {
        elevation: 0,
      },
    }),
  },
  searchHouseInput: {
    position: "relative",
    borderWidth: 1,
    marginTop: -10,
    borderColor: "#fff",
    paddingLeft: 10,
    paddingRight: 20,
    ...Platform.select({
      ios: {
        paddingVertical: 12,
        shadowColor: "rgba(235, 236, 238, 1)",
        shadowOpacity: 0.35,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
      android: {
        elevation: 0,
      },
    }),
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
  userCardDivider: {
    backgroundColor: "#eeedee",
  },
  userListCreatePanel: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  userListCreatePanelRoomName: {
    fontSize: 16,
    fontFamily: REGULAR_FONT,
    height: 32,
    flex: 1,
  },
  roomModalNoHouses: {
    fontSize: 14,
    fontFamily: REGULAR_FONT,
  },
  roomSelectDefault: {
    fontSize: 14,
    fontFamily: REGULAR_FONT,
  },
  selectHouse: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  usersLoader: {
    marginVertical: 10,
  },
});

export default styles;
