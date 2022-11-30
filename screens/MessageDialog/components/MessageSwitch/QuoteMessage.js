import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import styles from "../../styles";
import Paragraph from "../../../../components/text/Paragraph";

function QuoteMessage(props) {
  const {children, title} = props;
  return (
    <View style={styles.rootQuote}>
      <Paragraph
        style={styles.quoteTitle}
        medium
        size={13}
        noMargin>
        {title}
      </Paragraph>
      {children}
    </View>
  );
}

QuoteMessage.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
};

export default React.memo(QuoteMessage);
