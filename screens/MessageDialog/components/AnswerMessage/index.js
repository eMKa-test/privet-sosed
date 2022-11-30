import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import {View, TouchableOpacity} from "react-native";
import styles from "./styles";
import {idProp} from "../../../../lib/utils";
import CloseIcon from "../../../../components/icons/close";
import {UNKNOWN_ERROR} from "../../../../constants/Vars";
import Paragraph from "../../../../components/text/Paragraph";
import RenderMsg from "../../../../components/RenderMsgFromType";

function AnswerMessage(props) {
  const {msg, dismiss} = props;
  const userName = get(msg, "user.title", UNKNOWN_ERROR);
  const userText = get(msg, "html", UNKNOWN_ERROR);

  return (
    <View style={styles.rootAnswer}>
      <View style={styles.answerBody}>
        <Paragraph
          noMargin
          medium
          size={14}>
          {userName}
        </Paragraph>
        <RenderMsg
          tailMode
          msg={userText} />
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={dismiss}>
        <CloseIcon
          color="#8AA0AD"
          size={16} />
      </TouchableOpacity>
    </View>
  );
}

AnswerMessage.propTypes = {
  msg: PropTypes.shape({
    id: idProp,
  }).isRequired,
  dismiss: PropTypes.func.isRequired,
};

export default React.memo(AnswerMessage);
