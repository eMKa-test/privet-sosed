import memoize from "lodash/memoize";
import {parseHtml} from "./parseHtml";

export const types = Object.freeze({
  TEXT: "TEXT",
  LINK: "LINK",
  USER_LINK: "USER_LINK",
});

export const getHtmlLinks = memoize((msg) => {
  let result = "";
  parseHtml(msg).forEach((el, i) => {
    let {text} = el;
    text = text.includes("&mdash;")
      ? ` \u2013${text.replace(" &mdash;", "")}`
      : text;
    result += text;
  });
  return result;
});

export const getText = memoize((msg) => {
  let result = {};
  let text = "";
  parseHtml(msg).forEach((el) => {
    if (types[el.component]) {
      result = {...el};
    } else {
      text = el.title || el.text;
      text = text.includes("&mdash;")
        ? ` \u2013${text.replace(" &mdash;", "")}`
        : text;
      result.text += text;
    }
  });
  return result;
});
