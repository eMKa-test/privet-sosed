import React from "react";
import * as PropTypes from "prop-types";
import {View, TextInput, TouchableOpacity} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import styles from "./styles";
import SearchMsgIcon from "../icons/searchMsgIcon";
import Loader from "../loader";
import CloseIcon from "../icons/close";

function SearchSection(props) {
  const {
    extendStyles = {},
    onChange = () => null,
    editable = true,
    load = false,
    secondaryLoad = false,
    clearDep = undefined,
    noClearAfterBlur = false,
    initialValue = "",
  } = props;

  const [value, setValue] = React.useState(initialValue);

  const _onChange = React.useCallback((text) => {
    setValue(text);
    onChange(text);
  }, [clearDep]);

  const _onCLear = React.useCallback(() => {
    setValue("");
    if (!noClearAfterBlur) {
      onChange("");
    }
  }, [onChange, noClearAfterBlur]);

  useFocusEffect(React.useCallback(() => {
    return _onCLear;
  }, []));

  React.useEffect(() => {
    if (clearDep) {
      setValue("");
      onChange("");
    }
  }, [clearDep]);

  return (
    <View style={[styles.msgSearchContainer, extendStyles]}>
      <View style={styles.leftSideSearch}>
        <SearchMsgIcon />
        <TextInput
          editable={editable}
          style={styles.msgSearchInput}
          placeholder="Поиск"
          value={value}
          onChangeText={_onChange} />
      </View>
      {(!load && value) ? (
        <TouchableOpacity
          style={styles.clearSearch}
          onPress={_onCLear}>
          <CloseIcon
            size={12}
            color="#ABABAB" />
        </TouchableOpacity>
      ) : null}
      {(load || secondaryLoad) && (
        <Loader
          containerStyle={{height: 20}}
          small
          active />
      )}
    </View>
  );
}

SearchSection.propTypes = {
  extendStyles: PropTypes.objectOf(PropTypes.any),
  editable: PropTypes.bool,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  load: PropTypes.bool,
  secondaryLoad: PropTypes.bool,
  noClearAfterBlur: PropTypes.bool,
  clearDep: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default React.memo(SearchSection);
