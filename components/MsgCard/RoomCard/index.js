import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import isPlainObject from "lodash/isPlainObject";
import {View, Image} from "react-native";
import styles from "../styles";
import Avatar from "../Avatar";
import Body from "./Body";
import {idProp, imageSource} from "../../../lib/utils";

function RoomCard({ data }) {
  const _room = get(data, "room", "");
  const room = isPlainObject(_room) ? _room : {};
  const userAvatar = get(data, "room.image.thumbs", false);

  return (
    <View style={styles.root}>
      {userAvatar ? (
        <Image
          source={imageSource(userAvatar["80"] || userAvatar["200"])}
          resizeMode="cover"
          style={styles.customAvatar} />
      ) : (
        <Avatar room={room} />
      )}
      <Body item={data} />
    </View>
  );
}

RoomCard.propTypes = {
  data: PropTypes.shape({
    id: idProp,
  }).isRequired,
};

export default React.memo(RoomCard);
