import React from "react";
import * as PropTypes from "prop-types";
import {
  Image, StyleSheet, TouchableOpacity, View,
} from "react-native";
import {imageSource, idProp} from "../lib/utils";
import Paragraph from "./text/Paragraph";
import {DIMMED_TEXT, GREY} from "../constants/Colors";
import CloseIcon from "./icons/close";
import AttachedFileIcon from "./icons/attachedFile";

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

function FileRow(props) {
  const {data, afterDelete} = props;

  if (!data) {
    return null;
  }

  const {
    name, title, size, duration, thumbs,
  } = data;

  const thumb = thumbs && (thumbs["370"] || thumbs["80"]);

  return (
    <View style={styles.root}>
      {!thumb ? (
        <View style={styles.thumbnail}>
          <AttachedFileIcon />
        </View>
      ) : (
        <Image
          style={styles.thumbnail}
          source={imageSource(thumb)} />
      )}
      <View style={styles.fileInfo}>
        <Paragraph
          size={14.5}
          noMargin>
          {name || title || "Ошибка в имени файла"}
        </Paragraph>
        <Paragraph
          size={13}
          noMargin
          color={DIMMED_TEXT}>
          {size || duration}
        </Paragraph>
      </View>
      <TouchableOpacity
        style={styles.deleteWrapper}
        onPress={afterDelete}>
        <View style={styles.delete}>
          <CloseIcon color={GREY} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

FileRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    title: PropTypes.string,
    size: idProp,
    duration: idProp,
    thumbs: PropTypes.objectOf(PropTypes.string),
  }),
  afterDelete: PropTypes.func,
};

export default React.memo(FileRow);
