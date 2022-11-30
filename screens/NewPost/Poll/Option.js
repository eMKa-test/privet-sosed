import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import TextInput from "../../../components/inputs/Text";
import TrashIcon from "../../../components/icons/trash";
import {idProp} from "../../../lib/utils";

function Option(props) {
  const {
    id, initialValue, onChangeText, onRemove,
  } = props;

  const _onChangeText = React.useCallback((text) => {
    onChangeText(id, text);
  }, [id, onChangeText]);

  return (
    <View style={styles.optionRow}>
      <TextInput
        placeholder="Вариант ответа"
        initialValue={initialValue}
        containerStyle={styles.optionInputContainer}
        onChangeText={_onChangeText} />
      <TouchableOpacity onPress={() => onRemove(id)}>
        <View style={styles.trash}>
          <TrashIcon size={23} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

Option.propTypes = {
  id: idProp,
  initialValue: PropTypes.string,
  onChangeText: PropTypes.func,
  onRemove: PropTypes.func,
};

export default React.memo(Option);
