import React, {useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import uniqueId from "lodash/uniqueId";
import {useFocusEffect} from "@react-navigation/native";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import {
  ADVERTS, EVENTS, LIKES, NEWS, POLLS, SEARCH,
} from "../../constants/Vars";
import styles from "./styles";
import EventsList from "../../components/EventsList";
import {navigate} from "../../navigation/root";

const menu = {
  [NEWS]: {
    id: uniqueId("menu:option:"),
    label: "Новости",
    type: 0,
  },
  [EVENTS]: {
    id: uniqueId("menu:option:"),
    label: "События",
    type: 2,
  },
  [ADVERTS]: {
    id: uniqueId("menu:option:"),
    label: "Объявления",
    type: 3,
  },
  [POLLS]: {
    id: uniqueId("menu:option:"),
    label: "Опросы",
    type: 4,
  },
  [SEARCH]: {
    id: uniqueId("menu:option:"),
    label: "Поиск",
    type: 5,
  },
};

const options = Object.entries(menu)
  .map(([k, item]) => ({
    ...item,
    value: k,
  }));

const [initOption] = options;

const FeedScreen = ({route, navigation}) => {
  const [activeMenuOption, setActiveMenuOption] = React.useState(initOption);
  const [needRefresh, setNeedRefresh] = useState();

  useFocusEffect(useCallback(() => {
    const {refresh: _refresh} = route.params || {};
    if (_refresh) {
      navigation.setParams({refresh: false});
    }
    setNeedRefresh(_refresh);
  }, [route.params?.refresh]));

  const onSelect = useCallback((item) => {
    if (item?.value === "SEARCH") {
      return navigate(SEARCH);
    }
    setActiveMenuOption(item);
  }, []);

  return (
    <View style={styles.screenRoot}>
      <Header
        leftItem={(
          <HeaderMenu
            active={activeMenuOption}
            options={options}
            onSelect={onSelect} />
        )} />
      <EventsList
        needRefresh={needRefresh}
        parentRoute={route?.name}
        type={activeMenuOption.type}
        liked={activeMenuOption.value === LIKES} />
    </View>
  );
};

FeedScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      refresh: PropTypes.bool,
    }),
    name: PropTypes.string,
  }),
  navigation: PropTypes.shape({
    setParams: PropTypes.func,
  }),
};

export default FeedScreen;
