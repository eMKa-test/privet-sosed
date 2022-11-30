import React from "react";
import * as PropTypes from "prop-types";
import {Text, View} from "react-native";
import styles from "../../styles";
import Loader from "../../../../components/loader";

function TypingMessage({typing}) {
  return (
    <View style={styles.msgTypingContainer}>
      {typing ? (
        <React.Fragment>
          <Loader
            containerStyle={styles.typingLoader}
            active
            color="#ccc"
            dotsDistance={2.5} />
          <Text
            style={styles.msgTyping}>
            {typing.title}
            &nbsp;
            печатает
          </Text>
        </React.Fragment>
      ) : null}
    </View>
  );
}

TypingMessage.propTypes = {
  typing: PropTypes.bool,
};

export default React.memo(TypingMessage);
