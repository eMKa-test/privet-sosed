import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import styles from "./styles";
import Avatar from "./Avatar";

function MultipleAvatar({users, size, noMargin}) {
  const len = users.length;
  return (
    <View
      style={[
        styles.avatarUsersContainer,
        {height: size, width: size},
        noMargin && styles.noMargin]}>
      <View style={[styles.avaGrid, {height: size + 4, width: size + 4}]}>
        {users.map(({avatar, id}, i) => (
          <React.Fragment key={id}>
            <Avatar
              size={size}
              index={i}
              avatar={avatar}
              len={len} />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

MultipleAvatar.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  size: PropTypes.number.isRequired,
  noMargin: PropTypes.bool,
};

export default React.memo(MultipleAvatar);
