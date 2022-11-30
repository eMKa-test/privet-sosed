import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import Paragraph from "../../../components/text/Paragraph";
import DotSeparator from "../DotSeparator";
import {declensionOfNumbers} from "../../../lib/utils";
import styles from "./styles";

function Replies(props) {
  const {
    lastUserName, commentsCount, fetchFirstComments,
  } = props;

  return (
    <TouchableOpacity onPress={fetchFirstComments}>
      <View style={[styles.root, {flexDirection: (lastUserName.length > 17) ? "column" : "row"}]}>
        <View style={styles.sides}>
          <Paragraph
            size={15}
            medium
            noMargin>
            {lastUserName}
          </Paragraph>
          <Paragraph
            size={15}
            noMargin>
            {" ответил"}
          </Paragraph>
        </View>
        <View style={styles.sides}>
          <DotSeparator />
          <Paragraph
            size={15}
            noMargin>
            {`${commentsCount} ${declensionOfNumbers(commentsCount, "ответ", "ответа", "ответов")}`}
          </Paragraph>
        </View>
      </View>
    </TouchableOpacity>
  );
}

Replies.propTypes = {
  lastUserName: PropTypes.string,
  commentsCount: PropTypes.number,
  fetchFirstComments: PropTypes.func,
};

export default Replies;
