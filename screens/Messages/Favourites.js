import React, {useCallback} from "react";
import * as PropTypes from "prop-types";
import {FlatList, TouchableOpacity} from "react-native";
import {keyExtractor} from "../../lib/utils";
import NoRooms from "../../components/MsgCard/NoRooms";
import FavoriteMessages from "../../components/MsgCard/FavoriteMessages";

function Favourites(props) {
  const {data, load, navigateToRoom} = props;

  const goToRoom = useCallback((item) => () => {
    const {room_id, id} = item;
    if (id && room_id) {
      navigateToRoom(room_id, id);
    }
  }, [navigateToRoom]);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={data}
      ListHeaderComponent={data?.length === 0 && !load
        ? (
          <NoRooms type="favorite" />
        ) : null}
      renderItem={({item}) => (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={goToRoom(item)}>
          <FavoriteMessages data={item} />
        </TouchableOpacity>
      )} />
  );
}

Favourites.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  navigateToRoom: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired,
};

export default React.memo(Favourites);
