import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import Paragraph from "../../../components/text/Paragraph";
import {sexStyles} from "./styles";
import CheckboxIcon from "../../../components/icons/checkbox";

function Sex(props) {
  const {value, onChange, hasError} = props;
  return (
    <View style={sexStyles.root}>
      <Paragraph size={14}>Пол</Paragraph>
      <View style={sexStyles.row}>
        <TouchableOpacity onPress={() => onChange(2)}>
          <View style={sexStyles.ckeckbox}>
            <CheckboxIcon
              checked={value === 2}
              style={sexStyles.icon} />
            <Paragraph
              noMargin
              size={14}>
              Женский
            </Paragraph>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChange(1)}>
          <View style={sexStyles.ckeckbox}>
            <CheckboxIcon
              checked={value === 1}
              style={sexStyles.icon} />
            <Paragraph
              noMargin
              size={14}>
              Мужской
            </Paragraph>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Sex.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
};

export default React.memo(Sex);
