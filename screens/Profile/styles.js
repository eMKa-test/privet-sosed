import {StyleSheet} from "react-native";
import {cardShadow} from "../../components/card/styles";
import {CARD_BORDER, WHITE} from "../../constants/Colors";
import {BOLD_FONT, LIGHT_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
  },
  block: {
    ...cardShadow,
    borderColor: CARD_BORDER,
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: WHITE,
  },
  blockTitle: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    backgroundColor: "rgba(155,178,195,.05)",
  },
  blockContent: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  description: {
    fontFamily: LIGHT_FONT,
    fontWeight: "300",
    color: "#8d8d8d",
    fontSize: 13,
  },
  infoBlock: {
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  linkButton: {
    justifyContent: "flex-start",
    paddingLeft: 0,
  },
  linkButtonText: {
    fontFamily: BOLD_FONT,
    fontWeight: "700",
    fontSize: 14,
  },
  loader: {
    marginBottom: 20,
  },
  divider: {
    backgroundColor: "#e5e5e5",
  },
  rowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownOptionAction: {
    paddingVertical: 5,
    flex: 1,
  },
  labelOption: {
    flex: 2,
  },
});

export default styles;
