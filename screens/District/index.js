import React, {useCallback, useReducer, useState} from "react";
import * as PropTypes from "prop-types";
import {
  View, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList,
} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import uniqueId from "lodash/uniqueId";
import styles from "./styles";
import HeaderMenu from "../../components/header/menu";
import Header from "../../components/header";
import {
  ALL_DISTRICT, SUBSCRIBE_DISTRICT, BOOKMARKS_DISTRICT, ADD_DISTRICT,
} from "../../constants/Vars";
import {
  initialState, reducer, getGeo, getLocals, dUserGeo, dLocals, modalOptions, dLoad,
} from "./helpers";
import {navigate} from "../../navigation/root";
import AddDistrictIcon from "../../components/icons/addDistrict";
import DistrictItem from "./DistrictItem";
import {keyExtractor} from "../../lib/utils";
import DropdownActionSheet from "../../components/actionSheets/Dropdown";
import NoLocals from "../../components/noLocals";
import Loader from "../../components/loader";
import ListHeader from "./ListHeader";

const Wrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

const menu = {
  [ALL_DISTRICT]: {
    id: uniqueId("district:option:"),
    label: "Все",
    type: "allLocals",
  },
  [SUBSCRIBE_DISTRICT]: {
    id: uniqueId("district:option:"),
    label: "Подписки",
    type: "subscribeLocals",
  },
  [BOOKMARKS_DISTRICT]: {
    id: uniqueId("district:option:"),
    label: "Закладки",
    type: "bookmarkLocals",
  },
};

const options = Object.entries(menu)
  .map(([k, item]) => ({
    ...item,
    value: k,
  }));

const [initOption] = options;

function DistrictScreen() {
  const [state, dispatch] = useReducer(reducer, initialState(), initialState);
  const [activeMenuOption, setActiveMenuOption] = React.useState(initOption);
  const [openDropdown, setOpenDropDown] = useState(false);

  const onFocus = useCallback(() => {
    getGeo((geo) => {
      dispatch(dUserGeo(geo));
      getLocals(geo.location, (dataLocals) => {
        dispatch(dLocals(dataLocals));
        dispatch(dLoad(false));
      });
    });
  }, []);

  useFocusEffect(onFocus);

  const onAddDistrict = useCallback(() => {
    navigate(ADD_DISTRICT, {location: state?.userGeo?.location});
  }, [state?.userGeo]);

  const updateLocals = useCallback(() => {
    getLocals(state.userGeo?.location, (dataLocals) => {
      dispatch(dLocals(dataLocals));
    });
  }, [state.userGeo]);

  const openMenu = useCallback((item) => () => setOpenDropDown(item), []);
  const dismiss = useCallback(() => setOpenDropDown(null), []);

  const onSelectHandler = useCallback(async ({action}) => {
    if (action) {
      try {
        await action(openDropdown.local.id);
        updateLocals();
      } catch (e) {
        console.error(e);
      }
    } else {
      // navigate();
    }
  }, [openDropdown]);

  return (
    <Wrapper
      enabled
      behavior="padding"
      style={styles.root}>
      <Header
        leftItem={(
          <HeaderMenu
            active={activeMenuOption}
            options={options}
            onSelect={setActiveMenuOption} />
        )}
        rightItem={(
          <TouchableOpacity onPress={onAddDistrict}>
            <AddDistrictIcon />
          </TouchableOpacity>
        )} />
      {state.load ? (
        <Loader
          active
          containerStyle={styles.loader} />
      ) : null}
      <FlatList
        keyExtractor={keyExtractor}
        data={state[activeMenuOption?.type]}
        ListHeaderComponent={!state.load && state[activeMenuOption?.type]?.length === 0 ? (
          <ListHeader
            typeLocals={activeMenuOption?.type}
            onAddDistrict={onAddDistrict} />
        ) : null}
        renderItem={({item}) => (
          <DistrictItem
            openDropdown={openMenu}
            updateLocals={updateLocals}
            item={item} />
        )} />
      <DropdownActionSheet
        open={Boolean(openDropdown)}
        dismiss={() => dismiss(null)}
        options={modalOptions(
          openDropdown?.is_subscribe,
          openDropdown?.is_bookmark,
        )}
        onSelect={onSelectHandler} />
    </Wrapper>
  );
}

export default DistrictScreen;
