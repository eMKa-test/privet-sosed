import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import NoAvatarIcon from "../../icons/noavatar";
import styles from "./styles";

function DefaultAvatar({
  size, sizeIcon, noMargin, extendStyle = {},
}) {
  return (
    <View
      style={[
        styles.defaultMsgPreviewAvatar,
        {width: size, height: size},
        noMargin && styles.noMargin,
        extendStyle,
      ]}>
      <NoAvatarIcon size={sizeIcon} />
    </View>
  );
}

DefaultAvatar.propTypes = {
  size: PropTypes.number,
  sizeIcon: PropTypes.number,
  noMargin: PropTypes.bool,
  extendStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default React.memo(DefaultAvatar);
