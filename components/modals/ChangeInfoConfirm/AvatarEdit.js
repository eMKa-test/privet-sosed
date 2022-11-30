import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import Paragraph from "../../text/Paragraph";
import styles from "./styles";
import LinearProgress from "../../LinearProgress";

const types = {
  groupAvatar: {
    title: "Тебе с соседями будет проще узнавать беседу, если ты загрузишь для неё фотографию.",
  },
  userAvatar: {
    title: "Соседям будет проще узнать тебя, если ты загрузишь свою настоящую фотографию.",
  },
};

function AvatarEdit(props) {
  const {children, typeAvatar, progress} = props;
  return (
    <View>
      <Paragraph
        color="#333"
        center
        size={15}
        noMargin>
        {types[typeAvatar].title}
      </Paragraph>
      <View style={styles.avatarConfirmContainer}>
        <View
          style={{
            flexDirection: "column",
          }}>
          {children}
        </View>
      </View>
      {progress > 0 ? (
        <LinearProgress progress={progress} />
      ) : null}
      <Paragraph
        color="#8d8d8d"
        center
        size={14}
        noMargin>
        Ты можешь загрузить изображение в формате jpg, gif или png.
      </Paragraph>
    </View>
  );
}

AvatarEdit.propTypes = {
  children: PropTypes.node.isRequired,
  typeAvatar: PropTypes.string.isRequired,
  progress: PropTypes.number,
};

export default React.memo(AvatarEdit);
