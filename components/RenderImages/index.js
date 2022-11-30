import * as React from "react";
import * as PropTypes from "prop-types";
import memoize from "lodash/memoize";
import {View, Image, TouchableOpacity} from "react-native";
import styles from "./styles";
import {imageSource, keyExtractor} from "../../lib/utils";
import VideoThumb from "../VideoThumb";
import LightBox from "../LightBox";

const memo = memoize((cnt) => {
  return cnt % 2 === 0;
});

function RenderImages({images}) {
  const [open, setOpen] = React.useState(null);

  const openLightBox = React.useCallback((idx, type) => {
    setOpen({idx, type});
  }, []);

  const dismiss = React.useCallback(() => {
    setOpen(null);
  }, []);

  if (Array.isArray(images) && images.length > 0) {
    const len = images.length;
    return (
      <View style={styles.imageContainer}>
        {images.map((item, idx) => {
          if (item?.is_video) {
            return (
              <VideoThumb
                key={keyExtractor(item, idx)}
                onPress={() => openLightBox(idx, "video")}
                style={[
                  styles.image,
                  {
                    height: !memo(len) && idx === len - 1 ? 130 : 100,
                    flexBasis: !memo(len) && idx === len - 1 ? "99%" : "49%",
                  },
                ]}
                duration={item?.duration}>
                <Image
                  resizeMode="cover"
                  style={{flex: 1}}
                  source={imageSource(item?.thumbs["370"])} />
              </VideoThumb>
            );
          }
          return (
            <TouchableOpacity
              key={keyExtractor(item, idx)}
              onPress={() => openLightBox(idx, "image")}
              style={[
                styles.image,
                {
                  height: !memo(len) && idx === len - 1 ? 130 : 100,
                  flexBasis: !memo(len) && idx === len - 1 ? "99%" : "49%",
                },
              ]}>
              <Image
                resizeMode="cover"
                style={{flex: 1}}
                source={imageSource(item?.thumbs["370"])} />
            </TouchableOpacity>
          );
        })}
        {open ? (
          <LightBox
            visible={Boolean(open)}
            dismiss={dismiss}
            initial={open?.idx}
            type={open?.type}
            list={images} />
        ) : null}
      </View>
    );
  }
  return null;
}

RenderImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default React.memo(RenderImages);
