import React from "react";
import * as PropTypes from "prop-types";
import {
  Image, StyleSheet, TouchableOpacity, View,
} from "react-native";
import {formatBytes, imageSource} from "../lib/utils";
import Paragraph from "./text/Paragraph";
import {DIMMED_TEXT, GREY} from "../constants/Colors";
import CloseIcon from "./icons/close";
import AttachedFileIcon from "./icons/attachedFile";
import deleteUpload from "../lib/api/files/deleteUrl";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginBottom: 2,
  },
  error: {
    marginTop: 3,
  },
  thumbnail: {
    marginTop: 3,
    width: 30,
    height: 30,
    resizeMode: "cover",
    marginRight: 10,
  },
  fileInfo: {
    flex: 1,
    paddingRight: 8,
  },
  deleteWrapper: {
    alignSelf: "center",
  },
  delete: {
    marginRight: 8,
  },
});

function DocRow(props) {
  const {data, afterDelete} = props;
  if (!data) {
    return null;
  }

  const {
    error, id, thumbnailUrl, type, name, size, deleteUrl,
  } = data;

  const destroy = React.useCallback(async () => {
    if (id && deleteUrl) {
      deleteUpload(deleteUrl)
        .then((success) => {
          if (success) {
            afterDelete(id);
          }
        })
        .catch((e) => {
          console.sendError(`deleteUpload ${e.message}`);
        });
    }
  }, [deleteUrl]);

  if (error) {
    return (
      <View style={styles.root}>
        <Paragraph
          style={styles.error}
          color="red">
          {error}
        </Paragraph>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {!type?.includes("image") ? (
        <View style={styles.thumbnail}>
          <AttachedFileIcon />
        </View>
      ) : (
        <Image
          style={styles.thumbnail}
          source={imageSource(thumbnailUrl)} />
      )}
      <View style={styles.fileInfo}>
        <Paragraph
          size={14.5}
          noMargin>
          {name || "Ошибка в имени файла"}
        </Paragraph>
        <Paragraph
          size={13}
          noMargin
          color={DIMMED_TEXT}>
          {formatBytes(parseInt(size, 10))}
        </Paragraph>
      </View>
      <TouchableOpacity
        style={styles.deleteWrapper}
        onPress={destroy}>
        <View style={styles.delete}>
          <CloseIcon color={GREY} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

DocRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.number,
    thumbnailUrl: PropTypes.string,
    deleteType: PropTypes.string,
    deleteUrl: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  afterDelete: PropTypes.func,
};

export default React.memo(DocRow);
