import isEmpty from "lodash/isEmpty";
import React from "react";
import get from "lodash/get";
import * as PropTypes from "prop-types";
import {
  FlatList, Platform, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View,
} from "react-native";
import Modal from "react-native-modal";
import {useSafeArea} from "react-native-safe-area-context";
import Paragraph from "../text/Paragraph";
import styles from "./styles";
import Chevron from "../icons/chevron";
import CloseButton from "../buttons/close";
import Header from "../header";
import DefaultInfoBlock from "../infoBlocks/default";
import Loader from "../loader";
import useDebounce from "../../lib/hooks/useDebounce";
import SearchIcon from "../icons/search";
import CloseIcon from "../icons/close";
import {ICON_COLOR} from "../../constants/Colors";
import Label from "./Label";

const Touchable = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

function AsyncSelect(props) {
  const {
    label, value = "", placeholder = "", request, afterSelect, infoText = "", disabled = true, onError,
  } = props;

  const inset = useSafeArea();

  const inputRef = React.useRef();

  const [search, setSearch] = React.useState(value);
  const [modal, setModal] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchFocus, setSearchFocus] = React.useState(false);

  const debouncedSearch = useDebounce(search, 150);

  React.useEffect(() => {
    if (debouncedSearch && typeof request === "function") {
      setLoading(true);
      request(debouncedSearch, (arr) => {
        if (Array.isArray(arr)) {
          setList(arr);
        }
        setLoading(false);
      });
    } else {
      setList([]);
    }
  }, [debouncedSearch]);

  const onChangeText = (str) => {
    if (modal) {
      setSearch(str);
    }
  };

  React.useEffect(() => {
    setSearch(value);
    setList([]);
  }, [value]);

  const onSelect = (item) => {
    setModal(false);
    setSearch(item.firstLine);
    if (typeof afterSelect === "function") {
      afterSelect(item);
    }
  };

  React.useEffect(() => {
    if (modal && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
      if (modal && inputRef?.current) {
        inputRef.current.blur();
      }
    };
  }, [modal, inputRef]);

  return (
    <View style={styles.formRow}>
      <Label text={label} />
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setModal(true)}>
        <View
          style={[
            styles.asyncSelectOpenModalButton,
            onError && styles.onError,
            {backgroundColor: disabled ? "rgba(155,178,195,.3)" : "#FFF"},
          ]}>
          <Text style={styles.asyncSelectOpenModalButtonText}>{value || placeholder}</Text>
          <Chevron size={5} />
        </View>
      </TouchableOpacity>
      {!disabled && (
        <Modal
          hideModalContentWhileAnimating
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
                  value={search}
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
              {isEmpty(list) && !loading ? (
                <DefaultInfoBlock
                  margin={10}
                  text={infoText} />
              ) : null}
              <FlatList
                keyboardShouldPersistTaps="always"
                contentContainerStyle={styles.list}
                ListHeaderComponent={<Loader active={loading} />}
                keyExtractor={(item) => String(item.id)}
                data={list}
                renderItem={({item}) => (
                  <Touchable onPress={() => onSelect(item)}>
                    <View style={styles.listItem}>
                      <Paragraph
                            size={16}>
                            {get(item, "firstLine", "Ошибка")}
                          </Paragraph>
                      {item.secondLine && (
                          <Paragraph
                            noMargin

                            size={14}
                            color="#a0a0a0">
                            {item.secondLine}
                          </Paragraph>
                          )}
                    </View>
                  </Touchable>
                )} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

AsyncSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  request: PropTypes.func,
  afterSelect: PropTypes.func,
  infoText: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onError: PropTypes.bool,
};

export default React.memo(AsyncSelect);
