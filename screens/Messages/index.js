import get from "lodash/get";
import memoize from "lodash/memoize";
import React, {useCallback} from "react";
import * as PropTypes from "prop-types";
import {View, TouchableOpacity} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import uniqueId from "lodash/uniqueId";
import {connect} from "react-redux";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import {getRooms} from "../../store/actions/messagesActions";
import {idProp} from "../../lib/utils";
import styles from "./styles";
import {navigate} from "../../navigation/root";
import {
  MESSAGESDIALOG, ALL_MESSAGES, NEW_MESSAGES, FAV_MESSAGES, CREATE_ROOM,
} from "../../constants/Vars";
import SearchSection from "../../components/SearchSection";
import CreateRoomIcon from "../../components/icons/createRoomIcon";
import RoomModal from "../../components/MsgCard/RoomModal";
import DefaultList from "./DefaultList";
import Favourites from "./Favourites";

const menu = {
  [ALL_MESSAGES]: {
    id: uniqueId("message:option:"),
    label: "Все сообщения",
    type: ALL_MESSAGES,
  },
  [NEW_MESSAGES]: {
    id: uniqueId("message:option:"),
    label: "Непрочитанные",
    type: NEW_MESSAGES,
  },
  [FAV_MESSAGES]: {
    id: uniqueId("message:option:"),
    label: "Избранные",
    type: FAV_MESSAGES,
  },
};

const options = Object.entries(menu).map(([k, item]) => ({...item, value: k}));
const [initOption] = options;

const isFav = memoize((type) => type === FAV_MESSAGES);

function MessagesScreen(props) {
  const {
    msgRooms, load, fetchRooms, fromId, bottomLoad,
  } = props;

  const [openRoomMenu, setRoomMenu] = React.useState(null);
  const [activeMenuOption, setActiveMenuOption] = React.useState(initOption);

  const navigateToRoom = useCallback((roomId, messageId) => {
    navigate(MESSAGESDIALOG, {roomId, messageId});
  });

  const onFocus = React.useCallback(() => {
    const newRoomId = get(props, "route.params.newRoomId");
    if (newRoomId) {
      setTimeout(() => {
        const setParams = get(props, "navigation.setParams");
        if (typeof setParams === "function") {
          setParams({newRoomId: undefined});
        }
        navigateToRoom(newRoomId);
      }, 10);
    } else {
      fetchRooms({msgType: activeMenuOption?.type, reset: true});
    }
  }, [props.route?.params?.newRoomId, activeMenuOption?.type]);

  useFocusEffect(onFocus);

  const onRefresh = React.useCallback(() => {
    fetchRooms({msgType: activeMenuOption.type, refresh: true});
  }, [activeMenuOption?.type]);

  const onNewRoom = React.useCallback(() => {
    navigate(CREATE_ROOM);
  }, []);

  const filterRoom = React.useCallback((q) => {
    fetchRooms({
      msgType: activeMenuOption.type,
      q,
    });
  }, [activeMenuOption?.type]);

  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const delta = Math.round(contentOffset.y - (contentSize.height - layoutMeasurement.height));
    if (delta < -1 || load || bottomLoad) {
      return null;
    }
    fetchRooms({msgType: activeMenuOption.type, fromId, bottomLoader: true});
  }, [activeMenuOption?.type, fromId, load, bottomLoad]);

  return (
    <View style={styles.root}>
      <Header
        leftItem={(
          <HeaderMenu
            active={activeMenuOption}
            options={options}
            onSelect={setActiveMenuOption} />
        )}
        rightItem={!isFav(activeMenuOption?.type) ? (
          <TouchableOpacity onPress={onNewRoom}>
            <CreateRoomIcon size={22} />
          </TouchableOpacity>
        ) : null} />
      {!isFav(activeMenuOption?.type) ? (
        <SearchSection
          clearDep={activeMenuOption?.type}
          load={load}
          onChange={filterRoom} />
      ) : null}
      {isFav(activeMenuOption?.type) ? (
        <Favourites
          load={load}
          navigateToRoom={navigateToRoom}
          data={msgRooms} />
      ) : (
        <DefaultList
          onMomentumScrollEnd={onMomentumScrollEnd}
          load={load}
          bottomLoad={bottomLoad}
          onRefresh={onRefresh}
          onLongPress={setRoomMenu}
          data={msgRooms} />
      )}
      <RoomModal
        item={openRoomMenu}
        dismissRoomMenu={setRoomMenu} />
    </View>
  );
}

MessagesScreen.propTypes = {
  msgRooms: PropTypes.arrayOf(PropTypes.object),
  load: PropTypes.bool.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      newRoomId: idProp,
    }),
  }),
  fetchRooms: PropTypes.func.isRequired,
  fromId: PropTypes.number,
  bottomLoad: PropTypes.bool,
};

const mapStateToProps = (store) => {
  return {
    msgRooms: store.messages?.rooms,
    load: store.messages?.load,
    bottomLoad: store.messages?.bottomLoad,
    reload: store.messages?.reload,
    fromId: store.messages?.fromId,
  };
};

export default connect(mapStateToProps, {
  fetchRooms: getRooms,
})(MessagesScreen);
