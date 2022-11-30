import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import * as Linking from "expo-linking";
import {View, TouchableOpacity, Image} from "react-native";
import isPlainObject from "react-redux/lib/utils/isPlainObject";
import styles from "./styles";
import {idProp, imageSource} from "../../lib/utils";
import {UNKNOWN_ERROR} from "../../constants/Vars";
import Paragraph from "../../components/text/Paragraph";

function LinkThumbs(props) {
  const {item} = props;
  const title = get(item, "title", "");
  const url = get(item, "url", UNKNOWN_ERROR);
  const domain = get(item, "domain", UNKNOWN_ERROR);
  const _thumbs = get(item, "thumbs", "");
  const thumbs = isPlainObject(_thumbs) ? _thumbs : false;

  const redirect = React.useCallback(() => {
    Linking.openURL(url);
  }, []);

  return (
    <TouchableOpacity
      onPress={redirect}
      activeOpacity={0.6}>
      <View style={styles.linkContainer}>
        {thumbs ? (
          <View style={styles.linkThumbContainer}>
            <Image
              style={styles.linkThumb}
              resizeMode="cover"
              source={imageSource(thumbs["80"])} />
          </View>
        ) : <View style={styles.linkThumbStub} />}
        <View style={styles.linkBody}>
          <Paragraph
            style={styles.linkTitle}
            medium
            noMargin>
            {title || ""}
          </Paragraph>
          <Paragraph
            medium
            color="#ababab"
            noMargin>
            {domain || ""}
          </Paragraph>
        </View>
      </View>
    </TouchableOpacity>
  );
}

LinkThumbs.propTypes = {
  item: PropTypes.shape({
    id: idProp,
    domain: PropTypes.string,
  }),
};

export default React.memo(LinkThumbs);
