import React from "react";
import * as PropTypes from "prop-types";
import {WebView} from "react-native-webview";
import {View} from "react-native";
import {videoStyles} from "./styles";
import {idProp} from "../../lib/utils";

function Video({data}) {
  if (!data?.url_embed) {
    return null;
  }
  return (
    <View style={videoStyles.videoWrapper}>
      <WebView
        cacheEnabled
        javaScriptEnabled
        source={{uri: data.url_embed}}
        style={videoStyles.video} />
    </View>
  );
}

Video.propTypes = {
  data: PropTypes.shape({
    id: idProp,
    url_embed: PropTypes.string,
  }),
};

export default React.memo(Video);
