import React from "react";
import * as PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import * as Linking from "expo-linking";
import {idProp, keyExtractor} from "../../lib/utils";
import AttachedFileIcon from "../icons/attachedFile";
import styles from "./styles";
import Paragraph from "../text/Paragraph";
import {TEXT_GREY_COLOR} from "../../constants/Colors";
import {BASE_URL} from "../../constants/Config";

function AttachedFiles(props) {
  const {files} = props;

  if (!Array.isArray(files) || files?.length < 1) {
    return null;
  }

  return (
    <View style={styles.root}>
      {files?.map((file) => (
        <TouchableOpacity
          key={keyExtractor(file)}
          style={styles.attachItemWrapper}
          onPress={() => {
            if (file?.path) {
              Linking.openURL(`${BASE_URL}${file?.path}`);
            }
          }}>
          <AttachedFileIcon type={file?.type} />
          <View style={styles.textWrapper}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.fileName}>
              {file?.name}
            </Text>
            <Paragraph
              style={styles.fileSize}
              size={13}
              color={TEXT_GREY_COLOR}
              noMargin>
              {file?.size}
            </Paragraph>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

AttachedFiles.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
  })),
};

export default React.memo(AttachedFiles);
