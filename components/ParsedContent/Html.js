import React from "react";
import * as PropTypes from "prop-types";
import {Text, View} from "react-native";
import * as Linking from "expo-linking";
import {
  HASHTAG, LINK, TEXT, parseHtml,
} from "../../lib/parseHtml";
import styles from "./styles";
import Hashtag from "../text/Hashtag";

function Html({html}) {
  if (html && typeof html === "string") {
    return html.split("\n").map((line, idx) => (
      <View
        key={String(idx)}
        style={styles.line}>
        {parseHtml(line).map((item, ndx) => {
          const key = String(ndx);
          switch (item?.component) {
            case LINK: {
              return item?.text ? (
                <Text
                  style={styles.linkWithHtml}
                  onPress={() => {
                    if (item?.href) {
                      Linking.canOpenURL(item.href).then(() => {
                        return Linking.openURL(item.href);
                      }).catch(console.sendError);
                    }
                  }}
                  key={key}>
                  {item.text}
                </Text>
              ) : null;
            }
            case TEXT: {
              return item?.text ? (
                <Text
                  style={styles.text}
                  key={key}>
                  {item.text}
                </Text>
              ) : null;
            }
            case HASHTAG:
              return item?.href ? (
                <Hashtag
                  key={key}
                  href={item.href} />
              ) : null;
            default:
              return null;
          }
        })}
      </View>
    ));
  }
  return null;
}

Html.propTypes = {
  html: PropTypes.string,
};

export default React.memo(Html);
