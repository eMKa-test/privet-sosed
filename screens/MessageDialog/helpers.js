import getInfo from "../../lib/api/chat/get-info";
import sendMessage from "../../lib/api/chat/send-message";
import editMessage from "../../lib/api/chat/edit-message";
import getLatest from "../../lib/api/chat/get-latest";
import getMessages from "../../lib/api/chat/get-messages";

export function onScrollStops(nativeEvent, callback) {
  const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
  const offset = Math.round(contentOffset.y);
  const height = Math.round(contentSize.height - layoutMeasurement.height);
  if (height === offset) {
    callback(1);
  } else if (offset <= 0) {
    callback(-1);
  }
}

export async function fetchRoomInfo(roomId, callback) {
  let info = {room_id: roomId};
  try {
    info = await getInfo(roomId);
  } finally {
    callback(info);
  }
}

export async function sendMsg(params, callback) {
  try {
    const success = await sendMessage(params);
    if (success) {
      callback();
    }
  } catch (e) {
    console.sendError(`Err sendMessage ${e.message}`);
  }
}

export async function editMsg(params, roomId, callback) {
  try {
    const success = await editMessage(params);
    if (success) {
      const msgParams = {
        id: roomId,
        from_id: params.messageId,
        first_render: true,
        direction: "all",
      };
      const messages = await getMessages(msgParams);
      if (messages.length > 0) {
        const msgAfterEdit = messages.find((msg) => msg?.id === params.messageId);
        if (msgAfterEdit) {
          if (msgAfterEdit) {
            callback(msgAfterEdit);
          }
        }
      }
    }
  } catch (e) {
    console.sendError("Err editMsg ", e.message);
  }
}

export async function fetchLatest(params, callback) {
  let messages = [];
  try {
    messages = await getLatest(params);
  } finally {
    callback(messages);
  }
}

export async function fetchMessages(params, callback) {
  let messages = [];
  try {
    messages = await getMessages(params);
  } finally {
    callback(messages);
  }
}

export default null;
