import memoize from "lodash/memoize";
import uniqueId from "lodash/uniqueId";

const linkRegExp = /\[\[link href="(.*?)" title="(.*?)"\]\]/ig;
const hashtagRegExp = /\[\[hashtag href="(.*?)"\]\]/ig;
const userLink = /\[\[user id="([^"]*)".?title="([^"]*)"\]\]/g;

export const LINK = "LINK";
export const HASHTAG = "HASHTAG";
export const TEXT = "TEXT";
export const USER_LINK = "USER_LINK";

const createText = memoize((text) => ({component: TEXT, text}));

export function parseHtml(html) {
  const separator = uniqueId(`${Date.now()}::separator::`);
  if (typeof html !== "string") {
    return [];
  }
  let str = html;
  const tickets = {};

  // replace links
  str = str.replace(linkRegExp, (match, href, text) => {
    const key = uniqueId(`${Date.now()}::ticket::`);
    tickets[key] = {component: LINK, href, text};
    return `${separator}${key}${separator}`;
  });

  // replace hashtags
  str = str.replace(hashtagRegExp, (match, href) => {
    const key = uniqueId(`${Date.now()}::ticket::`);
    tickets[key] = {component: HASHTAG, href};
    return `${separator}${key}${separator}`;
  });

  // replace userLink
  str = str.replace(userLink, (match, id, title) => {
    const key = uniqueId(`${Date.now()}::ticket::`);
    tickets[key] = {component: USER_LINK, id, title};
    return `${separator}${key}${separator}`;
  });

  const items = [];
  str.split(separator).forEach((item) => {
    if (item === "") {
      return;
    }
    if (tickets[item]) {
      items.push(tickets[item]);
    } else {
      items.push(createText(item));
    }
  });

  return items;
}
