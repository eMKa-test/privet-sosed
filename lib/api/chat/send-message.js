import request from "../../request";

const sendMessage = async (params) => {
  const {
    id = 0, text = "", quoteId = 0, postId = 0, fileIds = "", videoIds = [], linkId = "",
  } = params;
  const [req] = await request("/chat/send-message", {
    body: {
      id, text, quote_id: quoteId, post_id: postId, file_ids: fileIds, link_id: linkId, video_ids: videoIds,
    },
  });
  const res = await req;
  if (res && res.error === 0) {
    return true;
  }
  return false;
};

export default sendMessage;
