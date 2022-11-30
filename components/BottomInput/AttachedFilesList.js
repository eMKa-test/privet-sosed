import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";
import {idProp, keyExtractor} from "../../lib/utils";
import DocRow from "../DocRow";
import FileRow from "../FileRow";
import LinkVideoRow from "../LinkVideoRow";

const styles = StyleSheet.create({
  root: {
    marginLeft: 36,
  },
});

function AttachedFilesList(props) {
  const {
    files, linkVideos, editFiles, afterDelete, afterDeleteOther,
  } = props;

  if (files?.length < 1 && linkVideos?.length < 1 && editFiles?.length < 1) {
    return null;
  }

  return (
    <View style={styles.root}>
      {Array.isArray(files) && files.map((file) => (
        <DocRow
          key={keyExtractor(file)}
          data={typeof file === "string" ? {error: file} : file}
          afterDelete={afterDelete} />
      ))}
      {Array.isArray(editFiles) && editFiles.map((file) => (
        <FileRow
          key={keyExtractor(file)}
          data={file}
          afterDelete={() => afterDeleteOther(file?.id)} />
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

AttachedFilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: idProp,
    }),
  ])),
  editFiles: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
    name: PropTypes.string,
    size: PropTypes.string,
    path: PropTypes.string,
    thumbs: PropTypes.shape({
      80: PropTypes.string,
    }),
  })),
  linkVideos: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
    name: PropTypes.string,
    size: PropTypes.string,
    path: PropTypes.string,
    thumbs: PropTypes.shape({
      80: PropTypes.string,
    }),
  })),
  afterDelete: PropTypes.func,
  afterDeleteOther: PropTypes.func,
};

export default React.memo(AttachedFilesList);
