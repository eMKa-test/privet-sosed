import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import * as Linking from "expo-linking";
import uniqueId from "lodash/uniqueId";
import {userItemStyles} from "./styles";
import {idProp} from "../../../lib/utils";
import Paragraph from "../../../components/text/Paragraph";
import Dropdown from "../../../components/dropdown";
import BlockedUserIcon from "../../../components/icons/blockedUser";
import AvatarImage from "../../../components/avatarImage";
import getRoomUser from "../../../lib/api/chat/get-room-user";
import {MESSAGES} from "../../../constants/Vars";
import {navigate} from "../../../navigation/root";
import ToUser from "../../../components/ToUserProfile";

async function fetchRoomUser(userId, callback) {
  let roomId = null;
  try {
    roomId = await getRoomUser(userId);
  } catch (e) {
    // ...
  } finally {
    callback(roomId);
  }
}

const color = "#838c98";
const buttonTitle = "Написать сообщение";
const buttonColor = "#1a1a1a";
const BLOCK_USER = "BLOCK_USER";

const dropdownOptions = () => [{
  id: uniqueId("neighbors:dropdown:"),
  label: "Разблокировать",
  type: BLOCK_USER,
}];

function UserItem(props) {
  const {
    user, houses,
  } = props?.data;

  if (!props.data) {
    return null;
  }

  const {onAction} = props;
  const {
    avatar, title, details, online, id,
  } = user;
  const [firstAddress, secondAddress] = houses;

  const navigateToChatRoom = React.useCallback((roomId) => {
    // eslint-disable-next-line camelcase
    navigate(MESSAGES, {screen: MESSAGES, params: {newRoomId: roomId?.room_id}});
  }, []);

  const handleSendMessage = React.useCallback(() => {
    fetchRoomUser(id, navigateToChatRoom);
  }, [id]);

  return (
    <View style={userItemStyles.root}>
      <ToUser userId={id}>
        <AvatarImage
          avatar={avatar}
          online={online} />
      </ToUser>
      <View style={userItemStyles.info}>
        <ToUser userId={id}>
          <Paragraph
            noMargin
            style={userItemStyles.textLine}
            size={16}
            color={buttonColor}>
            {title}
          </Paragraph>
        </ToUser>
        <Paragraph
          noMargin
          style={userItemStyles.textLine}
          size={13}
          color={color}>
          {firstAddress?.name || "Ошибка в адресе"}
        </Paragraph>
        {secondAddress ? (
          <Paragraph
            noMargin
            style={userItemStyles.textLine}
            size={13}
            color={color}>
            {secondAddress?.name || "Ошибка в адресе"}
          </Paragraph>
        ) : null}
        {details?.email ? (
          <TouchableOpacity
            onPress={() => {
              Linking.canOpenURL(`mailto:${details.email}`).then(() => {
                Linking.openURL(`mailto:${details.email}`);
              });
            }}>
            <Paragraph
              noMargin
              style={userItemStyles.textLine}
              size={14.5}
              color={color}>
              {details.email}
            </Paragraph>
          </TouchableOpacity>
        ) : null}
        {details?.phone ? (
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${details.phone}`)}>
            <Paragraph
              noMargin
              style={userItemStyles.textLine}
              size={18}
              color={color}>
              {details.phone}
            </Paragraph>
          </TouchableOpacity>
        ) : null}
        <View style={userItemStyles.footer}>
          <TouchableOpacity onPress={handleSendMessage}>
            <Paragraph
              noMargin
              size={14.5}
              color={buttonColor}>
              {buttonTitle}
            </Paragraph>
          </TouchableOpacity>
          <BlockedUserIcon />
        </View>
      </View>
      <View style={userItemStyles.dropdown}>
        <Dropdown
          options={dropdownOptions()}
          onSelect={onAction} />
      </View>
    </View>
  );
}

UserItem.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      avatar: PropTypes.string,
      id: idProp,
      title: PropTypes.string,
      blackList: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        type: PropTypes.number,
      })]),
    }).isRequired,
    houses: PropTypes.arrayOf(PropTypes.shape({
      fullname: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onAction: PropTypes.func,
};

export default UserItem;
