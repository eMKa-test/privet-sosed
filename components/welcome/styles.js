import {StyleSheet} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "visible",
  },
  topBlock: {
    flex: 1,
    backgroundColor: "#F4F7FC",
    zIndex: 2,
  },
  bottomBlock: {
    flex: 1.1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  bottomText: {
    maxWidth: 450,
    marginTop: heightPercentageToDP("5%"),
    marginHorizontal: widthPercentageToDP("5%"),
  },
  children: {
    marginTop: heightPercentageToDP("3%"),
    // marginBottom: heightPercentageToDP("4%"),
  },
});

export default styles;
