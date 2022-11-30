import {StyleSheet} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {REGULAR_FONT} from "../../constants/Vars";
import {MAX_WIDTH} from "../../constants/Layout";
import {DEFAULT_BORDER} from "../../constants/Colors";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  createAddrRoot: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  helper: {
    paddingLeft: 50,
    paddingTop: 15,
    paddingBottom: 15,
  },
  helperText: {
    fontFamily: REGULAR_FONT,
    fontSize: 16,
    color: "#a0a0a0",
  },
  mapIcon: {
    resizeMode: "contain",
    marginBottom: 20,
  },
  newAddrForms: {
    paddingHorizontal: 15,
    paddingTop: 30,
    marginBottom: 20,
    width: widthPercentageToDP(100),
    maxWidth: MAX_WIDTH,
    alignSelf: "center",
  },
  uploadDocsTitle: {
    marginTop: 24,
    paddingHorizontal: "5%",
    maxWidth: MAX_WIDTH,
    alignSelf: "center",
  },
  uploadDocs: {
    paddingHorizontal: 15,
    paddingTop: 20,
    marginBottom: 20,
    width: widthPercentageToDP(100),
    maxWidth: MAX_WIDTH,
    alignSelf: "center",
  },
  dropZone: {
    borderRadius: 4,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: DEFAULT_BORDER,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 30,
  },
  uploadRows: {
    marginBottom: 30,
  },
  dropZoneTitle: {
    marginBottom: 6,
  },
  loader: {
    paddingVertical: 16,
  },
});

export default styles;
