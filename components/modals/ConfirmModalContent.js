import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";
import Paragraph from "../text/Paragraph";
import DefaultInfoBlock from "../infoBlocks/default";
import {UNKNOWN_ERROR} from "../../constants/Vars";

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  infoBlock: {
    marginTop: 20,
  },
});

const header = (headerText, headerActionText = UNKNOWN_ERROR) => (
  <React.Fragment>
    <Paragraph
      center
      noMargin
      size={18}>
      {headerActionText}
    </Paragraph>
    {headerText ? (
      <Paragraph
        center
        noMargin
        bold
        size={18}>
        {`${headerText}?` /* FIXME: ошибкой было добавить вопрос сюда, надо будет исправить */}
      </Paragraph>
    ) : null}
  </React.Fragment>
);

function ConfirmModalContent(props) {
  const {headerText, info, headerActionText} = props;
  return (
    <View style={styles.root}>
      {header(headerText, headerActionText)}
      {info ? (
        <View style={styles.infoBlock}>
          <DefaultInfoBlock text={info} />
        </View>
      ) : null}
    </View>
  );
}

ConfirmModalContent.propTypes = {
  headerText: PropTypes.string,
  info: PropTypes.string,
  headerActionText: PropTypes.string,
};

export default React.memo(ConfirmModalContent, () => true);
