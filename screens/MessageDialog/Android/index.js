import React, {
  useCallback, memo, useEffect, useReducer, useRef, Fragment,
} from "react";
import * as PropTypes from "prop-types";
import {View, ScrollView} from "react-native";
import isEmpty from "lodash/isEmpty";
import styles, {getStyle} from "../styles";
import {idProp, keyExtractor} from "../../../lib/utils";
import Loader from "../Loader";
import ThemeLoader from "../../../components/loader";
import MessageSwitch from "../components/MessageSwitch";
import {
  reducer,
  initialState,
  loadMessages,
  onReady,
  afterPrerenderDone,
  changeView,
  checkSelected,
  cb,
  renderTop,
  changeMessages,
} from "./helpers";
import Paragraph from "../../../components/text/Paragraph";
import TypingMessage from "../components/TypingMessage";

function MessagesList(props) {
  const {
    dialogState,
    fetchOnScroll,
    onSelectMessage,
    reset,
    onReady: afterReady,
    handleAnimateMsg,
    toScrollQuoted,
    typing = [],
    cancelChange,
  } = props;

  const {
    messages,
    info: roomInfo,
    loading: topLoading,
    bottomLoading,
    selectedItems,
    animateMsg,
    q,
    msgChanged,
  } = dialogState;

  const refs = {
    1: useRef(),
    2: useRef(),
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (msgChanged) {
      dispatch(changeMessages(messages));
      cancelChange();
    } else {
      dispatch(loadMessages(messages, reset));
    }
  }, [messages]);

  const onPrerenderLayout = useCallback(({nativeEvent: {layout: {height}}}) => {
    dispatch(afterPrerenderDone(height));
  }, []);

  let timer = 0;
  const onContentSizeChange = useCallback((idx, _reset) => () => {
    clearTimeout(timer);
    const {current: ref} = refs[idx];
    const {isOnTop, view, initialRender} = state;
    if (idx !== view) {
      // если событие от скрытого списка
      if (!initialRender && isOnTop) {
        // если это не первый рендер и событие загрузки сообщений сверху
        ref.scrollTo({
          x: 0,
          y: state?.offset || 0,
          animated: false,
        });
        timer = setTimeout(() => {
          dispatch(changeView());
          clearTimeout(timer);
          fetchOnScroll(-1);
        }, 150);
      }
      return;
    }
    if (_reset && idx === view) {
      ref.scrollToEnd({animated: true});
      fetchOnScroll(1);
      dispatch(onReady());
      afterReady();
      fetchOnScroll(-1);
    }
  }, [state]);

  const onMomentumScrollEnd = useCallback((active) => ({nativeEvent}) => {
    if (!active) {
      return;
    }
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const offset = Math.round(contentOffset.y);
    const height = Math.round(contentSize.height - layoutMeasurement.height);
    if (height === offset) {
      fetchOnScroll(1);
    }
  }, [fetchOnScroll]);

  const {
    lists, prerender, view, initialRender, isOnTop,
  } = state;

  const onScroll = useCallback(({nativeEvent}) => {
    const offset = Math.round(nativeEvent.contentOffset.y);
    if (offset <= 0) {
      dispatch(renderTop());
    }
  }, [fetchOnScroll, isOnTop]);

  if (isEmpty(messages)) {
    return initialRender ? (
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

  const busy = topLoading || bottomLoading || reset;

  return (
    <View style={styles.listContainer}>
      {initialRender && reset ? (
        <ThemeLoader
          active
          containerStyle={styles.firstLoader} />
      ) : null}

      {/* Заменяющие друг друга списки */}
      <ScrollView
        scrollEventThrottle={500}
        onScroll={onScroll}
        ref={refs[1]}
        onContentSizeChange={onContentSizeChange(1, reset)}
        style={getStyle(view === 1)}
        onMomentumScrollEnd={onMomentumScrollEnd(!busy && view === 1)}>
        {view === 1 ? (
          <Loader loading={topLoading || lists[1]?.length < messages?.length} />
        ) : null}
        {lists[1]?.map((item, idx) => (
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
        {view === 1 ? (
          <Fragment>
            {typing?.length > 0 && <TypingMessage typing={typing} />}
            <Loader loading={view === 1 && bottomLoading} />
          </Fragment>
        ) : null}
      </ScrollView>

      {/* Заменяющие друг друга списки */}
      <ScrollView
        scrollEventThrottle={500}
        onScroll={onScroll}
        ref={refs[2]}
        onContentSizeChange={onContentSizeChange(2, reset)}
        style={getStyle(view === 2)}
        onMomentumScrollEnd={onMomentumScrollEnd(!busy && view === 2)}>
        {view === 2 ? (
          <Loader loading={topLoading || lists[2]?.length < messages?.length} />
        ) : null}
        {lists[2]?.map((item, idx) => (
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
        {view === 2 ? (
          <Fragment>
            {typing?.length > 0 && <TypingMessage typing={typing} />}
            <Loader loading={view === 2 && bottomLoading} />
          </Fragment>
        ) : null}
      </ScrollView>

      {/* Пререндер новых сообщений для получения высоты отката */}
      {!isEmpty(prerender) ? (
        <View
          style={styles.prerenderView}
          onLayout={onPrerenderLayout}>
          {Array.isArray(prerender) ? prerender.map((item, idx) => (
            <MessageSwitch
              q={q}
              toScrollQuoted={toScrollQuoted}
              handleAnimateMsg={handleAnimateMsg}
              animateMsg={animateMsg}
              key={keyExtractor(item, idx)}
              selected={false}
              onSelectMessage={cb}
              item={item}
              roomInfo={roomInfo} />
          )) : null}
        </View>
      ) : null}

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
    msgChanged: PropTypes.bool,
    bottomLoading: PropTypes.bool,
    messages: PropTypes.arrayOf(PropTypes.object),
    selectedItems: PropTypes.arrayOf(PropTypes.object),
    animateMsg: PropTypes.oneOfType([
      idProp,
      PropTypes.oneOf([null]),
    ]),
    q: PropTypes.string,
  }),
  reset: PropTypes.bool,
  onReady: PropTypes.func,
  cancelChange: PropTypes.func,
  handleAnimateMsg: PropTypes.func,
  toScrollQuoted: PropTypes.func,
};

export default memo(MessagesList);
