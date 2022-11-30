import React from "react";
import * as PropTypes from "prop-types";
import {View, Image} from "react-native";
import {imageSource} from "../../lib/utils";
import {ONLINE_STATUS} from "../../constants/Vars";
import styles from "./styles";

function AvatarImage(props) {
  const {
    avatar,
    online,
    containerStyle = styles.containerStyle,
    avatarStyle = styles.avatarStyle,
    onlineIndicatorStyle = styles.onlineIndicator,
  } = props;

  return (
    <View style={containerStyle}>
      <Image
        style={avatarStyle}
        source={imageSource(avatar)} />
      {online === ONLINE_STATUS ? (
        <View style={onlineIndicatorStyle} />
      ) : null}
    </View>
  );
}

AvatarImage.propTypes = {
  avatar: PropTypes.string,
  online: PropTypes.string,
  containerStyle: PropTypes.shape({}),
  avatarStyle: PropTypes.shape({}),
  onlineIndicatorStyle: PropTypes.shape({}),
};

export default React.memo(AvatarImage);
