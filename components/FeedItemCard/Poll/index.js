/* eslint-disable camelcase */
import React from "react";
import * as PropTypes from "prop-types";
import {Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import styles from "./styles";
import DotSeparator from "../../../screens/Comments/DotSeparator";
import {idProp} from "../../../lib/utils";
import {
  PUBLIC_POLL, ANONYMOUS_POLL,
  RESULTS_AFTER_POLL_OVER,
  NO_GRADIENT, ORANGE_GRADIENT, BLUE_GRADIENT,
  GREEN_GRADIENT, PURPLE_GRADIENT, GREY_GRADIENT,
  GRADIENT_START, GRADIENT_END,
  DARK_COLORS, LIGHT_COLORS,
  ADD_VOTE, DELETE_VOTE,
  EXTRA_WHITE, EXTRA_ORANGE, EXTRA_BLUE,
  EXTRA_GREEN, EXTRA_PURPLE, EXTRA_GREY,
} from "./helpers";
import DropdownActionSheet from "../../actionSheets/Dropdown";
import Anchor from "../../dropdown/Anchor";
import Option from "./Option";
import PollFooter from "./PollFooter";
import usePoll from "../../../lib/hooks/usePoll";

const dropdownOptions = [
  {id: 0, label: "Отменить голос"},
];

function Poll(props) {
  const {poll, postId} = props;

  if (!poll) {
    return null;
  }

  const {style} = poll;
  const [openModal, setOpenModal] = React.useState(false);
  const [state, onVote, unVote, setPollData, setColorTheme, setVotes] = usePoll({postId});
  const {
    data, votes, loading, gradient, colors, extraColors, afterVote,
  } = state;
  const {
    is_anonymous: isAnonymous = 0, left_time: leftTime = "", is_secret: isSecret = 0, voted,
    is_multiple: isMultiple, is_voted: isVoted, is_finished: isFinished, is_one_time: isOneTime,
  } = data;

  const handleColorTheme = React.useCallback(() => {
    switch (style) {
      case "2":
        setColorTheme(ORANGE_GRADIENT, LIGHT_COLORS, EXTRA_ORANGE);
        break;
      case "3":
        setColorTheme(BLUE_GRADIENT, LIGHT_COLORS, EXTRA_BLUE);
        break;
      case "4":
        setColorTheme(GREEN_GRADIENT, LIGHT_COLORS, EXTRA_GREEN);
        break;
      case "5":
        setColorTheme(PURPLE_GRADIENT, LIGHT_COLORS, EXTRA_PURPLE);
        break;
      case "6":
        setColorTheme(GREY_GRADIENT, LIGHT_COLORS, EXTRA_GREY);
        break;
      default:
        setColorTheme(NO_GRADIENT, DARK_COLORS, EXTRA_WHITE);
    }
  }, [style]);

  React.useEffect(() => {
    handleColorTheme();
  }, [style]);

  React.useEffect(() => {
    setPollData(poll);
  }, [poll]);

  const openDropdown = () => {
    setOpenModal(true);
  };

  const onDropdownSelect = (option) => {
    switch (option.id) {
      case 0:
        unVote();
        break;
      default:
    }
  };

  const handleVotes = (type, voteId, oldVotes) => {
    const newVotes = [...oldVotes];
    switch (type) {
      case ADD_VOTE:
        newVotes.push(voteId);
        setVotes(newVotes);
        break;
      case DELETE_VOTE: {
        const position = newVotes.indexOf(voteId);
        newVotes.splice(position, 1);
        setVotes(newVotes);
        break;
      }
      default:
    }
  };

  return (
    <React.Fragment>
      {data?.options && colors ? (
        <View style={styles.root}>
          <LinearGradient
            style={[styles.gradient, colors?.outerBorder]}
            colors={gradient}
            start={GRADIENT_START}
            end={GRADIENT_END}>
            {isVoted && !isOneTime && !isFinished ? (
              <View style={styles.dotsWrapper}>
                <Anchor
                  style={styles.dotsStyle}
                  onPress={openDropdown}
                  color={colors?.dotsColor} />
              </View>
            ) : null}
            <View style={styles.titleWrapper}>
              <Text style={[styles.title, colors?.mainColor]}>
                {data?.text}
              </Text>
              <View style={styles.status}>
                <Text style={[styles.pollType, colors?.secondColor]}>
                  {isAnonymous ? ANONYMOUS_POLL : PUBLIC_POLL}
                </Text>
                {leftTime ? (
                  <React.Fragment>
                    <DotSeparator
                      containerStyles={styles.dotContainer}
                      dotStyles={{backgroundColor: colors?.secondColor?.color}} />
                    <Text style={[styles.pollType, colors?.secondColor]}>
                      {leftTime}
                    </Text>
                  </React.Fragment>
                ) : null}
              </View>
            </View>
            {data?.options && data?.options.map((option) => (
              <Option
                key={option?.id}
                option={option}
                colors={colors}
                isMultiple={isMultiple}
                isVoted={isVoted}
                loading={loading}
                onVote={onVote}
                votes={votes}
                handleVotes={handleVotes}
                afterVote={afterVote} />
            ))}
            <View
              style={styles.footerContainer}>
              <View style={styles.pollFooterWrapper}>
                <PollFooter
                  votes={votes}
                  loading={loading}
                  colors={colors}
                  extraColors={extraColors}
                  voted={voted}
                  onVote={onVote} />
              </View>
              {isSecret && !isFinished ? (
                <Text style={[styles.bottomText, colors?.secondColor]}>
                  {RESULTS_AFTER_POLL_OVER}
                </Text>
              ) : null}
            </View>
          </LinearGradient>
        </View>
      ) : null}
      <DropdownActionSheet
        open={openModal}
        dismiss={() => {
          setOpenModal(false);
        }}
        options={dropdownOptions}
        onSelect={onDropdownSelect} />
    </React.Fragment>
  );
}

Poll.propTypes = {
  poll: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      voted: PropTypes.number,
      start_time: PropTypes.string,
      is_anonymous: PropTypes.number,
      left_time: PropTypes.string,
      percent: PropTypes.number,
      is_secret: PropTypes.number,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: idProp,
          my_vote: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
      is_multiple: PropTypes.bool,
      is_voted: PropTypes.bool,
      is_finished: PropTypes.bool,
    }),
  ]),
  postId: idProp,
};

export default React.memo(Poll);
