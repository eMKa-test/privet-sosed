import React from "react";
import * as PropTypes from "prop-types";
import {
  FlatList, Text, TextInput, TouchableOpacity, View,
} from "react-native";
import Modal from "react-native-modal";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styles from "../styles";
import CloseButton from "../../buttons/close";
import Header from "../../header";
import SearchIcon from "../../icons/search";
import CloseIcon from "../../icons/close";
import {ICON_COLOR} from "../../../constants/Colors";
import Item from "../MultipleSelect/Item";
import DismissKeyboard from "../../DismissKeyboard";

function MultipleSelectModal(props) {
  const {
    open, label, dismiss, initialSelected = [], options, afterSelect,
  } = props;

  const inset = useSafeAreaInsets();

  const inputRef = React.useRef();

  const [search, setSearch] = React.useState("");
  const [searchFocus, setSearchFocus] = React.useState(false);

  React.useEffect(() => {
    if (open && inputRef?.current) {
      inputRef.current.focus();
    }
    return () => {
      if (open && inputRef?.current) {
        inputRef.current.blur();
      }
    };
  }, [open, inputRef]);

  const onChangeText = React.useCallback((str) => {
    setSearch(str);
  }, [setSearch]);

  const onSelect = React.useCallback((item) => {
    dismiss();
    setSearch("");
    if (typeof afterSelect === "function" && item?.id) {
      const arr = Array.from(initialSelected);
      arr.push(item.id);
      afterSelect(arr);
      return arr;
    }
  }, [setSearch, initialSelected, afterSelect]);

  return (
    <DismissKeyboard>
      <Modal
        useNativeDriver
        style={[styles.modal, {
          marginTop: inset.top,
          marginBottom: inset.bottom > 0 ? inset.bottom : 20,
        }]}
        onBackButtonPress={dismiss}
        onBackdropPress={dismiss}
        isVisible={open}>
        <View style={styles.modalContent}>
          <Header
            isModal
            leftItem={(
              <View style={styles.modalHeader}>
                <CloseButton onPress={dismiss} />
                <Text style={styles.modalHeaderText}>{label}</Text>
              </View>
            )} />
          <View style={styles.modalBody}>
            <View style={styles.searchField}>
              <View style={styles.searchIcon}>
                <SearchIcon />
              </View>
              <TextInput
                ref={inputRef}
                placeholderTextColor="#565656"
                selectionColor="#565656"
                initialSelected={search}
                onChangeText={(val) => onChangeText(val)}
                style={[
                  styles.input,
                  styles.searchInput,
                  searchFocus && styles.searchFocus,
                ]}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)} />
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => onChangeText("")}>
                <CloseIcon color={ICON_COLOR} />
              </TouchableOpacity>
            </View>
            <FlatList
              keyboardShouldPersistTaps="always"
              contentContainerStyle={styles.list}
              keyExtractor={(item) => String(item.id)}
              data={options}
              renderItem={({item}) => (
                <Item
                  selectedIds={initialSelected}
                  search={search}
                  data={item}
                  onSelect={onSelect} />
              )} />
          </View>
        </View>
      </Modal>
    </DismissKeyboard>
  );
}

MultipleSelectModal.propTypes = {
  label: PropTypes.string,
  initialSelected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  })),
  open: PropTypes.bool,
  afterSelect: PropTypes.func,
  dismiss: PropTypes.func,
};

export default React.memo(MultipleSelectModal);
