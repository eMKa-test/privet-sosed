import memoize from "lodash/memoize";
import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import moment from "moment";
import styles from "./styles";
import Paragraph from "../../components/text/Paragraph";
import DatePicker from "../../components/actionSheets/Calendar";

const formatDate = memoize((date) => {
  const d = moment(date);
  if (d.isValid()) {
    return d.format("DD MMMM YYYY");
  }
  return "";
});

const formatTime = memoize((date) => {
  const d = moment(date);
  if (d.isValid()) {
    return d.format("HH:mm");
  }
  return "";
});

function PostDatePicker(props) {
  const {
    title, value, onChange, withTimePicker, startTime,
  } = props;
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const dismiss = React.useCallback(() => {
    setPickerOpen(false);
    onChange("");
  }, []);

  const openDatePicker = React.useCallback(() => {
    setPickerOpen(true);
  }, [value]);

  const handleDate = React.useCallback((date) => {
    if (typeof date !== "undefined" && typeof onChange === "function") {
      onChange(date);
    }
  }, []);

  const onSubmit = React.useCallback(() => {
    if (!moment(value).isValid()) {
      onChange(new Date());
    }
    setPickerOpen(false);
  }, [value]);

  let initialDate = value;
  if (Number.isNaN(value.valueOf())) {
    initialDate = new Date();
  }

  return (
    <View style={styles.inputDateWrapper}>
      {title ? (
        <Paragraph size={14}>{title}</Paragraph>
      ) : null}
      <TouchableOpacity onPress={openDatePicker}>
        <View style={styles.inputDatePlaceholder}>
          <Paragraph
            size={14}>
            {formatDate(value)}
          </Paragraph>
          {withTimePicker ? (
            <Paragraph
              style={{marginLeft: 5}}
              size={14}>
              {formatTime(value)}
            </Paragraph>
          ) : null}
        </View>
      </TouchableOpacity>
      {pickerOpen ? (
        <DatePicker
          withTimePicker
          dismiss={dismiss}
          startTime={startTime}
          onSubmit={onSubmit}
          initialDate={initialDate}
          open={pickerOpen}
          onSelectDate={handleDate} />
      ) : null}
    </View>
  );
}

PostDatePicker.propTypes = {
  title: PropTypes.string,
  withTimePicker: PropTypes.bool,
  value: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func,
  startTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.shape({})]),
};

export default React.memo(PostDatePicker);
