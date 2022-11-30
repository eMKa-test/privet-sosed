import request from "../../request";

// id = social network id  google/vk/ya ... etc
const unlinkProfile = async (id) => {
  const [req] = await request("/account/unlink-profile", {
    body: {type: id},
  });
  const res = await req;
  if (res?.error !== 0) {
    return res.error;
  }
  return false;
};

export default unlinkProfile;
