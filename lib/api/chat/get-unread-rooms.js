import request from "../../request";

const getUnreadRooms = async () => {
  const [req] = await request("/chat/get-unread-rooms");
  const res = await req;
  if (res && res?.data?.cnt && res.error === 0) {
    return res.data.cnt;
  }
  return false;
};

export default getUnreadRooms;
