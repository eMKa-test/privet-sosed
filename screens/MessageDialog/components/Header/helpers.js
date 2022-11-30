import get from "lodash/get";
import uniqueId from "lodash/uniqueId";
import InfoIcon from "../../../../components/icons/info";
import AttachDialogIcon from "../../../../components/icons/attachDialog";
import AddUserDialogIcon from "../../../../components/icons/addUserDialog";
import SearchMsgIcon from "../../../../components/icons/searchDialog";
import MuteOnIcon from "../../../../components/icons/muteOn";
import MuteOffIcon from "../../../../components/icons/muteOff";
import ClearMsgIcon from "../../../../components/icons/clearMsgIcon";
import LeaveRoomIcon from "../../../../components/icons/leaveRoomIcon";
import JoinRoomIcon from "../../../../components/icons/joinRoom";
import addAdmin from "../../../../lib/api/chat-manage/add-admin";
import removeAdmin from "../../../../lib/api/chat-manage/remove-admin";
import kickUser from "../../../../lib/api/chat-manage/kick";

export const DIALOG_INFO = "info"; // get-info
export const DIALOG_ATTACHMENTS = "attachments";
export const DIALOG_ADD_USERS = "add"; // invite
export const DIALOG_SEARCH_MSG = "search"; // search-chat
export const DIALOG_MUTE = "mute";
export const DIALOG_UNMUTE = "unmute";
export const DIALOG_CLEAR = "clear";
export const DIALOG_LEAVE = "leave";
export const DIALOG_JOIN = "join";
export const DIALOG_DELETE = "delete";
export const DIALOG_DELETE_CHAT = "delete_chat";
export const DIALOG_DELETE_GROUP = "delete_group";

const options = {
  [DIALOG_INFO]: {
    id: uniqueId("dialog:option:"),
    label: "Информация о беседе",
    icon: InfoIcon,
    action: DIALOG_INFO,
  },
  [DIALOG_ATTACHMENTS]: {
    id: uniqueId("dialog:option:"),
    label: "Показать вложения",
    icon: AttachDialogIcon,
    action: DIALOG_ATTACHMENTS,
  },
  [DIALOG_ADD_USERS]: {
    id: uniqueId("dialog:option:"),
    label: "Добавить собеседников",
    icon: AddUserDialogIcon,
    action: DIALOG_ADD_USERS,
  },
  [DIALOG_SEARCH_MSG]: {
    id: uniqueId("dialog:option:"),
    label: "Поиск сообщений",
    icon: SearchMsgIcon,
    action: DIALOG_SEARCH_MSG,
  },
  [DIALOG_MUTE]: {
    id: uniqueId("dialog:option:"),
    label: "Отключить уведомления",
    icon: MuteOnIcon,
    action: DIALOG_MUTE,
  },
  [DIALOG_UNMUTE]: {
    id: uniqueId("dialog:option:"),
    label: "Включить уведомления",
    icon: MuteOffIcon,
    action: DIALOG_UNMUTE,
  },
  [DIALOG_CLEAR]: {
    id: uniqueId("dialog:option:"),
    label: "Очистить историю",
    icon: ClearMsgIcon,
    action: DIALOG_CLEAR,
  },
  [DIALOG_LEAVE]: {
    id: uniqueId("dialog:option:"),
    label: "Покинуть беседу",
    icon: LeaveRoomIcon,
    action: DIALOG_LEAVE,
  },
  [DIALOG_JOIN]: {
    id: uniqueId("dialog:option:"),
    label: "Вернуться в беседу",
    icon: JoinRoomIcon,
    action: DIALOG_JOIN,
  },
  [DIALOG_DELETE_CHAT]: {
    id: uniqueId("dialog:option:chat:"),
    label: "Удалить чат",
    icon: LeaveRoomIcon,
    action: DIALOG_DELETE,
  },
  [DIALOG_DELETE_GROUP]: {
    id: uniqueId("dialog:option:group:"),
    label: "Удалить беседу",
    icon: LeaveRoomIcon,
    action: DIALOG_DELETE,
  },
};

