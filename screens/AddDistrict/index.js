import React, {memo, useCallback, useReducer} from "react";
import * as PropTypes from "prop-types";
import {
  View,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import throttle from "lodash/throttle";
import get from "lodash/get";
import {useFocusEffect} from "@react-navigation/native";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import styles from "./styles";
import SearchSection from "../../components/SearchSection";
import {UNKNOWN_ERROR} from "../../constants/Vars";
import localsSearch from "../../lib/api/locals/locals-search";
import {
  reducer,
  initialState,
  dLoad,
  dLocals,
  dModal,
} from "./helpers";
import DistrictItem from "../District/DistrictItem";
import {keyExtractor} from "../../lib/utils";
import {getLocals, modalOptions} from "../District/helpers";
import DropdownActionSheet from "../../components/actionSheets/Dropdown";
import Paragraph from "../../components/text/Paragraph";

const Wrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;
const headerTitle = {label: "Добавление района"};

function AddDistrictScreen({route}) {
  const [state, dispatch] = useReducer(reducer, initialState(), initialState);
  const location = get(route, "params.location", UNKNOWN_ERROR);

  const onFocusScreen = React.useCallback(() => {
    dispatch(dLoad(true));
    localsSearch(location).then((res) => {
      if (Array.isArray(res?.data)) {
        dispatch(dLocals(res.data));
      }
    }).catch(console.error).finally(() => dispatch(dLoad(false)));
  }, [location]);

  useFocusEffect(onFocusScreen);

  const throttledFetch = useCallback(throttle((text) => {
    localsSearch(text).then((res) => {
      if (Array.isArray(res?.data)) {
        dispatch(dLocals(res.data));
      }
    }).catch(console.error).finally(() => dispatch(dLoad(false)));
  }, 200), []);

  const onChange = useCallback(throttledFetch, []);

  const openMenu = useCallback((item) => () => dispatch(dModal(item)), []);
  const dismiss = useCallback(() => dispatch(dModal(null)), []);

  const updateLocals = useCallback(() => {
    getLocals(location, (dataLocals) => {
      dispatch(dLocals(dataLocals));
    });
  }, [location]);

  const onSelectHandler = useCallback(async ({action}) => {
    if (action) {
      try {
        await action(state.open.local.id);
        updateLocals();
      } catch (e) {
        console.error(e);
      }
    } else {
      // navigate();
    }
  }, [state.open]);

  return (
    <Wrapper
      enable
      behavior="padding"
      style={styles.root}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu active={headerTitle} />
        )} />
      <View />
      <SearchSection
        noClearAfterBlur
        load={state.load}
        onChange={onChange}
        initialValue={location} />
      <FlatList
        ListHeaderComponent={state?.locals?.length === 0 ? (
          <Paragraph center>Результатов не найдено</Paragraph>
        ) : null}
        keyExtractor={keyExtractor}
        data={state?.locals}
        renderItem={({item}) => (
          <DistrictItem
            openDropdown={openMenu}
            updateLocals={updateLocals}
            item={item} />
        )} />
      <DropdownActionSheet
        open={Boolean(state.open)}
        dismiss={dismiss}
        options={modalOptions(
          state.open?.is_subscribe,
          state.open?.is_bookmark,
        )}
        onSelect={onSelectHandler} />
    </Wrapper>
  );
}

AddDistrictScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      location: PropTypes.string,
    }),
  }),
};

export default memo(AddDistrictScreen);
