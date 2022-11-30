import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import {idProp} from "../../../lib/utils";
import ParsedContent from "../../ParsedContent";
import styles from "./styles";

function FeedParsedContent(props) {
  const {data} = props;
  return (
    <View style={styles.root}>
      <ParsedContent data={data} />
    </View>
  );
}

FeedParsedContent.propTypes = {
  data: PropTypes.shape({
    id: idProp,
  }),
};

export default React.memo(FeedParsedContent);
