import React from "react";
import * as PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {declensionOfNumbers} from "../../../lib/utils";
import Loader from "../../loader";
import {
  ONE_OR_FEW_PEOPLE, ONE_VOTE, TWO_OR_FEW_VOTES, TWO_PEOPLE, VOTE_FIRST,
} from "./helpers";

function PollFooter(props) {
  const {
    votes, loading, colors, extraColors, voted, onVote,
  } = props;

  if (loading) {
    return (
      <Loader
        color={colors?.loaderColor}
        active />
    );
  }

  if (!loading && votes?.length > 0) {
    return (
      <TouchableOpacity onPress={() => { onVote(votes); }}>
        <View style={[styles.voteButton, extraColors?.buttonColor]}>
          <Text style={styles.voteButtonText}>
            Проголосовать
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!loading && votes?.length === 0) {
    return (
      <View style={styles.countVotes}>
        <Text style={[styles.countVotesText, colors?.secondColor]}>
          {voted ? `${declensionOfNumbers(
            voted,
            ONE_VOTE,
            TWO_OR_FEW_VOTES,
            TWO_OR_FEW_VOTES,
          )} ${voted} ${declensionOfNumbers(
            voted,
            ONE_OR_FEW_PEOPLE,
            TWO_PEOPLE,
            ONE_OR_FEW_PEOPLE,
          )}` : VOTE_FIRST}
        </Text>
      </View>
    );
  }

  return null;
}

PollFooter.propTypes = {
  votes: PropTypes.arrayOf(PropTypes.number),
  loading: PropTypes.bool,
  colors: PropTypes.shape({
    optionBGColor: PropTypes.shape({
      color: PropTypes.string,
    }),
    mainColor: PropTypes.shape({
      color: PropTypes.string,
    }),
    optionVotesColor: PropTypes.shape({
      color: PropTypes.string,
    }),
    checkboxColor: PropTypes.shape({
      borderColor: PropTypes.string,
      backgroundColor: PropTypes.string,
    }),
    checkMarkColor: PropTypes.shape({
      borderBottomColor: PropTypes.string,
      borderLeftColor: PropTypes.string,
    }),
  }),
  extraColors: PropTypes.shape({
    buttonColor: PropTypes.shape({
      backgroundColor: PropTypes.string,
      color: PropTypes.string,
    }),
  }),
  voted: PropTypes.number,
  onVote: PropTypes.func,
};

export default React.memo(PollFooter);
