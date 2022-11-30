import React from "react";
import * as PropTypes from "prop-types";
import {
  View, Text, TouchableOpacity, Image,
} from "react-native";
import get from "lodash/get";
import Avatar from "../../../../../components/MsgCard/Avatar";
import DotsIcon from "../../../../../components/icons/dots";
import styles from "./styles";
import GpsMarkIcon from "../../../../../components/icons/gpsmark";
import MuteOnIcon from "../../../../../components/icons/muteOn";
import JoinRoomIcon from "../../../../../components/icons/joinRoom";
import {idProp, imageSource} from "../../../../../lib/utils";
import {UNKNOWN_ERROR, USER_PAGE_SCREEN} from "../../../../../constants/Vars";
import {navigate} from "../../../../../navigation/root";
import Fade from "../../../../../components/AnimateWrappers/Fade";

const roomNameStyles = [styles.roomTitle, styles.houseRoomTitle];
const withAddress = [1, 2];

function HeaderDialog({item, openMenu}) {
  const roomName = get(item, "room.name", "");
  const roomAddress = get(item, "room.house.name", "");
  const userStatus = get(item, "room.user.online", UNKNOWN_ERROR);
  const type = get(item, "room.type", "");
  const mute = get(item, "is_muted", false);
  const canJoin = get(item, "can_join", false);
  const lastVisit = get(item, "room.user.last_visit_time", UNKNOWN_ERROR);
  const male = get(item, "room.user.sex", false);
  const userAvatar = get(item, "room.image.thumbs", false);

  const openUserPage = React.useCallback(() => {
    if (type === 3) {
      return navigate(USER_PAGE_SCREEN, {userId: item?.room?.user?.id});
    }
    return null;
  }, [item?.room?.type]);

  return (
    <React.Fragment>
      <Fade
        depProp={Boolean(item?.room)}
        style={{flexDirection: "row", margin: 1}}>
        <View
          style={styles.headerWrapper}
          onPress={openUserPage}>
          {userAvatar ? (
            <Image
              style={styles.customAvatar}
              resizeMode="cover"
              source={imageSource(userAvatar["80"] || userAvatar["200"])} />
          ) : (
            <Avatar
              size={40}
              sizeIcon={24}
              room={item?.room} />
          )}
          <View style={styles.dialogHeaderTitle}>
            <View style={styles.title}>
              <Text
                style={styles.roomTitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {type === 1 ? "Общедомовой чат" : roomName}
              </Text>
            </View>
            {withAddress.includes(type) ? (
              <View style={styles.titleWithGPSMarker}>
                <View style={styles.gpsTitleContainer}>
                  <GpsMarkIcon />
                  <Text
                    style={roomNameStyles}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {roomAddress}
                  </Text>
                </View>
              </View>
            ) : null}
            {type === 3 ? (
              <Text style={styles.userStatus}>
                {userStatus === "online"
                  ? "в сети"
                  : `${male === 1 ? "был" : "была"} в сети ${lastVisit.toLowerCase()}`}
              </Text>
            ) : null}
          </View>
          {canJoin ? (
            <View style={styles.roomStatusInfo}>
              <JoinRoomIcon size={18} />
            </View>
          ) : null}
          {mute && !canJoin ? (
            <View style={styles.roomStatusInfo}>
              <MuteOnIcon size={18} />
            </View>
          ) : null}
        </View>
      </Fade>
      <TouchableOpacity
        style={styles.msgPreviewHeaderDots}
        onPress={openMenu}>
        <DotsIcon />
      </TouchableOpacity>
    </React.Fragment>
  );
}

HeaderDialog.propTypes = {
  item: PropTypes.shape({
    id: idProp,
    room: PropTypes.shape({
      type: idProp,
    }),
  }),
  openMenu: PropTypes.func.isRequired,
};

export default React.memo(HeaderDialog);
