import React, {useState, useCallback} from "react";
import {View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import * as PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import Header from "../../../components/header";
import HeaderMenu from "../../../components/header/menu";
import EventsList from "../../../components/EventsList";
import {idProp} from "../../../lib/utils";
import styles from "./styles";
import {
  ADVERTS, EVENTS, LIKES, NEWS, POLLS,
} from "../../../constants/Vars";

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
  // [LIKES]: {
  //   id: uniqueId("menu:option:"),
  //   label: "Понравилось",
  //   type: 0,
  // },
};

const options = Object.entries(menu)
  .map(([k, item]) => ({
    ...item,
    value: k,
  }));

const [initOption] = options;

function HouseFeedScreen(props) {
  const {route, navigation} = props;
  const [activeMenuOption, setActiveMenuOption] = React.useState(initOption);
  const [needRefresh, setNeedRefresh] = useState();

  useFocusEffect(useCallback(() => {
    const {refresh: _refresh} = route.params || {};
    if (_refresh) {
      navigation.setParams({refresh: false});
    }
    setNeedRefresh(_refresh);
  }, [route.params?.refresh]));

  return (
    <View style={styles.screenRoot}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu
            active={activeMenuOption}
            options={options}
            onSelect={setActiveMenuOption} />
        )} />
      <EventsList
        needRefresh={needRefresh}
        parentRoute={route?.name}
        type={activeMenuOption.type}
        liked={activeMenuOption.value === LIKES} />
    </View>
  );
}

HouseFeedScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      houseId: idProp,
      houseLabel: PropTypes.string,
      refresh: PropTypes.bool,
    }),
    name: PropTypes.string,
  }),
  navigation: PropTypes.shape({
    setParams: PropTypes.func,
  }),
};

export default HouseFeedScreen;
