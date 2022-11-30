import React from "react";
import * as PropTypes from "prop-types";
import {
  Image, TouchableOpacity, View, Text,
} from "react-native";
import get from "lodash/get";
import Paragraph from "../../../../../components/text/Paragraph";
import styles from "./styles";
import GpsMarkIcon from "../../../../../components/icons/gpsmark";
import {declensionOfNumbers, idProp, imageSource} from "../../../../../lib/utils";
import Avatar from "../../../../../components/MsgCard/Avatar";
import EditIcon from "../../../../../components/icons/edit";

function HeaderInfo(props) {
  const {
    room, usersCount, isAdmin, openEditModal,
  } = props;
  const isGroup = room?.type === 2;
  const userAvatar = get(room, "image.thumbs", false);

  const handlePressAva = React.useCallback(() => {
    if (isGroup) {
      openEditModal("image");
    }
  }, []);

  return (
    <React.Fragment>
      <TouchableOpacity onPress={handlePressAva}>
        {userAvatar ? (
          <Image
            style={styles.customAvatar}
            resizeMode="cover"
            source={imageSource(userAvatar["80"] || userAvatar["200"])} />
        ) : (
          <Avatar
            noMargin
            size={60}
            room={room} />
        )}
      </TouchableOpacity>
      <View style={styles.roomInfoBody}>
        <View style={styles.headerInfoTitle}>
          <Text style={styles.roomTitle}>
            {isGroup ? room?.name : "Общедомовой чат"}
            {isGroup && isAdmin ? (
              <Text onPress={() => openEditModal("title")}>
                &nbsp;&nbsp;
                <EditIcon size={20} />
              </Text>
            ) : null}
          </Text>
        </View>
        <View style={styles.roomAddress}>
          <GpsMarkIcon size={20} />
          <Paragraph
            size={15}
            medium
            color="#9bb2c3"
            style={styles.roomAddressTitle}
            noMargin>
            {room?.house?.fullname}
          </Paragraph>
        </View>
        <Paragraph
          size={14}
          noMargin
          color="#ababab">
          {`${usersCount} ${declensionOfNumbers(usersCount, "участник", "участника", "участников")}`}
        </Paragraph>
      </View>
    </React.Fragment>
  );
}

HeaderInfo.propTypes = {
  room: PropTypes.shape({
    id: idProp,
  }),
  usersCount: PropTypes.number,
  isAdmin: PropTypes.bool.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

export default React.memo(HeaderInfo);
