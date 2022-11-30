import React, {
  useCallback, memo, useState, useRef, useEffect,
} from "react";
import * as PropTypes from "prop-types";
import {View, ScrollView} from "react-native";
import isEmpty from "lodash/isEmpty";
import styles from "../styles";
import {idProp, keyExtractor} from "../../../lib/utils";
import Loader from "../Loader";
import ThemeLoader from "../../../components/loader";
import MessageSwitch from "../components/MessageSwitch";
import {checkSelected} from "../reducer";
import Paragraph from "../../../components/text/Paragraph";
import TypingMessage from "../components/TypingMessage";
import setLastViewed from "../../../lib/api/chat/set-last-viewed";

function MessagesList(props) {
  const {
    dialogState,
    fetchOnScroll,
    onSelectMessage,
    handleAnimateMsg,
    toScrollQuoted,
    dismissQuotedScroll,
    msgId,
    typing = [],
  } = props;

  const {
    msgLoaded,
    messages,
    info: roomInfo,
    loading: topLoading,
    bottomLoading,
    selectedItems,
    animateMsg,
    q,
    isFetchQuoted,
  } = dialogState;

  const [firstRender, setFirstRender] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [scroll, scrollParams] = useState({y: 0, height: 0, containerHeight: 0});

  const ref = useRef();

  useEffect(() => {
    if (msgLoaded && messages.length === 0 && contentHeight === 0 && !firstRender) {
      setFirstRender(true);
    }
  }, [messages, contentHeight, firstRender, msgLoaded]);

  let timer = 0;
  const onContentSizeChange = useCallback((w, _h) => {
    clearTimeout(timer);
    const h = Math.round(_h);
    setContentHeight(h);
    const {current: listRef} = ref;
    if (!firstRender && !msgId) {
      listRef.scrollToEnd({animated: false});
      fetchOnScroll(1);
      setFirstRender(true);
    }
    if (isFetchQuoted && listRef) {
      listRef.scrollTo({
        x: 0,
        y: h,
        animated: false,
      });
      timer = setTimeout(() => {
        fetchOnScroll(1);
        dismissQuotedScroll();
      }, 300);
    }
    const {containerHeight, height, y} = scroll;
    const delta = height - h;
    if (!isFetchQuoted && h - containerHeight <= y - delta && h <= height) {
      listRef.scrollToEnd({animated: true});
    }
  }, [messages, firstRender, isFetchQuoted, scroll]);

  const onMomentumScrollEnd = useCallback((active) => ({nativeEvent}) => {
    if (!active) {
      return;
    }
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const offset = Math.round(contentOffset.y);
    const height = Math.round(contentSize.height - layoutMeasurement.height);
    if (height === offset) {
      fetchOnScroll(1);
      const lastMsg = messages[messages?.length - 1];
      if (lastMsg && lastMsg?.is_new) {
        setLastViewed(lastMsg.id).catch((e) => {
          console.sendError(`Err setLastViewed ${e.message}`);
        });
      }
    } else if (offset <= 0) {
      fetchOnScroll(-1);
    }
  }, [fetchOnScroll]);

  const onScroll = useCallback(({nativeEvent}) => {
    const {y} = nativeEvent.contentOffset;
    const {height} = nativeEvent.contentSize;
    const {height: containerHeight} = nativeEvent.layoutMeasurement;
    scrollParams({y: Math.round(y), height: Math.round(height), containerHeight});
  }, []);

  if (isEmpty(messages)) {
    return !firstRender ? (
      <ThemeLoader
        active
        containerStyle={styles.dialogLoader} />
    ) : (
      <View style={[styles.listContainer, {justifyContent: "flex-end"}]}>
        <Paragraph
          center
          size={16}
          style={styles.noMsgs}>
          Нет новых сообщений
        </Paragraph>
      </View>
    );
  }

  const busy = topLoading || bottomLoading;

  return (
    <View style={styles.listContainer}>
      <View style={styles.topLoaderContainer}>
        <Loader loading={topLoading} />
      </View>
      <ScrollView
        ref={ref}
        scrollEventThrottle={500}
        onScroll={onScroll}
        contentContainerStyle={styles.IOSContentContainerStyle}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        onContentSizeChange={onContentSizeChange}
        onMomentumScrollEnd={onMomentumScrollEnd(!busy)}>
        {messages?.map((item, idx) => (
          <MessageSwitch
            q={q}
            toScrollQuoted={toScrollQuoted}
            handleAnimateMsg={handleAnimateMsg}
            animateMsg={animateMsg}
            key={keyExtractor(item, idx)}
            selected={checkSelected(item?.id, selectedItems)}
            onSelectMessage={onSelectMessage}
            item={item}
            roomInfo={roomInfo} />
        ))}
        <View>
          <TypingMessage typing={typing} />
          <Loader loading={bottomLoading} />
        </View>
      </ScrollView>
    </View>
  );
}

MessagesList.propTypes = {
  typing: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
    title: PropTypes.string,
  })),
  fetchOnScroll: PropTypes.func,
  onSelectMessage: PropTypes.func.isRequired,
  dialogState: PropTypes.shape({
    info: PropTypes.shape({
      room_id: idProp,
    }),
    loading: PropTypes.bool,
    isFetchQuoted: PropTypes.bool,
    bottomLoading: PropTypes.bool,
    messages: PropTypes.arrayOf(PropTypes.object),
    selectedItems: PropTypes.arrayOf(PropTypes.object),
    animateMsg: PropTypes.oneOfType([
      idProp,
      PropTypes.oneOf([null]),
    ]),
    q: PropTypes.string,
    msgLoaded: PropTypes.bool,
  }),
  msgId: PropTypes.oneOfType([
    idProp,
    PropTypes.oneOf([null]),
  ]),
  q: PropTypes.string,
  handleAnimateMsg: PropTypes.func,
  dismissQuotedScroll: PropTypes.func,
  toScrollQuoted: PropTypes.func,
};

export default memo(MessagesList);
