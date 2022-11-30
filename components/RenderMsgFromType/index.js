import {Linking, Text, View} from "react-native";
import React, {useCallback} from "react";
import * as PropTypes from "prop-types";
import styles from "./styles";
import {LINK, parseHtml, TEXT} from "../../lib/parseHtml";

function RenderMsg(props) {
  const {msg, tailMode} = props;

  const renderHtml = useCallback((item, idx) => {
    const key = String(idx);
    switch (item?.component) {
      case LINK: {
        return item?.text ? (
          <Text
            numberOfLines={tailMode ? 1 : 0}
            lineBreakMode={tailMode ? "tail" : undefined}
            onPress={() => {
              Linking.canOpenURL(item.href).then(() => {
                return Linking.openURL(item.href);
              }).catch(console.sendError);
            }}
            style={[tailMode ? styles.msgTextAnswer : styles.msgLink]}
            key={key}>
            {item.text}
          </Text>
        ) : null;
      }
      case TEXT:
        return item?.text ? (
          <Text
            numberOfLines={tailMode ? 1 : 0}
            lineBreakMode={tailMode ? "tail" : undefined}
            style={[tailMode ? styles.msgTextAnswer : styles.msgText]}
            key={key}>
            {item.text}
          </Text>
        ) : null;
      default:
        return null;
    }
  }, [tailMode]);

  const renderLine = useCallback((line) => {
    return parseHtml(line).map(renderHtml);
  }, []);

  if (!msg) {
    return null;
  }

  const textArray = msg.split("\n");

  return (
    <View style={styles.renderMsgRoot}>
      {textArray.map(renderLine)}
    </View>
  );
}

RenderMsg.propTypes = {
  msg: PropTypes.string,
  tailMode: PropTypes.bool,
};

export default React.memo(RenderMsg);
