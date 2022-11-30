import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import isPlainObject from "lodash/isPlainObject";
import {
  View, TouchableOpacity, Image, useWindowDimensions,
} from "react-native";
import * as Linking from "expo-linking";
import styles from "./styles";
import {idProp, imageSource} from "../../lib/utils";
import {UNKNOWN_ERROR} from "../../constants/Vars";
import Paragraph from "../text/Paragraph";
import {SCREEN_WIDTH} from "../../constants/Layout";

function getThumbSize(thumbs) {
  if (isPlainObject(thumbs)) {
    const thumbProperty = {
      style: "renderLinkCol",
    };
    if (thumbs["370"]) {
      thumbProperty.src = thumbs["370"];
      return thumbProperty;
    }
    if (thumbs["740"]) {
      thumbProperty.src = thumbs["740"];
      return thumbProperty;
    }
    if (thumbs["80"]) {
      thumbProperty.src = thumbs["80"];
      thumbProperty.style = "renderLinkRow";
      return thumbProperty;
    }
  }
  return null;
}

function RenderLink(props) {
  const {linkInfo, msgScreen} = props;
  if (!linkInfo) {
    return null;
  }

  const {delta = 170, withPreview = true} = props;

  const domain = get(linkInfo, "domain", UNKNOWN_ERROR);
  const thumbs = get(linkInfo, "thumbs", []);
  const thumb = getThumbSize(thumbs);
  const title = get(linkInfo, "title", UNKNOWN_ERROR);
  const href = get(linkInfo, "url", UNKNOWN_ERROR);
  const {width} = useWindowDimensions();

  const redirect = React.useCallback(() => {
    Linking.canOpenURL(href).then(() => {
      return Linking.openURL(href);
    }).catch(console.sendError);
  }, [href]);

  return (
    <TouchableOpacity
      style={[{flex: 1}, thumb?.style && styles[thumb.style],
        thumb?.style === "renderLinkRow" && msgScreen && {width: width - 150}]}
      onPress={redirect}>
      <View
        style={[styles.linkContainer, !withPreview && styles.comments, thumb?.style && styles[thumb.style]]}>
        {withPreview && thumb ? (
          <View
            style={[styles.linkThumbContainer, thumb?.style === "renderLinkCol"
              ? {
                height: (SCREEN_WIDTH - delta) * 0.563,
              }
              : {
                flex: 0.4,
              },
            ]}>
            <Image
              resizeMode="cover"
              style={styles.linkThumb}
              source={imageSource(thumb.src)} />
          </View>
        ) : null}
        <View style={[thumb?.style === "renderLinkRow" && {flex: 0.6}]}>
          <View style={styles.linkInfo}>
            <Paragraph
              noMargin
              medium>
              {title || ""}
            </Paragraph>
            <Paragraph
              noMargin
              style={styles.linkDomain}
              color="#ccc">
              {domain || ""}
            </Paragraph>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

RenderLink.propTypes = {
  linkInfo: PropTypes.shape({
    id: idProp,
  }),
  delta: idProp,
  withPreview: PropTypes.bool,
  msgScreen: PropTypes.bool,
};

export default React.memo(RenderLink);
