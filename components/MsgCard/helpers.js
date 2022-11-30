import LeaveRoomIcon from "../icons/leaveRoomIcon";
import ClearMsgIcon from "../icons/clearMsgIcon";
import MuteOnIcon from "../icons/muteOn";
import MuteOffIcon from "../icons/muteOff";
import JoinRoomIcon from "../icons/joinRoom";

export const CLEAR = "clear";
export const LEAVE = "leave";
export const DELETE_ROOM = "delete_room";
export const DELETE_CHAT = "delete_chat";
export const DELETE = "delete";
export const UNMUTE = "unmute";
export const MUTE = "mute";
export const JOIN = "join";

const options = {
  [CLEAR]: {
    id: 33,
    label: "Очистить историю",
    action: CLEAR,
    icon: ClearMsgIcon,
  },
  [LEAVE]: {
    id: 44,
    label: "Покинуть беседу",
    action: LEAVE,
    icon: LeaveRoomIcon,
  },
  [DELETE_ROOM]: {
    id: 55,
    label: "Удалить беседу",
    action: DELETE,
    icon: LeaveRoomIcon,
  },
  [DELETE_CHAT]: {
    id: 66,
    label: "Удалить чат",
    action: DELETE,
    icon: LeaveRoomIcon,
  },
  [JOIN]: {
    id: 77,
    label: "Вернуться в беседу",
    action: JOIN,
    icon: JoinRoomIcon,
  },
};
function transformType(type, canLeave, canDelete, canJoin) {
  const menu = [
    {
      id: 34,
      label: "Очистить историю",
      action: CLEAR,
      icon: ClearMsgIcon,
    },
  ];
  switch (type) {
    case 1: {
      return menu;
    }
    case 2: {
      const result = [];
      if (canJoin) {
        result.push(options[JOIN], options[DELETE_ROOM]);
      } else {
        menu.push(options[LEAVE]);
        result.push(...menu);
      }
      return result;
    }
    default:
      return menu.concat(options[DELETE_CHAT]);
  }
}

export const modalOptions = (muteIs, canLeave, canDelete, canJoin, type = 0) => {
  const defaultMenu = transformType(type, canLeave, canDelete, canJoin);
  let muteMenu = [];
  if (type !== 4 && !canJoin) {
    muteMenu = muteIs ? [{
      id: 11,
      label: "Включить уведомления",
      action: UNMUTE,
      icon: MuteOffIcon,
    }] : [{
      id: 12,
      label: "Отключить уведомления",
      action: MUTE,
      icon: MuteOnIcon,
    }];
  }
  return muteMenu.concat(defaultMenu);
};
