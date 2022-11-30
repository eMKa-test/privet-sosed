import React from "react";
import * as PropTypes from "prop-types";
import {
  Text, Image, TouchableOpacity, View,
} from "react-native";
import styles from "./styles";
import CheckboxIcon from "../../components/icons/checkbox";
import {imageSource} from "../../lib/utils";
import StatusBadge from "../../components/badges/StatusBadge";

const UserCard = (props) => {
  const {
    title, id, checked, onPress, avatar, status,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(id)}
      style={styles.userListContainer}>
      <View style={styles.userListInfo}>
        <StatusBadge
          active={status === "online"}
          size={12}>
          <Image
            source={imageSource(avatar)}
            style={styles.userListAvatar} />
        </StatusBadge>
        <Text style={styles.userListTitle}>{title}</Text>
      </View>
      <CheckboxIcon
        checked={checked}
        style={styles.userListCheckbox}
        extendCheckedIconStyle={styles.userListCheckboxIcon} />
    </TouchableOpacity>
  );
};

UserCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default React.memo(UserCard);
