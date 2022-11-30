import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import memo from "lodash/memoize";
import {View, Text} from "react-native";
import styles from "./styles";
import CountBadge from "../../../badges/CountBadge";
import UserMsgAvatar from "./UserMsgAvatar";
import {parseHtml} from "../../../../lib/parseHtml";
import {idProp, sliceText} from "../../../../lib/utils";

const getText = (msg) => {
  let str = "";
  parseHtml(msg).forEach((el, i) => {
    let text = el.title || el.html || el.text;
    if (text) {
      text = text.includes("&mdash;")
        ? ` \u2013${text.replace(" &mdash;", "")}`
        : text;
      str += text;
    }
  });
  return str;
};

const memoRender = memo((msg) => {
  let text = msg;
  if (msg.includes("[[")) {
    text = getText(msg);
  }
  return (
    <Text
      style={styles.msgPreviewBodyLastMsg}
      numberOfLines={1}
      ellipsizeMode="tail">
      {sliceText(text, 28)}
    </Text>
  );
});

function Footer({item, children}) {
  const lastMsg = get(item, "last_message.html", "");
  const newMessages = get(item, "new_messages", 0);
  const lastMsgUserAva = get(item, "last_message.user.avatar", "");
  const isEventRoom = get(item, "last_message.is_event", false);

  return (
    <View style={styles.footerRoot}>
      <View style={styles.msgPreviewFooter}>
        <UserMsgAvatar
          isEventRoom={isEventRoom}
          type={item?.room?.type}
          src={lastMsgUserAva} />
        {memoRender(lastMsg)}
      </View>
      <View style={styles.notifyContainer}>
        <CountBadge count={newMessages} />
        {children}
      </View>
    </View>
  );
}

Footer.propTypes = {
  item: PropTypes.shape({
    id: idProp,
  }),
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]).isRequired,
};

export default React.memo(Footer);
