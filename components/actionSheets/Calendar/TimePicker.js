import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import DateIcon from "../../icons/dateIcon";
import TimeIconUp from "../../icons/timeIconUp";
import Paragraph from "../../text/Paragraph";
import TimeIconDown from "../../icons/timeIconDown";
import styles from "./styles";
import {ORANGE_COLOR} from "../../../constants/Colors";

function TimePicker(props) {
  const {
    changePicker, changeTime, hours, minutes, onSubmit,
  } = props;

  return (
    <View style={styles.timeRoot}>
      <TouchableOpacity
        onPress={changePicker}
        style={styles.changePickerButton}>
        <DateIcon />
      </TouchableOpacity>
      <View style={styles.timeControlBody}>
        <View style={styles.controlArrows}>
          <TouchableOpacity
            onPress={changeTime(1, "hours")}
            style={styles.arrowButton}>
            <TimeIconUp />
          </TouchableOpacity>
          <Paragraph
            size={24}
            center
            medium>
            {hours}
          </Paragraph>
          <TouchableOpacity
            onPress={changeTime(-1, "hours")}
            style={styles.arrowButton}>
            <TimeIconDown />
          </TouchableOpacity>
        </View>
        <Paragraph
          size={24}
          center
          medium
          style={styles.timeSeparator}>
          :
        </Paragraph>
        <View style={styles.controlArrows}>
          <TouchableOpacity
            onPress={changeTime(1, "minutes")}
            style={styles.arrowButton}>
            <TimeIconUp />
          </TouchableOpacity>
          <Paragraph
            size={24}
            center
            medium>
            {minutes}
          </Paragraph>
          <TouchableOpacity
            onPress={changeTime(-1, "minutes")}
            style={styles.arrowButton}>
            <TimeIconDown />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={onSubmit}
        style={styles.submitTimePicker}>
        <Paragraph color={ORANGE_COLOR}>
          Выбрать
        </Paragraph>
      </TouchableOpacity>
    </View>
  );
}

TimePicker.propTypes = {
  changePicker: PropTypes.func.isRequired,
  changeTime: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hours: PropTypes.string,
  minutes: PropTypes.string,
};

export default React.memo(TimePicker);
