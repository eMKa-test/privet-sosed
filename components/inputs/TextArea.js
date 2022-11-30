import React from "react";
import * as PropTypes from "prop-types";
import {TextInput, View, Platform} from "react-native";
import styles from "./styles";
import Label from "./Label";

function TextArea(props) {
  const {
    label, initialValue = "", numberOfLines = 4, onInputChange, onError, noBorders,
    inputRef, placeholder, placeholderColor,
  } = props;
  const [searchFocus, setSearchFocus] = React.useState(false);

  const onChange = React.useCallback((val) => {
    if (typeof onInputChange === "function") {
      onInputChange(val);
    }
  }, []);

  return (
    <View style={styles.formRow}>
      <Label text={label} />
      <View
        style={[
          styles.multilineWrapper,
          onError && styles.onError,
          noBorders && styles.noBorders,
        ]}>
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          multiline
          defaultValue={initialValue}
          numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
          minHeight={(Platform.OS === "ios" && numberOfLines) ? (22 * numberOfLines) : null}
          placeholderTextColor={placeholderColor || "#565656"}
          selectionColor="#565656"
          onChangeText={onChange}
          style={[
            styles.multiline,
            searchFocus && styles.searchFocus,
          ]}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)} />
      </View>
    </View>
  );
}

TextArea.propTypes = {
  label: PropTypes.string,
  initialValue: PropTypes.string,
  numberOfLines: PropTypes.number,
  onInputChange: PropTypes.func,
  onError: PropTypes.bool,
  noBorders: PropTypes.bool,
  inputRef: PropTypes.shape({}),
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
};

export default React.memo(TextArea);
