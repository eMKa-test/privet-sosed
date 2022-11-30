import {Platform, StyleSheet} from "react-native";
import cardStyles from "../../components/card/styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  districtItemRoot: {
    flex: 1,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    ...cardStyles.root,
    borderTopWidth: 0,
    borderBottomWidth: 1,
  },
  districtItemHeader: {
    marginLeft: 15,
    marginRight: 15,
    ...Platform.select({
      android: {
        marginTop: 5,
      },
    }),
  },
  districtItemBody: {
    flex: 1,
    flexDirection: "row",
  },
  districtName: {
    fontSize: 17,
    marginBottom: 4,
  },
  districtCity: {
    color: "#a0a0a0",
    fontSize: 15,
  },
  address: {
    flex: 1,
    flexDirection: "column",
  },
  districtItemFooter: {
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkToggler: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownToggler: {
    alignSelf: "flex-start",
    marginRight: 5,
    paddingTop: 0,
    paddingLeft: 5,
    paddingRight: 8,
    height: "100%",
  },
  loader: {
    marginVertical: 20,
  },
});

export default styles;
