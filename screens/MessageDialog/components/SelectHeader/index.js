import React from "react";
import * as PropTypes from "prop-types";
import {View, TouchableOpacity} from "react-native";
import styles from "./styles";
import CloseIcon from "../../../../components/icons/close";
import Paragraph from "../../../../components/text/Paragraph";
import {declinationWord} from "../../../../lib/utils";
import TrashIcon from "../../../../components/icons/trash";
import FavoriteBigIcon from "../../../../components/icons/favoriteBig";
import EditIcon from "../../../../components/icons/edit";

const usersCountGroup = ["сообщение", "сообщения", "сообщений"];

function SelectHeader(props) {
  const {
    dismiss, selectedLength, onDelete, onFavourite, favMode, onAnswer, canEdit, onEdit,
  } = props;

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.countItems}
        onPress={dismiss}>
        <Paragraph
          noMargin
          medium
          style={styles.countTitle}>
          {declinationWord(selectedLength, usersCountGroup)}
        </Paragraph>
        <CloseIcon
          color="#8AA0AD"
          size={16} />
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionIcons}
          onPress={onFavourite}>
          <FavoriteBigIcon
            filled={favMode}
            size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionIcons}
          onPress={onDelete}>
          <TrashIcon size={22} />
        </TouchableOpacity>
        {selectedLength === 1 ? (
          <React.Fragment>
            {canEdit ? (
              <TouchableOpacity
                style={styles.actionIcons}
                onPress={onEdit}>
                <EditIcon size={22} />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={styles.answerButton}
              onPress={onAnswer}>
              <Paragraph
                noMargin
                color="#fff">
                Ответить
              </Paragraph>
            </TouchableOpacity>
          </React.Fragment>
        ) : null}
      </View>
    </View>
  );
}

SelectHeader.propTypes = {
  dismiss: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFavourite: PropTypes.func.isRequired,
  selectedLength: PropTypes.number,
  favMode: PropTypes.bool.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
};

export default React.memo(SelectHeader);
