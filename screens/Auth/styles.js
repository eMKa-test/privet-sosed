import {StyleSheet} from "react-native";
import {iphoneX} from "../../lib/utils";
import {SCREEN_WIDTH, SCREEN_HEIGHT} from "../../constants/Layout";

export const [H] = Object.values(iphoneX("h", 75, 10));

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  topBar: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    marginBottom: 14,
    zIndex: 2,
  },
  row: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    height: H,
    justifyContent: "center",
  },
  title: {
    marginTop: 22,
    marginBottom: 4,
  },
  content: {
    alignItems: "center",
    ...iphoneX("paddingBottom", H + 18, 15),
  },
  footer: {
    position: "absolute",
    top: "100%",
    width: "100%",
    backgroundColor: "#F4F7FB",
    justifyContent: "center",
    alignItems: "center",
    ...iphoneX("paddingBottom", 1, 15),
    ...iphoneX("height", H, 15),
  },
  webView: {
    backgroundColor: "#fff",
    // flex: 1,
    borderWidth: 5,
  },
  loaderContainer: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
