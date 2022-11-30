import {StyleSheet} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import cardStyles from "../../components/card/styles";
import {REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loader: {
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    ...cardStyles.root,
    marginTop: 20,
    marginBottom: 120,
  },
  header: {
    ...cardStyles.header,
    paddingHorizontal: 10,
    paddingTop: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  containerPadding: {
    paddingHorizontal: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    backgroundColor: "#eee",
    borderRadius: 23,
    marginRight: 2,
  },
  input: {
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  submitButton: {
    width: widthPercentageToDP(60),
  },
  cancelEditButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "rgba(155,178,195,1)",
    paddingHorizontal: 20,
    marginLeft: 10,
    paddingTop: 6,
    paddingBottom: 8,
  },
  submitEditButton: {
    borderWidth: 2,
    borderColor: "transparent",
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  cancelEditButtonTitle: {
    color: "rgba(155,178,195,1)",
  },
  editPostButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editPostButton: {
    backgroundColor: "red",
  },
  filesList: {
    marginBottom: 20,
  },
  postTypeHelperContent: {
    backgroundColor: "rgba(155, 178, 195, 0.05)",
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputDateWrapper: {
    marginBottom: 10,
  },
  inputDatePlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    fontFamily: REGULAR_FONT,
    height: 40,
    paddingLeft: 12,
    borderColor: "#d7e0e7",
    borderWidth: 2,
    borderRadius: 4,
    color: "#333333",
  },
});

export default styles;
