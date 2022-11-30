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
import Label from "../Label";
import Item from "./Item";
import Paragraph from "../../text/Paragraph";

export const flat = (arr, obj = {}) => Array.isArray(arr) && arr.reduce((acc, el) => {
  if (!el?.id) {
    return;
  }
  if (Array.isArray(el?.items) && el?.items?.length > 0) {
    return flat(el.items, acc);
  }
  acc[el.id] = el;
  return acc;
}, obj);

function MultipleSelect(props) {
  const {
    label, initialSelected = [], placeholder = "", afterSelect, disabled = true, onError, options,
  } = props;

  const inset = useSafeAreaInsets();

  const inputRef = React.useRef();

  const [search, setSearch] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [searchFocus, setSearchFocus] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [optionsObject, setOptionsObject] = React.useState({});

  React.useEffect(() => {
    if (Array.isArray(initialSelected)) {
      setSelected(Array.from(initialSelected));
    }
    setOptionsObject(flat(options, {}));
  }, []);

  React.useEffect(() => {
    if (modal && inputRef?.current) {
      inputRef.current.focus();
    }
    return () => {
      if (modal && inputRef?.current) {
        inputRef.current.blur();
      }
    };
  }, [modal, inputRef]);

  const onChangeText = React.useCallback((str) => {
    if (modal) {
      setSearch(str);
    }
  }, [setSearch, modal]);

  const onSelect = React.useCallback((item) => {
    setModal(false);
    setSearch("");
    if (typeof afterSelect === "function" && item?.id) {
      setSelected((state) => {
        const arr = Array.from(state);
        const idx = arr.findIndex((id) => id === item.id);
        if (idx !== -1) {
          arr.splice(idx, 1);
        } else {
          arr.push(item.id);
        }
        afterSelect(arr);
        return arr;
      });
    }
  }, [setModal, setSearch, setSelected, afterSelect]);

  return (
    <View style={styles.formRow}>
      <Label text={label} />
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setModal(true)}>
        <View
          style={[
            styles.multipleSelect,
            onError && styles.onError,
            {backgroundColor: disabled ? "rgba(155,178,195,.3)" : "#FFF"},
          ]}>
          {selected?.length > 0 ? selected.map((id) => {
            const item = optionsObject[id];
            return (
              <View
                key={id}
                style={styles.multipleSelectItem}>
                <Paragraph
                  noMargin
                  style={styles.multipleSelectItemText}
                  size={14}>
                  {item?.title}
                </Paragraph>
                <TouchableOpacity
                  onPress={(ev) => {
                    ev.preventDefault();
                    onSelect(item);
                  }}>
                  <CloseIcon
                    small
                    size={11} />
                </TouchableOpacity>
              </View>
            );
          }) : (
            <View
              style={styles.multipleSelectPlaceholder}>
              <Text style={styles.asyncSelectOpenModalButtonText}>{placeholder}</Text>
            </View>
                    )}
        </View>
      </TouchableOpacity>
      {!disabled && (
        <Modal
          useNativeDriver
          style={[styles.modal, {
            marginTop: inset.top,
            marginBottom: inset.bottom > 0 ? inset.bottom : 20,
          }]}
          onBackButtonPress={() => setModal(false)}
          onBackdropPress={() => setModal(false)}
          isVisible={modal}>
          <View style={styles.modalContent}>
            <Header
              isModal
              leftItem={(
                <View style={styles.modalHeader}>
                  <CloseButton onPress={() => setModal(false)} />
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
                    selectedIds={selected}
                    search={search}
                    data={item}
                    onSelect={onSelect} />
                )} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

MultipleSelect.propTypes = {
  label: PropTypes.string,
  initialSelected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  })),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onError: PropTypes.bool,
  afterSelect: PropTypes.func,
};

export default React.memo(MultipleSelect);
