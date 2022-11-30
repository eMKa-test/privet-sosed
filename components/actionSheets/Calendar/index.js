import React from "react";
import * as PropTypes from "prop-types";
import moment from "moment";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";
import {TouchableOpacity, View} from "react-native";
import {useSafeArea} from "react-native-safe-area-context";
import {actionSheetStyles} from "../styles";
import calendarLocale from "../../../lib/calendarLocale";
import {MAX_WIDTH, MODAL_TIMING} from "../../../constants/Layout";
import TimeIcon from "../../icons/timeIcon";
import TimePicker from "./TimePicker";
import styles from "./styles";
import Paragraph from "../../text/Paragraph";
import {ORANGE_COLOR} from "../../../constants/Colors";

function DatePicker(props) {
  const {
    initialDate, open, dismiss, onSelectDate, maxDate, withTimePicker = false, startTime, onSubmit,
  } = props;
  const [time, setTime] = React.useState(() => {
    if (startTime) {
      return moment(startTime);
    }
    return moment(initialDate);
  });
  const [m] = React.useState(() => {
    if (startTime) {
      return moment(startTime);
    }
    return moment();
  });
  const [pickerType, setPickerType] = React.useState("date");
  const [hours, setHours] = React.useState(() => moment(initialDate).format("HH"));
  const [minutes, setMinutes] = React.useState(() => moment(initialDate).format("mm"));

  const inset = useSafeArea();

  const _dismiss = React.useCallback(() => {
    dismiss();
    if (pickerType === "time") {
      setTimeout(() => {
        setPickerType("date");
      }, MODAL_TIMING / 1.6);
    }
  }, [pickerType]);

  const onChangeDate = React.useCallback((date) => {
    const newDate = moment(date).set({hours: moment().hours(), minutes: moment().minutes()});
    setTime(newDate);
    onSelectDate(newDate);
  }, []);

  const updateTime = React.useCallback((sign, timeType) => {
    time.set({[timeType]: time[timeType]() + sign});
    const newHour = time.format("HH");
    const newMinute = time.format("mm");
    setHours(newHour);
    setMinutes(newMinute);
    onSelectDate(time);
  }, [initialDate]);

  const changeTime = (sign, timeType) => React.useCallback(() => {
    if (sign === -1) {
      const x = moment(m).add(sign, timeType);
      const y = moment(time).add(sign, timeType);
      if (x >= y) {
        return null;
      }
      updateTime(sign, timeType);
    } else {
      updateTime(sign, timeType);
    }
  }, [startTime, initialDate]);

  const minDate = React.useMemo(() => {
    let result = "";
    if (withTimePicker) {
      result = new Date();
    }
    if (startTime) {
      result = startTime;
    }
    return result;
  }, [startTime]);

  return (
    <Modal
      useNativeDriver
      animationOutTiming={MODAL_TIMING / 1.6}
      animationInTiming={MODAL_TIMING}
      backdropOpacity={0}
      hideModalContentWhileAnimating
      isVisible={open}
      style={actionSheetStyles.modal}
      onBackdropPress={_dismiss}
      onBackButtonPress={_dismiss}>
      <View style={[actionSheetStyles.actionSheet, {marginBottom: inset.bottom}]}>
        {pickerType === "date" ? (
          <CalendarPicker
            todayBackgroundColor="transparent"
            todayTextStyle={styles.todayTextStyle}
            selectedDayStyle={styles.selectedDayStyle}
            selectedDayTextColor="#FFF"
            width={MAX_WIDTH}
            minDate={minDate}
            previousTitle={calendarLocale.previousTitle}
            nextTitle={calendarLocale.nextTitle}
            selectMonthTitle={calendarLocale.selectMonthTitle}
            selectYearTitle={calendarLocale.selectYearTitle}
            weekdays={calendarLocale.weekdays}
            months={calendarLocale.months}
            selectedStartDate={startTime || initialDate}
            initialDate={startTime || initialDate}
            startFromMonday
            maxDate={maxDate}
            onDateChange={onChangeDate} />
        ) : (
          <TimePicker
            hours={hours}
            minutes={minutes}
            onSubmit={onSubmit}
            changeTime={changeTime}
            changePicker={() => setPickerType("date")} />
        )}
        {pickerType === "date" && withTimePicker ? (
          <View
            style={styles.datePickerFooter}>
            <TouchableOpacity
              onPress={_dismiss}
              style={styles.cancelPicker}>
              <Paragraph color={ORANGE_COLOR}>
                Отменить
              </Paragraph>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPickerType("time")}
              style={styles.timePickerButton}>
              <TimeIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              style={styles.submitPicker}>
              <Paragraph color={ORANGE_COLOR}>
                Выбрать
              </Paragraph>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

DatePicker.propTypes = {
  initialDate: PropTypes.shape({}),
  open: PropTypes.bool,
  dismiss: PropTypes.func,
  onSelectDate: PropTypes.func,
  onSubmit: PropTypes.func,
  maxDate: PropTypes.shape({}),
  withTimePicker: PropTypes.bool,
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
};

export default DatePicker;
