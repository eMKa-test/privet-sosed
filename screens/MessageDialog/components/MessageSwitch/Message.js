import React from "react";
import * as PropTypes from "prop-types";
import moment from "moment";
import get from "lodash/get";
import {TouchableOpacity, View} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import styles from "../../styles";
import Paragraph from "../../../../components/text/Paragraph";
import RenderLink from "../../../../components/RenderLink";
import QuoteMessage from "./QuoteMessage";
import RenderImages from "../../../../components/RenderImages";
import RenderMsg from "../../../../components/RenderMsgFromType";
import ToUser from "../../../../components/ToUserProfile";
import AttachedFiles from "../../../../components/AttachedFiles";
import {idProp} from "../../../../lib/utils";

function Message(props) {
  const {
    msg, children, toScrollQuoted,
  } = props;
  // eslint-disable-next-line react/prop-types
  const my = msg?.is_my;
  // eslint-disable-next-line camelcase
  const createdTime = moment(msg?.created_time_ts * 1000).format("HH:mm");

  const title = get(msg, "user.title", "");
  const text = get(msg, "html", "");
  const link = get(msg, "attached_link", "");
  const files = get(msg, "files", "");
  const quoted = get(msg, "quoted", "");
  const isEdited = get(msg, "edited_time", false);

  return (
    <View
      style={[styles.msgContainer, my ? styles.myMsg : styles.otherMsg, {
        maxWidth: widthPercentageToDP(70),
      }]}>
      <View style={styles.msgHeader}>
        <ToUser userId={msg?.user?.id}>
          <Paragraph
            noMargin
            size={15}
            medium
            style={styles.msgUserName}>
            {title}
          </Paragraph>
        </ToUser>
        <Paragraph
          noMargin
          size={15}
          style={styles.msgCreatedTime}>
          {createdTime}
        </Paragraph>
        {isEdited ? (
          <Paragraph
            noMargin
            size={15}
            style={styles.editedMsg}>
            (ред.)
          </Paragraph>
        ) : null}
      </View>
      {quoted ? (
        <TouchableOpacity onPress={() => toScrollQuoted(quoted?.id)}>
          <QuoteMessage title={quoted?.user?.title}>
            <RenderMsg
              msg={quoted?.html}
              tailMode />
          </QuoteMessage>
        </TouchableOpacity>
      ) : null}
      <RenderMsg msg={text} />
      {files ? <AttachedFiles files={files} /> : null}
      <RenderImages images={msg?.media} />
      {link ? (
        <RenderLink
          msgScreen
          linkInfo={link} />
      ) : null}
      {children}
    </View>
  );
}

Message.propTypes = {
  msg: PropTypes.shape({
    created_time_ts: PropTypes.number,
    media: PropTypes.arrayOf(PropTypes.shape({})),
    html: PropTypes.string,
    user: PropTypes.shape({
      id: idProp,
    }),
  }),
  children: PropTypes.node,
  toScrollQuoted: PropTypes.func,
};

export default React.memo(Message);
