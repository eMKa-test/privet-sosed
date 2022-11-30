import React from "react";
import * as PropTypes from "prop-types";
import {
  Image, ScrollView, TouchableOpacity, View,
} from "react-native";
import TextInput from "../../../components/inputs/Text";
import Paragraph from "../../../components/text/Paragraph";
import {
  initialState,
  reducer,
  POLL,
  ADD_OPTION,
  REMOVE_OPTION,
  CHANGE_VALUE,
  colors,
  getCardStyle,
  STYLE,
  CHANGE_STYLE,
  IS_ANONYMOUS,
  IS_MULTIPLE,
  IS_ONE_TIME,
  IS_SECRET,
  POLL_FINISH_TIME,
  IS_FINISH,
} from "./helpers";
import styles from "./styles";
import Option from "./Option";
import CheckboxIcon from "../../../components/icons/checkbox";
import PostDatePicker from "../PostDatePicker";
import {idProp} from "../../../lib/utils";

function Poll(props) {
  const {typeHelperRef, initialPoll} = props;
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    typeHelperRef.current = state;
  }, [state]);

  // Тема опроса
  const setTitle = React.useCallback((text) => {
    dispatch({type: POLL, text});
  }, []);

  React.useEffect(() => {
    if (initialPoll) {
      const {
        text, style, options, left_time, is_secret,
      } = initialPoll;
      dispatch({type: POLL, text});
      dispatch({type: CHANGE_STYLE, id: style});
      dispatch({type: IS_FINISH, value: Boolean(left_time)});
      dispatch({type: IS_SECRET, value: Boolean(is_secret)});
      if (Array.isArray(options)) {
        options.forEach((el) => {
          dispatch({type: CHANGE_VALUE, id: el?.id, text: el?.title});
        });
      }
    }
  }, [initialPoll]);

  // Варианты ответа
  const addOption = React.useCallback(() => {
    dispatch({type: ADD_OPTION});
  }, []);

  const removeOption = React.useCallback((id) => {
    dispatch({type: REMOVE_OPTION, id});
  }, []);

  const onOptionChangeText = React.useCallback((id, text) => {
    dispatch({type: CHANGE_VALUE, id, text});
  }, [state]);

  const handleFinishDate = React.useCallback((date) => {
    dispatch({type: POLL_FINISH_TIME, date});
  }, []);

  const onOpenFinish = React.useCallback(() => {
    if (state[IS_FINISH]) {
      handleFinishDate("");
    }
    dispatch({type: IS_FINISH, value: !state[IS_FINISH]});
  }, [state]);

  return (
    <React.Fragment>
      <Paragraph size={14}>Тема опроса</Paragraph>
      <TextInput
        initialValue={state?.poll}
        onChangeText={setTitle}
        error={undefined} />
      <Paragraph size={14}>Варианты ответа</Paragraph>
      {Object.entries(state.options).map(([id, val]) => (
        <Option
          key={id}
          id={id}
          initialValue={val}
          onRemove={removeOption}
          onChangeText={onOptionChangeText} />
      ))}
      <TouchableOpacity onPress={addOption}>
        <View style={styles.optionRow}>
          <View style={styles.option}>
            <Paragraph style={styles.optionPlaceholder}>Добавить вариант</Paragraph>
          </View>
          <View style={styles.trash} />
        </View>
      </TouchableOpacity>
      <View style={styles.backgroundSelect}>
        <Paragraph size={14}>Фон</Paragraph>
        <ScrollView
          horizontal
          style={styles.backgroundsScroll}>
          {colors.map(({id, bg}) => (
            <TouchableOpacity
              key={id}
              onPress={() => {
                dispatch({type: CHANGE_STYLE, id});
              }}>
              <View style={styles.colorCard}>
                <Image
                  source={bg}
                  style={getCardStyle(id)} />
                <CheckboxIcon checked={state[STYLE] === id} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <React.Fragment>
        <Paragraph style={styles.configTitle}>Параметры</Paragraph>
        {!initialPoll ? (
          <React.Fragment>
            <TouchableOpacity
              onPress={() => {
                dispatch({type: IS_ANONYMOUS, value: !state[IS_ANONYMOUS]});
              }}>
              <View style={styles.configRow}>
                <CheckboxIcon
                  squared
                  checked={!!state[IS_ANONYMOUS]} />
                <Paragraph style={styles.configRowLabel}>
                  Анонимный опрос
                </Paragraph>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch({type: IS_MULTIPLE, value: !state[IS_MULTIPLE]});
              }}>
              <View style={styles.configRow}>
                <CheckboxIcon
                  squared
                  checked={state[IS_MULTIPLE]} />
                <Paragraph style={styles.configRowLabel}>
                  Выбор нескольких вариантов
                </Paragraph>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch({type: IS_ONE_TIME, value: !state[IS_ONE_TIME]});
              }}>
              <View style={styles.configRow}>
                <CheckboxIcon
                  squared
                  checked={state[IS_ONE_TIME]} />
                <Paragraph style={styles.configRowLabel}>
                  Запретить отмену голоса
                </Paragraph>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ) : null}
        <TouchableOpacity
          onPress={onOpenFinish}>
          <View style={styles.configRow}>
            <CheckboxIcon
              squared
              checked={state[IS_FINISH]} />
            <Paragraph style={styles.configRowLabel}>
              Ограниченное время голосования
            </Paragraph>
          </View>
        </TouchableOpacity>
        {state[IS_FINISH] ? (
          <React.Fragment>
            <PostDatePicker
              withTimePicker
              value={new Date(state[POLL_FINISH_TIME])}
              onChange={handleFinishDate} />
            <TouchableOpacity
              onPress={() => {
                dispatch({type: IS_SECRET, value: !state[IS_SECRET]});
              }}>
              <View style={styles.configRow}>
                <CheckboxIcon
                  style={styles.configRowCheckbox}
                  squared
                  checked={state[IS_SECRET]} />
                <Paragraph style={styles.configRowLabel}>
                  Результаты будут доступны только после завершения опроса
                </Paragraph>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    </React.Fragment>
  );
}

Poll.propTypes = {
  typeHelperRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  initialPoll: PropTypes.oneOfType([PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      id: idProp,
      title: PropTypes.string,
    })),
    text: PropTypes.string,
    style: PropTypes.string,
    left_time: PropTypes.string,
    is_secret: PropTypes.number,
  }), PropTypes.bool]),
};

export default React.memo(Poll);
