import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import Paragraph from "../text/Paragraph";
import styles from "./styles";
import {SCREEN_WIDTH} from "../../constants/Layout";

const tabs = [
  {
    id: "news",
    label: "Новости",
    value: 1,
  },
  {
    id: "events",
    label: "События",
    value: 2,
  },
  {
    id: "advert",
    label: "Объявления",
    value: 3,
  },
  {
    id: "interview",
    label: "Опросы",
    value: 4,
  },
];

function TabsFilter(props) {
  const {type, onChangeTab} = props;
  return (
    <View style={styles.tabsFilterRoot}>
      {tabs.map((tab) => {
        const activeTab = type === tab.value;
        return (
          <TouchableOpacity
            onPress={() => onChangeTab(tab.value)}
            key={tab.id}
            style={[styles.tabsFilterItem, activeTab && styles.activeTabFilter]}>
            <Paragraph
              size={SCREEN_WIDTH < 375 ? 14 : 16}
              color={activeTab ? "#1A1A1A" : "#A0A0A0"}
              noMargin>
              {tab.label}
            </Paragraph>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

TabsFilter.propTypes = {
  type: PropTypes.number.isRequired,
  onChangeTab: PropTypes.func.isRequired,
};

export default React.memo(TabsFilter);
