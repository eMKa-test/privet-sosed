import React, {useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import memoize from "lodash/memoize";
import {
  View, TouchableOpacity, Animated, Easing,
} from "react-native";
import styles from "../../styles";
import Avatar from "../../../../components/MsgCard/Avatar";
import Message from "./Message";
import {idProp} from "../../../../lib/utils";
import FavoriteIcon from "../../../../components/icons/favoriteFilled";
import CheckboxIcon from "../../../../components/icons/checkbox";
import ToUser from "../../../../components/ToUserProfile";

const viewStyles = memoize((isMy) => {
  return [styles.rootMsg, isMy ? styles.rootMsgMy : styles.rootMsgOther];
});

const favStyles = memoize((isMy) => {
  return [styles.favButtonIcon, isMy ? styles.myFav : styles.otherFav];
});

const selectedStyles = memoize((isMy) => [
  styles.selectButtonIcon,
  {transform: [{translateY: 20}]},
  isMy ? styles.mySelect : styles.otherSelect,
]);

function MessageWrapper(props) {
  const {
    msg, room, onSelectMessage, selected, toScrollQuoted, animateMsg, afterAnimation, q,
  } = props;
  const [select, setSelect] = useState(false);
  const [fade] = useState(new Animated.Value(1));

  const isFav = get(msg, "is_fav", "");
  const isMy = msg?.is_my;

  const onSelectItem = useCallback(() => {
    if (q) {
      toScrollQuoted(msg?.id);
    } else {
      onSelectMessage(msg?.id);
      setSelect(!select);
    }
  }, [select, q, isFav]);

  const ruleOfScrollToQuoted = useCallback((id) => {
    if (q) {
      return null;
    }
    toScrollQuoted(id);
  }, [q]);

  React.useEffect(() => {
    if (animateMsg === msg?.id) {
      Animated.timing(fade, {
        useNativeDriver: true,
        toValue: 0,
        duration: 1500,
        delay: 1000,
        easing: Easing.linear,
      }).start(() => {
        afterAnimation(null);
        Animated.timing(fade, {
          useNativeDriver: true,
          toValue: 1,
          duration: 100,
        }).start();
      });
    }
  }, [animateMsg]);

  return (
    <TouchableOpacity
      onLongPress={onSelectItem}
      activeOpacity={1}>
      <View style={viewStyles(isMy)}>
        <Animated.View
          style={[styles.animateBg, {
            backgroundColor: animateMsg === msg?.id ? "rgba(155,178,195,.2)" : "transparent",
            opacity: fade,
          }]} />
        {!isMy ? (
          <ToUser userId={msg?.user?.id}>
            <Avatar
              dialog={msg?.user}
              size={40}
              room={room} />
          </ToUser>
        ) : null}
        <Message
          onSelectItem={onSelectItem}
          toScrollQuoted={ruleOfScrollToQuoted}
          msg={msg}>
          {isFav ? (
            <TouchableOpacity style={favStyles(isMy)}>
              <FavoriteIcon size={20} />
            </TouchableOpacity>
          ) : null}
          {selected ? (
            <View
              style={selectedStyles(isMy)}>
              <CheckboxIcon checked />
            </View>
          ) : null}
        </Message>
      </View>
    </TouchableOpacity>
  );
}

MessageWrapper.propTypes = {
  msg: PropTypes.shape({
    id: idProp,
    is_my: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    title: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.shape({
      id: idProp,
    }),
  }),
  room: PropTypes.shape({
    room_id: idProp,
  }),
  onSelectMessage: PropTypes.func.isRequired,
  toScrollQuoted: PropTypes.func.isRequired,
  afterAnimation: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  animateMsg: PropTypes.oneOfType([
    idProp,
    PropTypes.oneOf([null]),
  ]),
  q: PropTypes.string,
};

export default React.memo(MessageWrapper);
