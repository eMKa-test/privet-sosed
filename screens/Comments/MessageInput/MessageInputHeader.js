import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import Paragraph from "../../../components/text/Paragraph";
import CloseIcon from "../../../components/icons/close";
import {idProp} from "../../../lib/utils";

function MessageInputHeader(props) {
  const {
    responseTo, resetResponseTo, editMode, cancelEditing,
  } = props;

  if (responseTo?.id) {
    return (
      <View style={styles.repliesToWrapper}>
        <Paragraph
          style={styles.headerTitle}
          noMargin>
          {get(responseTo, "user.title", "")}
        </Paragraph>
        <TouchableOpacity onPress={resetResponseTo}>
          <CloseIcon
            size={12}
            small />
        </TouchableOpacity>
      </View>
    );
  }

  if (editMode) {
    return (
      <View style={styles.editTitleWrapper}>
        <Paragraph
          style={styles.headerTitle}
          noMargin>
          Редактирование комментария
        </Paragraph>
        <TouchableOpacity onPress={cancelEditing}>
          <CloseIcon
            size={12}
            small />
        </TouchableOpacity>
      </View>
    );
  }

  return (<View style={styles.repliesToNone} />);
}

MessageInputHeader.propTypes = {
  responseTo: PropTypes.shape({
    id: idProp,
    user: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  resetResponseTo: PropTypes.func,
  editMode: PropTypes.bool,
  cancelEditing: PropTypes.func,
};

export default React.memo(MessageInputHeader);
