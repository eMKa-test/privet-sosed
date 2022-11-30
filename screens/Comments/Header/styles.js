import {StyleSheet} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    maxWidth: widthPercentageToDP(65),
    paddingBottom: 6,
  },
});

export default styles;
