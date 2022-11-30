import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  linkContainer: {
    flex: 1,
    marginTop: 5,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 2,
    borderColor: "rgba(155,178,195,.4)",
  },
  renderLinkCol: {
    flexDirection: "column",
  },
  renderLinkRow: {
    flexDirection: "row",
    flex: 1,
  },
  comments: {
    borderLeftWidth: 3,
    borderLeftColor: "rgba(155,178,195,.4)",
  },
  linkThumbContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    borderBottomColor: "rgba(155,178,195,.4)",
  },
  linkThumb: {
    flex: 1,
  },
  rowThumb: {
    width: 200,
    height: 150,
  },
  linkInfo: {
    padding: 10,
  },
  linkDomain: {
    marginTop: 5,
  },
});

export default styles;
