import {StyleSheet} from "react-native";
import {MEDIUM_FONT, REGULAR_FONT} from "../../../../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    shadowColor: "#ebecee",
    borderBottomWidth: 2,
    borderColor: "#ebecee",
    zIndex: 2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 0,
  },
  dialogHeaderContainer: {
    paddingVertical: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerAnimate: {
    flex: 1,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  headerDialog: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  dialogHeaderTitle: {
    flex: 1,
    justifyContent: "space-between",
    minHeight: 40,
  },
  backButtonContainer: {
    paddingRight: 5,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  userStatus: {
    marginTop: 3,
    color: "#ABABAB",
    fontFamily: REGULAR_FONT,
  },
  titleWithGPSMarker: {
    flexDirection: "row",
    marginRight: 15,
  },
  gpsTitleContainer: {
    flexDirection: "row",
  },
  houseRoomTitle: {
    color: "#9bb2c3",
    marginLeft: 5,
    fontWeight: "500",
    fontFamily: MEDIUM_FONT,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 12,
  },
  roomStatusInfo: {
    height: 38,
    marginRight: 12,
  },
  msgPreviewHeaderDots: {
    height: "100%",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    flex: 1,
    margin: "1%",
  },
  customAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default styles;
