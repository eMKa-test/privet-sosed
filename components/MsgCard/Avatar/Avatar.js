import React from "react";
import * as PropTypes from "prop-types";
import {Image} from "react-native";
import {imageSource} from "../../../lib/utils";
import NoAvatarIcon from "../../icons/noavatar";

const calcHeight = (big, size) => {
  return big ? size + 4 : size / 2;
};

function Avatar({
  avatar, index, len, size,
}) {
  return avatar ? (
    <Image
      style={{ width: size / 2, height: calcHeight(((index === 0 && len === 3) || (len === 2)), size), margin: 1 }}
      source={imageSource(avatar)} />
  ) : (<NoAvatarIcon />);
}

Avatar.propTypes = {
  avatar: PropTypes.string,
  len: PropTypes.number,
  index: PropTypes.number,
  size: PropTypes.number,
};

export default React.memo(Avatar);
