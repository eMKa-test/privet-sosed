import isPlainObject from "lodash/isPlainObject";
import request from "../../request";

const addVideo = async (params) => {
  const {
    url = "", postId = "", commentId = "", messageId = "", roomId = "", houseId = "",
  } = params;
  const [req] = await request("/media/video-add", {
    body: {
      url, post_id: postId, comment_id: commentId, message_id: messageId, room_id: roomId, house_id: houseId,
    },
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return {};
};

export default addVideo;
