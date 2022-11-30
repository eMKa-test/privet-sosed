import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import Paragraph from "../../components/text/Paragraph";
import styles from "./styles";
import CheckboxIcon from "../../components/icons/checkbox";
import {keyExtractor} from "../../lib/utils";

function AbuseOptions(props) {
  const {options, chosen, setChosen} = props;
  return (
    <React.Fragment>
      <Paragraph
        style={styles.text}
        size={14}
        noMargin>
        Причина жалобы:
      </Paragraph>
      <View style={styles.checkboxOptions}>
        {options.map((option) => (option && (
        <TouchableOpacity
          key={keyExtractor(option)}
          onPress={() => setChosen(option)}>
          <View style={styles.checkboxOption}>
            <CheckboxIcon
              checked={chosen?.id === option?.id}
              style={styles.checkboxIcon} />
            <Paragraph
              noMargin
              size={14}>
              {option.title}
            </Paragraph>
          </View>
        </TouchableOpacity>
        )))}
      </View>
    </React.Fragment>
  );
}

AbuseOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
  chosen: PropTypes.shape({}),
  setChosen: PropTypes.func,
};

export default React.memo(AbuseOptions);
