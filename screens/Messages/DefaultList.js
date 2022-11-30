import React, {useCallback} from "react";
import * as PropTypes from "prop-types";
import {FlatList, RefreshControl, TouchableOpacity} from "react-native";
import get from "lodash/get";
import {keyExtractor} from "../../lib/utils";
import NoRooms from "../../components/MsgCard/NoRooms";
import {navigate} from "../../navigation/root";
import {MESSAGESDIALOG} from "../../constants/Vars";
import RoomCard from "../../components/MsgCard/RoomCard";

import {TRANSPARENT_REFRESH_CONFIG} from "../../constants/Colors";
import Loader from "../../components/loader";

function DefaultList(props) {
  const {
    data, load, onRefresh, onLongPress, onMomentumScrollEnd, bottomLoad,
  } = props;

  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onLongPress={() => onLongPress(item)}
        onPress={() => {
          navigate(MESSAGESDIALOG, {roomId: get(item, "room_id")});
        }}>
        <RoomCard data={item} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList
      onMomentumScrollEnd={onMomentumScrollEnd}
      keyExtractor={keyExtractor}
      data={data}
      ListFooterComponent={bottomLoad ? (
        <Loader
          containerStyle={{marginVertical: 20}}
          active />
      ) : null}
      ListHeaderComponent={data?.length === 0 && !load ? (
        <NoRooms type="all" />
      ) : null}
      renderItem={renderItem}
      refreshControl={(
        <RefreshControl
          tintColor={TRANSPARENT_REFRESH_CONFIG.tintColor}
          colors={TRANSPARENT_REFRESH_CONFIG.colors}
          style={TRANSPARENT_REFRESH_CONFIG.style}
          refreshing={false}
          onRefresh={onRefresh} />
      )} />
  );
}

DefaultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  load: PropTypes.bool.isRequired,
  bottomLoad: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired,
  onMomentumScrollEnd: PropTypes.func.isRequired,
};

export default React.memo(DefaultList);
