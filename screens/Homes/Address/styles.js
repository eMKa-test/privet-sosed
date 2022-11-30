import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import cardStyles from "../../../components/card/styles";

const styles = StyleSheet.create({
  root: {
    ...cardStyles.root,
    borderTopWidth: 0,
    borderBottomWidth: 1,
  },
  dropdownToggler: {
    ...cardStyles.dropdown,
  },
  dropdownOptionsHeaderText: {
    fontSize: 18,
  },
  addressRow: {
    flexDirection: "row",
    paddingVertical: 20,
    alignItems: "center",
  },
  addressIcon: {
    marginLeft: 15,
    marginRight: 15,
    ...Platform.select({
      android: {
        marginTop: 5,
      },
    }),
  },
  address: {
    flex: 1,
    marginRight: widthPercentageToDP(18),
  },
  addressFullname: {
    fontSize: 17,
    marginBottom: 4,
  },
  addressRegion: {
    color: "#a0a0a0",
    fontSize: 15,
  },
});

export default styles;
