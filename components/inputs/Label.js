import React from "react";
import * as PropTypes from "prop-types";
import styles from "./styles";
import Paragraph from "../text/Paragraph";

function Label({text}) {
  return text ? (
    <Paragraph
      noMargin
      size={14}
      style={styles.label}>
      {text}
    </Paragraph>
  ) : null;
}

Label.propTypes = {
  text: PropTypes.string,
};

export default React.memo(Label);
