import React from "react";
import * as PropTypes from "prop-types";
import {Text, View} from "react-native";
import styles from "./styles";
import Loader from "../../../../components/loader";
import {declensionOfNumbers} from "../../../../lib/utils";

const renderUsers = (users) => {
  let str = "";
  const len = users.length;
  let count = 0;
  users.forEach(({title}, i) => {
    if (i < 2) {
      count += 1;
      if (len > 1 && i !== len - 1 && i !== 1) {
        str += `${title}, `;
      } else {
        str += title;
      }
    }
  });
  if (len > 2) {
    const otherUsersCount = len - count;
    str += ` и ещё ${otherUsersCount} ${declensionOfNumbers(otherUsersCount, "участник", "участника", "участников")} `;
  }
  str += " печатает";
  return str;
};

function TypingMessage({typing = []}) {
  return (
    <View style={styles.msgTypingContainer}>
      {typing.length > 0 ? (
        <React.Fragment>
          <Loader
            containerStyle={styles.typingLoader}
            active
            color="#ccc"
            dotsDistance={2.5} />
          <View style={styles.typingUsersList}>
            <Text
              lineBreakMode="tail"
              numberOfLines={3}
              style={styles.msgTyping}>
              {renderUsers(typing)}
            </Text>
          </View>
        </React.Fragment>
      ) : null}
    </View>
  );
}

TypingMessage.propTypes = {
  typing: PropTypes.arrayOf(PropTypes.object),
};

export default React.memo(TypingMessage);
