import request from "../../request";

const localsSearch = async (q) => {
  const [req] = await request("/locals/search", {
    body: {q},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return {};
};

export default localsSearch;
