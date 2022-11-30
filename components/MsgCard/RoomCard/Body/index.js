import React from "react";
import * as PropTypes from "prop-types";
import {View, Text} from "react-native";
import get from "lodash/get";
import MuteOnIcon from "../../../icons/muteOn";
import JoinRoomIcon from "../../../icons/joinRoom";
import Footer from "./Footer";
import styles from "./styles";
import GpsMarkIcon from "../../../icons/gpsmark";
import {idProp} from "../../../../lib/utils";
import {UNKNOWN_ERROR} from "../../../../constants/Vars";

const roomsWithAddress = [1, 2, 3];
function MsgBody({item}) {
  const roomName = get(item, "room.name", UNKNOWN_ERROR);
  const lastTimeMsg = get(item, "last_message.created_time", "");
  const userAddress = get(item, "room.house.name", false);
  const mute = item?.is_muted || false; // eslint-disable-line camelcase
  const join = item?.can_join || false; // eslint-disable-line camelcase
  const type = item?.room?.type;

  return (
    <View style={styles.msgPreviewBody}>
      <React.Fragment>
        <View style={styles.msgPreviewHeader}>
          <Text
            style={styles.msgPreviewHeaderTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {roomName}
          </Text>
          <View style={styles.msgPreviewLastTime}>
            <Text style={styles.lastTimeMsg}>
              {lastTimeMsg}
            </Text>
          </View>
        </View>
        {userAddress && roomsWithAddress.includes(type) ? (
          <View style={styles.msgPreviewAddress}>
            <GpsMarkIcon />
            <Text style={styles.msgPreviewAddressValue}>
              {userAddress}
            </Text>
          </View>
        ) : null}
      </React.Fragment>
      <View style={styles.footerWrapper}>
        <Footer item={item}>
          <React.Fragment>
            {mute && !join ? <MuteOnIcon size={16} /> : null}
            {join && <JoinRoomIcon size={18} />}
          </React.Fragment>
        </Footer>
      </View>
    </View>
  );
}

MsgBody.propTypes = {
  item: PropTypes.shape({
    room_id: idProp,
  }),
};

export default React.memo(MsgBody);
