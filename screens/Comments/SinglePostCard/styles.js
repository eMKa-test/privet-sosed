import {StyleSheet} from "react-native";
import cardStyles from "../../../components/card/styles";


const footerText = {
  color: "#ABABAB",
  marginTop: 0,
  marginBottom: 0,
  fontSize: 14,
  marginLeft: 6,
};

const styles = StyleSheet.create({
  footer: {
    ...cardStyles.footer,
    marginTop: 15,
    paddingBottom: 12,
  },
  footerElement: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewsCount: {
    ...footerText,
  },
});

export default styles;
