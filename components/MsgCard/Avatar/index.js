import React from "react";
import * as PropTypes from "prop-types";
import {Image} from "react-native";
import styles from "./styles";
import {idProp, imageSource} from "../../../lib/utils";
import MultipleAvatar from "./MultipleAvatar";
import DefaultAvatar from "./DefaultAvatar";

function MsgAvatar({
  room, size = 66, sizeIcon = 40, dialog = null, noMargin = false,
}) {
  if ((room?.user?.avatar) || dialog) {
    return (
      <Image
        style={[styles.msgPreviewAvatar, {width: size, height: size}, noMargin && styles.noMargin]}
        source={imageSource(room?.user?.avatar || dialog.avatar)} />
    );
  }
  if (Array.isArray(room?.users) && !dialog) {
    return (
      <MultipleAvatar
        noMargin={noMargin}
        size={size}
        users={room?.users} />
    );
  }
  return (
    <DefaultAvatar
      noMargin={noMargin}
      sizeIcon={sizeIcon}
      size={size} />
  );
}

MsgAvatar.propTypes = {
  room: PropTypes.shape({
    type: idProp,
  }),
  size: PropTypes.number,
  sizeIcon: PropTypes.number,
  dialog: PropTypes.shape({
    avatar: PropTypes.string,
  }),
  noMargin: PropTypes.bool,
};

export default React.memo(MsgAvatar);