function renderOptions(type, isAdmin, canLeave, canJoin) {
  const top = [];
  const bottom = [];
  switch (type) {
    case 1: {
      top.push(
        options[DIALOG_INFO],
        options[DIALOG_ATTACHMENTS],
        options[DIALOG_SEARCH_MSG],
      );
      bottom.push(
        options[DIALOG_CLEAR],
      );
      return {top, bottom};
    }
    case 2: {
      const subTop = [];
      const subBottom = [];
      if (isAdmin) {
        subTop.push(
          options[DIALOG_INFO],
          options[DIALOG_ADD_USERS],
        );
        subBottom.push(
          options[DIALOG_CLEAR],
          options[DIALOG_LEAVE],
        );
      } else if (canJoin) {
        subBottom.push(
          options[DIALOG_JOIN],
          options[DIALOG_DELETE_GROUP],
        );
      } else {
        subTop.push(
          options[DIALOG_INFO],
        );
        subBottom.push(
          options[DIALOG_CLEAR],
          options[DIALOG_LEAVE],
        );
      }
      top.push(
        ...subTop,
        options[DIALOG_ATTACHMENTS],
        options[DIALOG_SEARCH_MSG],
      );
      bottom.push(...subBottom);
      return {top, bottom};
    }
    case 3: {
      top.push(
        options[DIALOG_ATTACHMENTS],
        options[DIALOG_SEARCH_MSG],
      );
      bottom.push(
        options[DIALOG_CLEAR],
        options[DIALOG_DELETE_CHAT],
      );
      return {top, bottom};
    }
    case 4: {
      top.push(
        options[DIALOG_ATTACHMENTS],
        options[DIALOG_SEARCH_MSG],
      );
      bottom.push(
        options[DIALOG_CLEAR],
        options[DIALOG_DELETE_CHAT],
      );
      return {top, bottom};
    }
    default:
      return {top: [], bottom: []};
  }
}

export function modalOptions(item) {
  const {type} = item.room;
  const isMute = get(item, "is_muted", false);
  const canJoin = get(item, "can_join", false);
  const isAdmin = get(item, "is_admin", false);
  const canLeave = get(item, "can_leave", false);
  const {top, bottom} = renderOptions(type, isAdmin, canLeave, canJoin);
  const withNotify = [];
  if (type !== 4 && !canJoin) {
    withNotify.push(isMute ? options[DIALOG_UNMUTE] : options[DIALOG_MUTE]);
  }
  return {top, bottom: withNotify.concat(bottom)};
}

export const initialConfirm = (action, id) => {
  const data = {
    clear: {
      title: "Удалить все сообщения",
      contentText: `Вы действительно хотите удалить всю переписку с данной беседой?
            \nОтменить это действие будет невозможно.`,
    },
    leave: {
      title: "Выйти из беседы",
      contentText: "Покинув беседу, Вы не будете получать новые сообщения от участников.",
    },
    delete: {
      title: "Удаление беседы",
      contentText: `Вы действительно хотите удалить беседу?
            \nОтменить это действие будет невозможно.`,
    },
  };
  return {
    id,
    action,
    ...data[action],
  };
};

const ADD_ADMIN = "addAdmin";
const REMOVE_ADMIN = "removeAdmin";
const REMOVE_FROM_CHAT = "kickUser";

const optionsUserAction = {
  [ADD_ADMIN]: {
    id: uniqueId("dialogInfo:option:"),
    label: "Назначить администратором",
    action: ADD_ADMIN,
  },
  [REMOVE_ADMIN]: {
    id: uniqueId("dialogInfo:option:"),
    label: "Расжаловать администратора",
    action: REMOVE_ADMIN,
  },
  [REMOVE_FROM_CHAT]: {
    id: uniqueId("dialogInfo:option:"),
    label: "Исключить из беседы",
    action: REMOVE_FROM_CHAT,
  },
};

export const modalOptionsUser = (item) => {
  if (Object.is(item, null)) {
    return [];
  }
  const result = [];
  const isAdmin = get(item, "is_admin", false);

  if (isAdmin) {
    result.push(optionsUserAction[REMOVE_ADMIN]);
  } else {
    result.push(optionsUserAction[ADD_ADMIN]);
  }
  result.push(optionsUserAction[REMOVE_FROM_CHAT]);
  return result;
};

const userAction = {
  addAdmin,
  removeAdmin,
  kickUser,
};

export const fetchUserAction = async (action, params, callback) => {
  try {
    await userAction[action](params);
  } catch (e) {
    console.sendError("Err userAction ", e.message);
  } finally {
    callback();
  }
};
