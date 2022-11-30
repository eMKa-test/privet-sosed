import React from "react";
import * as PropTypes from "prop-types";
import {View, TextInput, TouchableOpacity} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styles from "./styles";
import SearchMsgIcon from "../../../../components/icons/searchMsgIcon";
import CloseIcon from "../../../../components/icons/close";
import Paragraph from "../../../../components/text/Paragraph";
import Loader from "../../../../components/loader";

function SearchMessage(props) {
  const {dismiss, onSubmitSearch, searchLoading} = props;
  const inset = useSafeAreaInsets();
  const [value, setValue] = React.useState("");

  const onChange = React.useCallback(({nativeEvent: {text}}) => {
    setValue(text);
  }, []);

  return (
    <View style={[styles.searchRoot, {marginTop: inset.top}]}>
      <View style={styles.leftItem}>
        <SearchMsgIcon />
        <TextInput
          onChange={onChange}
          style={styles.searchInput}
          placeholder="Поиск" />
      </View>
      <View style={styles.rightItem}>
        <TouchableOpacity onPress={() => onSubmitSearch(value)}>
          <View style={[styles.searchButton, searchLoading && styles.loading]}>
            {searchLoading ? (
              <Loader
                active
                containerStyle={styles.loader} />
            ) : (
              <Paragraph
                noMargin
                medium
                center
                size={16}
                color="#fff">
                Поиск
              </Paragraph>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchClose}
          onPress={dismiss}>
          <CloseIcon
            size={16}
            color="rgba(155,178,195,.8)" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

SearchMessage.propTypes = {
  dismiss: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool,
};

export default React.memo(SearchMessage);
