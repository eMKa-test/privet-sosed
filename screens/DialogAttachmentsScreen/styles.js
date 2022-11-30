import {StyleSheet} from "react-native";
import {REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapperContent: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    borderBottomWidth: 2,
    borderColor: "transparent",
    marginRight: 15,
  },
  selectedTab: {
    borderColor: "#e99114",
  },
  tabTitle: {
    fontSize: 17,
    paddingVertical: 10,
    color: "#a0a0a0",
    fontFamily: REGULAR_FONT,
  },
  selectedTabTitle: {
    color: "#1A1A1A",
  },
  gridContainer: {
    marginTop: 5,
  },
  gridImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
  },
  imageWrap: {
    width: "32.33%",
    margin: "0.5%",
  },
  imageItem: {
    width: "100%",
  },
  gridVideoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
  },
  videoWrap: {
    width: "32.33%",
    margin: "0.5%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  videoPlayButton: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    position: "absolute",
    right: 5,
    bottom: 5,
    paddingHorizontal: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  linkContainer: {
    marginTop: 10,
    borderColor: "rgba(155,178,195,.4)",
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  linkThumbContainer: {
    width: 80,
    height: "100%",
    borderRightColor: "rgba(155,178,195,.4)",
    borderRightWidth: 1,
  },
  linkThumb: {
    flex: 1
  },
  linkThumbStub: {
    width: 80,
    height: "100%",
  },
  linkBody: {
    padding: 10,
    flex: 1,
  },
  linkTitle: {
    marginBottom: 6,
  },
  noItemsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  noItemsTitle: {
    fontSize: 17,
    fontFamily: REGULAR_FONT,
  },
  loader: {
    marginTop: 30,
  },
});

export default styles;
