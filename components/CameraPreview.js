/* eslint-disable max-len */
import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Camera} from "expo-camera";
import Svg, {Path} from "react-native-svg";

const disabledIcon = {
  d: `
    M0,15c0,8.3,6.7,15,15,15c8.3,0,15-6.7,15-15S23.3,0,15,0C6.7,0,0,6.7,0,15z M15,4.1C21,4.1,25.9,9,25.9,15
    c0,2.3-0.7,4.4-1.9,6.1L8.9,6C10.6,4.8,12.7,4.1,15,4.1z M21.1,24c-1.7,1.2-3.8,1.9-6.1,1.9C9,25.9,4.1,21,4.1,15
    c0-2.3,0.7-4.4,1.9-6.1L21.1,24z`,
  w: 30,
  h: 30,
  fill: "#333",
};

const styles = StyleSheet.create({
  disabled: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});

function CameraPreview(props) {
  const {disabled, onPress} = props;
  const [hasPermission, setHasPermission] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null || disabled) {
    return <View style={styles.preview} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.disabled}>
        <Svg
          height={disabledIcon.h}
          width={disabledIcon.w}
          viewBox={`0 0 ${disabledIcon.w} ${disabledIcon.h}`}>
          <Path
            fill={disabledIcon.fill}
            d={disabledIcon.d} />
        </Svg>
      </View>
    );
  }

  return (
    <Camera
      style={styles.preview}
      type={Camera.Constants.Type.back}>
      <TouchableOpacity
        style={styles.inner}
        onPress={onPress}>
        <View style={styles.inner} />
      </TouchableOpacity>
    </Camera>
  );
}

CameraPreview.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default React.memo(CameraPreview);
