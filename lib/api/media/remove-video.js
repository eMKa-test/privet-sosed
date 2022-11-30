import request from "../../request";

const removeVideo = async (params) => {
  const {
    videoId = "", postId = "", roomId = "", houseId = "",
  } = params;
  const [req] = await request("/media/video-remove", {
    body: {
      video_id: videoId, post_id: postId, room_id: roomId, house_id: houseId,
    },
  });
  const res = await req;
  if (res && res.error === 0) {
    return true;
  }
  return false;
};

export default removeVideo;
