import React from "react";
import * as PropTypes from "prop-types";
import {TextInput, View} from "react-native";
import Paragraph from "../../text/Paragraph";
import styles from "./styles";

function TitleEdit(props) {
  const {title, onChange} = props;
  return (
    <View>
      <Paragraph
        style={styles.confirmEditTitle}
        medium
        color="#333"
        noMargin>
        Название беседы
      </Paragraph>
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={onChange} />
    </View>
  );
}

TitleEdit.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(TitleEdit);
