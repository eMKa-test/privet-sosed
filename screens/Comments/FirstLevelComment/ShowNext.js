import React from "react";
import * as PropTypes from "prop-types";
import Paragraph from "../../../components/text/Paragraph";
import styles from "./styles";
import {TouchableOpacity} from "react-native";

function ShowNext({fetchNext}) {
  return (
    <TouchableOpacity onPress={fetchNext}>
      <Paragraph
        style={styles.commentsFooterText}
        size={15}
        medium
        noMargin>
        Показать следующие комментарии
      </Paragraph>
    </TouchableOpacity>
  );
}

ShowNext.propTypes = {
  fetchNext: PropTypes.func,
};

export default React.memo(ShowNext);
