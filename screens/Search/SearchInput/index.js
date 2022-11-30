import React from "react";
import * as PropTypes from "prop-types";
import {TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import SearchIcon from "../../../components/icons/searchMsgIcon";
import SettingsIcon from "../../../components/icons/searchSettings";
import Loader from "../../../components/loader";
import CloseIcon from "../../../components/icons/close";

function SearchInput(props) {
  const {
    searchText, setSearchText, setModal, loading,
  } = props;

  const onChangeText = React.useCallback((text) => {
    setSearchText(text);
  }, []);

  const clearText = React.useCallback(() => {
    setSearchText("");
  }, []);

  return (
    <View style={styles.root}>
      <SearchIcon />
      <TextInput
        style={styles.searchInput}
        value={searchText}
        placeholder="Поиск новостей"
        onChangeText={onChangeText} />
      <View style={styles.loaderSection}>
        {loading ? (
          <Loader
            containerStyle={styles.loader}
            active
            small />
        ) : null}
        {!loading && searchText ? (
          <TouchableOpacity
            style={styles.close}
            onPress={clearText}>
            <CloseIcon color="#C2C0C0" />
          </TouchableOpacity>
        ) : null}
      </View>
      {typeof setModal === "function" ? (
        <TouchableOpacity onPress={() => setModal(true)}>
          <SettingsIcon size={26} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

SearchInput.propTypes = {
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  setModal: PropTypes.func,
  loading: PropTypes.bool,
};

export default React.memo(SearchInput);
