import {StyleSheet} from "react-native";
import {BOLD_FONT, REGULAR_FONT} from "../../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 8,
    marginTop: 15,
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  dotsWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  dotsStyle: {
    marginTop: 20,
    marginRight: 10,
    marginBottom: 20,
    width: 24,
    height: 5,
  },
  titleWrapper: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 50,
  },
  title: {
    fontFamily: BOLD_FONT,
    fontSize: 27,
    textAlign: "center",
    marginBottom: 10,
  },
  status: {
    flexDirection: "row",
  },
  pollType: {
    fontFamily: REGULAR_FONT,
    fontSize: 14,
  },
  option: {
    marginBottom: 15,
    borderRadius: 3,
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  optionLeftSide: {
    width: "75%",
    flexDirection: "row",
  },
  optionRightSide: {
    flexDirection: "row",
  },
  optionText: {
    fontFamily: REGULAR_FONT,
    fontSize: 14,
  },
  optionPercents: {
    fontFamily: BOLD_FONT,
    fontSize: 14,
  },
  dotContainer: {
    marginHorizontal: 4,
  },
  footerContainer: {
    alignItems: "center",
  },
  pollFooterWrapper: {
    height: 35,
  },
  voteButton: {
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  voteButtonText: {
    fontFamily: REGULAR_FONT,
    fontSize: 14,
  },
  countVotes: {
    paddingVertical: 8,
  },
  countVotesText: {
    fontFamily: REGULAR_FONT,
    fontSize: 14,
  },
  bottomText: {
    textAlign: "center",
    fontSize: 13,
    opacity: 0.6,
    marginTop: 10,
  },
});

export default styles;
