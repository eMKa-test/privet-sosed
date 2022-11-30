import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import {idProp, keyExtractor} from "../../lib/utils";
import DocRow from "../../components/DocRow";
import FileRow from "../../components/FileRow";
import styles from "./styles";
import LinkVideoRow from "../../components/LinkVideoRow";

function FilesList(props) {
  const {
    files, afterDelete, editFiles, afterDeleteOther, linkVideos,
  } = props;

  return (
    <View style={styles.filesList}>
      {files?.length > 0 && files.map((file) => (
        <DocRow
          afterDelete={afterDelete}
          key={keyExtractor(file)}
          data={typeof file === "string" ? {error: file} : file} />
      ))}
      {Array.isArray(editFiles) && editFiles.map((file) => (
        <FileRow
          afterDelete={() => afterDeleteOther(file?.id)}
          key={keyExtractor(file)}
          data={file} />
      ))}
      {Array.isArray(linkVideos) && linkVideos.map((file) => (
        <LinkVideoRow
          key={keyExtractor(file)}
          data={file}
          afterDelete={() => afterDeleteOther(file?.id, "link")} />
      ))}
    </View>
  );
}

FilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: idProp,
    }),
  ])),
  editFiles: PropTypes.arrayOf(PropTypes.object),
  linkVideos: PropTypes.arrayOf(PropTypes.object),
  afterDelete: PropTypes.func,
  afterDeleteOther: PropTypes.func,
};

export default React.memo(FilesList);
