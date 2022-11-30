import {StyleSheet} from "react-native";
import cardStyles from "../../card/styles";

const styles = StyleSheet.create({
  root: {
    ...cardStyles.tags,
    marginTop: 10,
  },
  text: {
    color: "#9bb2c3",
    fontSize: 14,
  },
});

export default styles;
