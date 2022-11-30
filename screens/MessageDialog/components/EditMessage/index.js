import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import {View, TouchableOpacity} from "react-native";
import Paragraph from "../../../../components/text/Paragraph";
import styles from "./styles";
import CloseIcon from "../../../../components/icons/close";
import {idProp} from "../../../../lib/utils";

function EditMessage({dismiss, quoted, changeEditMessage}) {
  const title = get(quoted, "user.title", "");
  const text = get(quoted, "html", "");

  return (
    <View style={styles.editMsfRoot}>
      <View style={styles.editMsgHeader}>
        <Paragraph
          color="#333"
          size={16}
          noMargin>
          Редактирование сообщения
        </Paragraph>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={dismiss}>
          <CloseIcon
            color="#8AA0AD"
            size={16} />
        </TouchableOpacity>
      </View>
      {quoted ? (
        <View style={styles.quotedInfo}>
          <View style={styles.quotedInfoBody}>
            <Paragraph
              color="#333"
              medium
              size={13}
              noMargin>
              {title}
            </Paragraph>
            <Paragraph
              tail
              color="#333"
              size={13}
              noMargin>
              {text}
            </Paragraph>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={changeEditMessage}>
            <CloseIcon
              color="#8AA0AD"
              size={16} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

EditMessage.propTypes = {
  dismiss: PropTypes.func.isRequired,
  changeEditMessage: PropTypes.func.isRequired,
  quoted: PropTypes.shape({
    id: idProp,
  }),
};

export default React.memo(EditMessage);
