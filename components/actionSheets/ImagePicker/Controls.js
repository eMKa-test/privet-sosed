import React from "react";
import * as PropTypes from "prop-types";
import {Animated, Easing, View} from "react-native";
import {Divider} from "react-native-elements";
import TransparentButton from "../../buttons/transparent";
import {TEXT_COLOR} from "../../../constants/Colors";
import {actionSheetStyles, imagePickerStyles as styles} from "../styles";
import CameraIcon from "../../icons/camera";
import FileIcon from "../../icons/file";
import ImageIcon from "../../icons/image";
import VideoIcon from "../../icons/videoIcon";


// eslint-disable-next-line react/prop-types
const Button = React.memo(({onPress, title, icon}) => (
  <TransparentButton
    onPress={onPress}
    buttonStyle={styles.button}
    color={TEXT_COLOR}
    icon={icon}
    iconRight
    title={title} />
));

function Controls(props) {
  const {
    readyToSend, onSendPress, onPhotoPress, onFilesPress, onCameraPress, onLinkPress, kind,
  } = props;
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: readyToSend?.length > 0 ? 1 : 0,
      duration: 300,
      delay: 10,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [readyToSend?.length]);

  const select = (
    <React.Fragment>
      <Button
        onPress={onPhotoPress}
        icon={<ImageIcon />}
        title="Все фото с устройства" />
      <Divider style={actionSheetStyles.divider} />
      <Button
        onPress={onCameraPress}
        icon={<CameraIcon />}
        title="Сделать фото" />
      <Divider style={actionSheetStyles.divider} />
      {kind !== "image" ? (
        <React.Fragment>
          <Button
            onPress={onFilesPress}
            icon={<FileIcon />}
            title="Файлы" />
          <Divider style={actionSheetStyles.divider} />
          <Button
            onPress={onLinkPress}
            icon={<VideoIcon />}
            title="Видео" />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );

  const send = (
    <React.Fragment>
      <TransparentButton
        buttonStyle={styles.sendButton}
        color={TEXT_COLOR}
        onPress={() => onSendPress(readyToSend)}
        title={`Прикрепить ${readyToSend?.length} фото`} />
    </React.Fragment>
  );

  return (
    <View style={actionSheetStyles.imagePickerControls}>
      {readyToSend?.length > 0 ? (
        <Animated.View
          style={{
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 1],
            }),
          }}>
          {send}
        </Animated.View>
      ) : (
        <Animated.View
          style={{
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.1],
            }),
          }}>
          {select}
        </Animated.View>
      )}
    </View>
  );
}

Controls.propTypes = {
  readyToSend: PropTypes.arrayOf(PropTypes.shape({})),
  onSendPress: PropTypes.func,
  onPhotoPress: PropTypes.func,
  onFilesPress: PropTypes.func,
  onCameraPress: PropTypes.func,
  onLinkPress: PropTypes.func,
  kind: PropTypes.string,
};

export default React.memo(Controls);
