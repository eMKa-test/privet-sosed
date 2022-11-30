import React from "react";
import * as PropTypes from "prop-types";
import {View, TouchableOpacity, Image} from "react-native";
import styles from "./styles";
import {idProp, imageSource} from "../../../../../lib/utils";
import StatusBadge from "../../../../../components/badges/StatusBadge";
import Paragraph from "../../../../../components/text/Paragraph";
import DotsIcon from "../../../../../components/icons/dots";

function UserItem(props) {
  const {
    users, isOwner, isAdmin, openAction, openUserPage,
  } = props;

  return users.map((item) => (
    <TouchableOpacity
      onPress={() => openUserPage(item?.user?.id)}
      style={styles.userItemContainer}
      key={item?.user?.id}>
      <View style={styles.userItem}>
        <StatusBadge
          active={item?.user?.online === "online"}
          size={12}>
          <Image
            source={imageSource(item?.user?.avatar)}
            style={styles.userAvatar} />
        </StatusBadge>
        <View style={styles.userHeader}>
          <View style={styles.userTitle}>
            <Paragraph
              size={15}
              style={styles.titleMargin}
              medium
              noMargin>
              {item?.user?.title}
            </Paragraph>
            {item?.is_owner && item?.is_admin ? (
              <View style={styles.userCreator}>
                <Paragraph
                  size={13}
                  color="rgba(155,178,195,1)"
                  noMargin>
                  Создатель беседы
                </Paragraph>
              </View>
            ) : null}
            {!item?.is_owner && item?.is_admin ? (
              <View style={styles.userCreator}>
                <Paragraph
                  size={13}
                  color="rgba(155,178,195,1)"
                  noMargin>
                  Администратор
                </Paragraph>
              </View>
            ) : null}
          </View>
          {item.user.online === "offline" ? (
            <Paragraph
              size={13}
              color="#ababab"
              noMargin>
              {`${item?.user?.last_visit_time_formatted}`}
            </Paragraph>
          ) : (
            <Paragraph
              size={13}
              color="#ababab"
              noMargin>
              в сети
            </Paragraph>
          )}
        </View>
      </View>
      {isOwner && isAdmin && !item?.is_owner ? (
        <TouchableOpacity
          style={styles.userActionMenu}
          onPress={() => openAction(item)}>
          <DotsIcon />
        </TouchableOpacity>
      ) : null}
      {isAdmin && !isOwner && !item?.is_owner && !item?.is_admin ? (
        <TouchableOpacity
          style={styles.userActionMenu}
          onPress={() => openAction(item)}>
          <DotsIcon />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  ));
}

UserItem.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      avatar: PropTypes.string,
      id: idProp,
    }),
  })),
  isOwner: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  openAction: PropTypes.func.isRequired,
  openUserPage: PropTypes.func.isRequired,
};

export default React.memo(UserItem);
