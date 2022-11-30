import React, {useMemo} from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import {Divider} from "react-native-elements";
import Paragraph from "../../../../components/text/Paragraph";
import styles from "../../styles";
import EventMessage from "./EventMessage";
import {parseHtml} from "../../../../lib/parseHtml";
import MessageWrapper from "./MessageWrapper";
import {idProp} from "../../../../lib/utils";

const TYPES = Object.freeze({
  EVENT: "EVENT",
  TIME: "TIME",
  NEW: "NEW",
});

function MessageSwitch(props) {
  const {
    item, roomInfo, onSelectMessage, selected, animateMsg, handleAnimateMsg, toScrollQuoted, q,
  } = props;

  const type = useMemo(() => {
    if (item?.is_time) {
      return TYPES.TIME;
    }
    if (item?.is_new && item?.id === -1) {
      return TYPES.NEW;
    }
    if (item?.is_event) {
      return TYPES.EVENT;
    }
  }, [item]);

  switch (type) {
    case TYPES.TIME:
      return (
        <Paragraph
          center
          size={16}
          style={styles.eventMsg}>
          {item?.html}
        </Paragraph>
      );
    case TYPES.NEW:
      return (
        <View style={styles.newMessages}>
          <Divider style={styles.divider} />
          <Paragraph
            color="#75797e"
            style={styles.newMessagesTitle}
            size={16}>
            Непрочитанные сообщения
          </Paragraph>
        </View>
      );
    case TYPES.EVENT:
      return (
        <EventMessage data={parseHtml(item?.html)} />
      );
    default:
      return (
        <MessageWrapper
          q={q}
          animateMsg={animateMsg}
          afterAnimation={handleAnimateMsg}
          toScrollQuoted={toScrollQuoted}
          selected={selected}
          onSelectMessage={onSelectMessage}
          msg={item}
          room={roomInfo} />
      );
  }
}

MessageSwitch.propTypes = {
  item: PropTypes.shape({
    id: idProp,
    html: PropTypes.string,
    is_time: PropTypes.oneOf([0, 1, true, false]),
    is_new: PropTypes.oneOf([0, 1, true, false]),
    is_event: PropTypes.oneOf([0, 1, true, false]),
  }),
  onSelectMessage: PropTypes.func.isRequired,
  roomInfo: PropTypes.shape({
    room_id: idProp,
  }),
  selected: PropTypes.bool,
  handleAnimateMsg: PropTypes.func,
  toScrollQuoted: PropTypes.func,
  animateMsg: PropTypes.oneOfType([
    idProp,
    PropTypes.oneOf([null]),
  ]),
  q: PropTypes.string,
};

export default React.memo(MessageSwitch, (prevProps, nextProps) => {
  return prevProps?.item?.id === nextProps?.item?.id
    && prevProps.selected === nextProps.selected
    && prevProps?.item?.is_fav === nextProps?.item?.is_fav
    && prevProps?.animateMsg === nextProps?.animateMsg
    && prevProps?.item?.html === nextProps?.item?.html
    && prevProps?.item?.quoted === nextProps?.item?.quoted
    && prevProps?.item?.images?.length === nextProps?.item?.images?.length
    && prevProps?.item?.files?.length === nextProps?.item?.files?.length
    && prevProps?.item?.attached_link === nextProps?.item?.attached_link
    && prevProps?.q === nextProps?.q;
});
