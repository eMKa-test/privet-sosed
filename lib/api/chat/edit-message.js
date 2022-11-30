import request from "../../request";

const editMessage = async (params) => {
  const {
    messageId = 0,
    text = "",
    quoteId = "",
    postId = 0,
    fileIds = "",
    videoIds = "",
    linkId = "",
  } = params;
  const [req] = await request("/chat/edit-message", {
    body: {
      message_id: messageId,
      text,
      quote_id: quoteId,
      post_id: postId,
      file_ids: fileIds,
      video_ids: videoIds,
      link_id: linkId,
    },
  });
  const res = await req;
  if (res && res.error === 0) {
    return true;
  }
  return false;
};

export default editMessage;
