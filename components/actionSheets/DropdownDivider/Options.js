import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const Options = ({item, handleSelect}) => (
  <TouchableOpacity
    onPress={() => handleSelect(item)}>
    {item?.icon ? (
      <View style={styles.optionWithIcon}>
        <Text style={styles.optionTextWithIcon}>{get(item, "label", UNKNOWN_ERROR)}</Text>
        <item.icon size={22} />
      </View>
        ) : (
          <View style={styles.option}>
            <Text style={styles.optionText}>{get(item, "label", UNKNOWN_ERROR)}</Text>
          </View>
        )}
  </TouchableOpacity>
);

Options.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
};

export default React.memo(Options);
