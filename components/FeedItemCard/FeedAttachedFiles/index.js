import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import {idProp} from "../../../lib/utils";
import AttachedFiles from "../../AttachedFiles";
import styles from "./styles";

function FeedAttachedFiles(props) {
  const {files} = props;

  if (!Array.isArray(files) || files?.length < 1) {
    return null;
  }

  return (
    <View style={styles.root}>
      <AttachedFiles files={files} />
    </View>
  );
}

FeedAttachedFiles.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
  })),
};

export default React.memo(FeedAttachedFiles);
