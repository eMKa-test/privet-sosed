import {Dimensions, Platform, StyleSheet} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import Constants from "expo-constants";
import {BOLD_FONT, MEDIUM_FONT, REGULAR_FONT} from "../../constants/Vars";
import {MAX_WIDTH, MODAL_BORDER_WIDTH, WIDTH} from "../../constants/Layout";
import {WHITE} from "../../constants/Colors";

export const COLS = 3;
export const GAP = 3;

const CARD_SIZE = ((WIDTH > MAX_WIDTH ? MAX_WIDTH : WIDTH) - (MODAL_BORDER_WIDTH * 2)) / COLS - (GAP * 1.25);

const styles = StyleSheet.create({
  // react native community modal
  modal: {
    alignSelf: "center",
    margin: 0,
    width: widthPercentageToDP(100),
    maxWidth: MAX_WIDTH,
    height: heightPercentageToDP(100),
    borderWidth: MODAL_BORDER_WIDTH,
    borderRadius: 6,
    borderColor: "transparent",
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    marginRight: GAP,
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
  },
  flatListRow: {
    marginTop: GAP,
    marginLeft: GAP,
  },
  modalContent: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 6,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalHeaderText: {
    marginLeft: 8,
    color: WHITE,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: BOLD_FONT,
    marginRight: 8,
  },
  modalHeaderHelper: {
    color: WHITE,
    fontWeight: "500",
    fontFamily: MEDIUM_FONT,
  },

  // react native standard modal
  modalOverlay: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
  },
  RNmodalContent: {
    width: widthPercentageToDP(100),
    maxWidth: 500,
    position: "absolute",
    top: 0,
    backgroundColor: WHITE,
    overflow: "hidden",
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: REGULAR_FONT,
    color: WHITE,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  modalBody: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modalParagraph: {
    paddingBottom: 6,
  },
  modalFooter: {
    marginTop: 30,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelButton: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 20,
    marginRight: 15,
  },
  confirmButton: {
    marginBottom: 0,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
});

const {width, height} = Dimensions.get("window");

export const lightboxStyles = {
  closeButton: {
    paddingLeft: 10,
    paddingTop: 9,
    paddingRight: 8,
    paddingBottom: 10,
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: 2,
    top: 0,
    right: 0,
    backgroundColor: "rgba(30, 30, 30, 0.6)",
  },
  content: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "#000",
  },
  wrapper: {
    ...StyleSheet.absoluteFill,
    zIndex: -1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    backgroundColor: "black",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
};

export const filterStyles = StyleSheet.create({
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
});

export const lightBoxStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  modal: {
    margin: 0,
  },
  overlay: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countHeader: {
    color: "#ccc",
    paddingHorizontal: 10,
  },
  headerPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  videoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    borderLeftWidth: 15,
    borderLeftColor: "#ccc",
    borderTopWidth: 10,
    borderTopColor: "transparent",
    borderBottomWidth: 10,
    borderBottomColor: "transparent",
    marginLeft: 5,
  },
  panelButton: {
    padding: 10,
  },
  content: {
    marginVertical: 50,
    width: "100%",
  },
  imageContent: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backgroundVideo: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
});

export default styles;
