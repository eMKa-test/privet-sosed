import React from "react";
import * as PropTypes from "prop-types";
import {
  View, ScrollView, Text, TouchableOpacity,
} from "react-native";
import styles from "./styles";
import {idProp} from "../../lib/utils";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import Loader from "../../components/loader";
import ItemsGrid from "./ItemsGrid";
import {
  tabs,
  initialState,
  reducer,
  loadList,
  addToList,
  btmLoader,
  loader,
} from "./helpers";

const headerTitle = {label: "Прикреплённые файлы"};

function DialogAttachmentsScreen({route}) {
  const {roomId} = route.params;
  const [tab, setTab] = React.useState(0);
  const [state, dispatch] = React.useReducer(reducer, initialState());

  React.useEffect(() => {
    dispatch(loader());
    const {fetchData, listType} = tabs[tab];
    fetchData({roomId, p: 0}, (list) => {
      dispatch(loadList(list, listType));
    });
  }, [tab]);

  const changeTab = React.useCallback((idx) => () => {
    setTab(idx);
  }, []);

  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    if (state.loading || state.btmLoading) {
      return null;
    }
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const offset = Math.round(contentOffset.y);
    const height = Math.round(contentSize.height - layoutMeasurement.height);
    if (height === offset) {
      dispatch(btmLoader());
      const {fetchData} = tabs[tab];
      fetchData({roomId, p: state.p}, (list) => {
        dispatch(addToList(list));
      });
    }
  }, [tab, state.p]);

  return (
    <View style={styles.root}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu active={headerTitle} />
                )} />
      <View style={styles.wrapperContent}>
        <View style={styles.tabs}>
          {tabs.map(({title, listType}, i) => {
            return (
              <TouchableOpacity
                onPress={changeTab(i)}
                style={[styles.tab, tab === i && styles.selectedTab]}
                key={listType}
                activeOpacity={0.8}>
                <Text
                  style={[styles.tabTitle, tab === i && styles.selectedTabTitle]}>
                  {title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView
          onMomentumScrollEnd={onMomentumScrollEnd}>
          {state.loading
            ? (
              <Loader
                active
                containerStyle={styles.loader} />
            ) : (
              <ItemsGrid
                load={state.btmLoading}
                p={state.p}
                listType={state.listType}
                list={state.list} />
            )}
        </ScrollView>
      </View>
    </View>
  );
}

DialogAttachmentsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      roomId: idProp,
    }),
  }),
};

export default DialogAttachmentsScreen;
