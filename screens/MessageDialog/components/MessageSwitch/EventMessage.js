import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import memoize from "lodash/memoize";
import styles from "../../styles";
import Paragraph from "../../../../components/text/Paragraph";

const getText = memoize((text) => {
  if (typeof text !== "string") {
    return "";
  }
  return text.includes("&mdash;")
    ? ` \u2013${text.replace(" &mdash;", "")}`
    : text;
});

function EventMessage({data}) {
  return (
    <View style={styles.eventMsgContainer}>
      {data.map((el, i) => {
        return (
          <Paragraph
            key={String(i)}
            noMargin
            center
            size={14}
            medium={Boolean(el.title)}
            style={styles.eventMsg}>
            {getText(el.title || el.text)}
          </Paragraph>
        );
      })}
    </View>
  );
}

EventMessage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default React.memo(EventMessage);
