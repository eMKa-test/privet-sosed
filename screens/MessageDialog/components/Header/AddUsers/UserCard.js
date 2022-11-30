import React from "react";
import * as PropTypes from "prop-types";
import {
  Text, Image, TouchableOpacity, View,
} from "react-native";
import styles from "./styles";
import CheckboxIcon from "../../../../../components/icons/checkbox";
import {idProp, imageSource} from "../../../../../lib/utils";
import StatusBadge from "../../../../../components/badges/StatusBadge";
import {UNKNOWN_ERROR} from "../../../../../constants/Vars";

const UserCard = (props) => {
  const {checked, onPress, user} = props;
  const id = user?.id || UNKNOWN_ERROR;
  const title = user?.title || UNKNOWN_ERROR;
  const avatar = user?.avatar || UNKNOWN_ERROR;
  const status = user?.status || UNKNOWN_ERROR;

  const _onPress = React.useCallback(() => {
    onPress(id);
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={_onPress}
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
  user: PropTypes.shape({
    id: idProp,
    title: PropTypes.string,
  }),
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default React.memo(UserCard);
