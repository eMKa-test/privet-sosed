/* eslint-disable camelcase */
import React from "react";
import * as PropTypes from "prop-types";
import {
  Text, TouchableOpacity, View,
} from "react-native";
import styles from "./styles";
import CheckboxIcon from "../../icons/checkbox";
import CheckMark from "../../icons/checkMark";
import {idProp} from "../../../lib/utils";
import {ADD_VOTE, DELETE_VOTE} from "./helpers";
import ProgressBar from "../../progressBar";

function Option(props) {
  const {
    option, colors, isMultiple, isVoted, loading, onVote, votes, handleVotes, afterVote,
  } = props;

  const [checked, setChecked] = React.useState(false);

  const handleOptionPress = React.useCallback((id) => {
    if (isMultiple && !checked) {
      setChecked(true);
      handleVotes(ADD_VOTE, id, votes);
      return;
    }
    if (isMultiple && checked) {
      setChecked(false);
      handleVotes(DELETE_VOTE, id, votes);
      return;
    }
    onVote(id);
  }, [checked, votes]);

  React.useEffect(() => {
    if (votes?.length === 0) {
      setChecked(false);
    }
  }, [votes]);

  return (
    <TouchableOpacity
      onPress={() => { handleOptionPress(option?.id); }}
      disabled={isVoted || loading}
      style={[styles.option, colors?.optionBGColor]}>
      <ProgressBar
        percent={option?.percent}
        isAnimate={afterVote}
        color={colors?.optionProgressColor} />
      <View style={styles.optionContent}>
        <Text style={styles.optionLeftSide}>
          <Text style={[styles.optionText, colors?.mainColor]}>
            {option?.title}
          </Text>
          {option?.voted ? (
            <Text style={[styles.optionText, colors?.optionVotesColor]}>
              {` • ${option?.voted}`}
            </Text>
          ) : null}
        </Text>
        <View style={styles.optionRightSide}>
          {isMultiple && !isVoted ? (
            <CheckboxIcon
              style={colors?.checkboxColor}
              extendCheckedIconStyle={colors?.checkMarkColor}
              squared
              checked={checked} />
          ) : null}
          {option?.my_vote ? (
            <CheckMark color={colors?.mainColor?.color} />
          ) : null}
          {option?.percent ? (
            <Text style={[styles.optionPercents, colors?.mainColor]}>
              {`${option?.percent}%`}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

Option.propTypes = {
  option: PropTypes.shape({
    id: idProp,
    my_vote: PropTypes.number,
    title: PropTypes.string,
    percent: PropTypes.number,
  }),
  colors: PropTypes.shape({
    optionBGColor: PropTypes.shape({
      color: PropTypes.string,
    }),
    optionProgressColor: PropTypes.shape({
      backgroundColor: PropTypes.string,
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
  isMultiple: PropTypes.number,
  isVoted: PropTypes.bool,
  loading: PropTypes.bool,
  onVote: PropTypes.func,
  votes: PropTypes.arrayOf(PropTypes.number),
  handleVotes: PropTypes.func,
  afterVote: PropTypes.bool,
};

export default React.memo(Option);
