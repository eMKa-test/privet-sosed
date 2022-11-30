import React from "react";
import * as PropTypes from "prop-types";
import {Image} from "react-native";
import DefaultAvatar from "../../Avatar/DefaultAvatar";
import styles from "./styles";
import {idProp, imageSource} from "../../../../lib/utils";

function UserMsgAvatar({type, isEventRoom, src}) {
  if (!isEventRoom) {
    return (
      <Image
        source={imageSource(src)}
        style={styles.msgPreviewLastMsgUserAva} />
    );
  }
  return null;
}

UserMsgAvatar.propTypes = {
  type: idProp,
  isEventRoom: PropTypes.bool.isRequired,
  src: PropTypes.string,
};

export default React.memo(UserMsgAvatar);
