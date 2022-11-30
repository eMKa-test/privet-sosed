import React, {useCallback, useReducer} from "react";
import * as PropTypes from "prop-types";
import {Image, View, TouchableOpacity} from "react-native";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import {idProp, imageSource, keyExtractor} from "../../../lib/utils";
import styles, {imageStyles} from "./styles";
import LightBox, {TYPES} from "../../LightBox";
import {SCREEN_WIDTH} from "../../../constants/Layout";
import VideoThumb from "../../VideoThumb";

const thumbSize = SCREEN_WIDTH > 600 ? "740" : "370";

const OPEN_LIGHTBOX = "OPEN_LIGHTBOX";
const CLOSE_LIGHTBOX = "CLOSE_LIGHTBOX";

const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_LIGHTBOX: {
      const {item} = action;
      if (isEqual(state.lastPressed, item)) {
        return {
          ...state,
          lightbox: true,
        };
      }
      let initial = 0;
      const lightboxState = {};
      if (item?.is_video) {
        lightboxState.type = TYPES.VIDEO;
        lightboxState.lightboxList = state?.media?.reduce((acc, el) => {
          if (el?.is_video) {
            if (isEqual(el, item)) {
              initial = acc.length;
            }
            acc.push(el);
          }
          return acc;
        }, []);
      } else {
        lightboxState.type = TYPES.IMAGE;
        lightboxState.lightboxList = state?.media?.reduce((acc, el) => {
          if (!el?.is_video) {
            if (isEqual(el, item)) {
              initial = acc.length;
            }
            acc.push(el);
          }
          return acc;
        }, []);
      }
      return {
        ...state,
        ...lightboxState,
        lastPressed: item,
        initial,
        lightbox: true,
      };
    }
    case CLOSE_LIGHTBOX:
      return {
        ...state,
        lightbox: false,
      };
    default:
      return state;
  }
};

const initialState = (media = []) => {
  return {
    media,
    lastPressed: {},
    initial: 0,
    lightbox: false,
    lightboxList: [],
    type: TYPES.IMAGE,
  };
};

function Gallery({media}) {
  if (isEmpty(media)) {
    return null;
  }

  const [state, dispatch] = useReducer(reducer, initialState(media));

  const len = media?.length < 11 ? media.length : 10;

  const closeLightbox = useCallback(() => {
    dispatch({type: CLOSE_LIGHTBOX});
  }, []);

  return (
    <View style={[styles.root, styles[len]]}>
      {media.map((item, idx) => {
        if (idx > 9) {
          return null;
        }
        if (item?.is_video) {
          return (
            <VideoThumb
              duration={item?.duration}
              style={[styles.image, imageStyles[len][idx]]}
              onPress={() => dispatch({
                type: OPEN_LIGHTBOX,
                item,
              })}
              key={keyExtractor(item, idx)}>
              <Image
                style={{
                  flex: 1,
                  resizeMode: "cover",
                }}
                source={imageSource(item?.thumbs[thumbSize])} />
            </VideoThumb>
          );
        }
        return (
          <TouchableOpacity
            key={keyExtractor(item, idx)}
            style={[styles.image, imageStyles[len][idx]]}
            onPress={() => dispatch({
              type: OPEN_LIGHTBOX,
              item,
            })}>
            <Image
              style={{
                flex: 1,
                resizeMode: "cover",
              }}
              source={imageSource(item?.thumbs[thumbSize])} />
          </TouchableOpacity>
        );
      })}
      <LightBox
        visible={state.lightbox}
        dismiss={closeLightbox}
        initial={state.initial}
        type={state.type}
        list={state.lightboxList} />
    </View>
  );
}

Gallery.propTypes = {
  media: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
    is_video: PropTypes.bool,
  })),
};

export default React.memo(Gallery, () => true);
