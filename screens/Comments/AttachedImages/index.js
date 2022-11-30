import React, {useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import {
  Image, View, TouchableOpacity,
} from "react-native";
import {idProp, imageSource, keyExtractor} from "../../../lib/utils";
import styles from "./styles";
import LightBox from "../../../components/LightBox";
import VideoThumb from "../../../components/VideoThumb";

const thumbSize = "80";

function AttachedImages(props) {
  const {images} = props;
  const [lightbox, toggleLightbox] = useState(null);

  if (!Array.isArray(images) || images?.length < 1) {
    return null;
  }

  const closeLightbox = useCallback(() => {
    toggleLightbox(null);
  }, []);

  const openLightbox = useCallback((idx, type) => {
    toggleLightbox({idx, type});
  }, []);

  return (
    <View style={styles.root}>
      {images.map((image, i) => {
        if (image?.is_video) {
          return (
            <VideoThumb
              square
              style={styles.imageContainer}
              onPress={() => openLightbox(i, "video")}
              key={keyExtractor(image, i)}
              duration={image?.duration}>
              <Image
                style={styles.image}
                source={imageSource(image?.thumbs[thumbSize])} />
            </VideoThumb>
          );
        }
        return (
          <TouchableOpacity
            key={keyExtractor(image, i)}
            onPress={() => openLightbox(i, "image")}>
            <Image
              style={styles.imageContainer}
              source={imageSource(image?.thumbs[thumbSize])} />
          </TouchableOpacity>
        );
      })}
      {lightbox ? (
        <LightBox
          visible={Boolean(lightbox)}
          dismiss={closeLightbox}
          list={images}
          initial={lightbox?.idx}
          type={lightbox?.type} />
      ) : null}
    </View>
  );
}

AttachedImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
  })),
};

export default React.memo(AttachedImages);
