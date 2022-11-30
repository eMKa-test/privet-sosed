import React from "react";
import * as PropTypes from "prop-types";
import {Text, View} from "react-native";
import Paragraph from "../../../components/text/Paragraph";
import styles from "./styles";

function Header(props) {
  const {
    title, repliesTo = "", isDeleted = false,
  } = props;
  return (
    <React.Fragment>
      {(title || repliesTo) ? (
        <View style={styles.root}>
          <Text>
            <Paragraph
              size={14.4}
              medium
              noMargin>
              {isDeleted ? "" : `${title} `}
            </Paragraph>
            <Paragraph
              size={14.4}
              noMargin>
              {repliesTo}
            </Paragraph>
          </Text>
        </View>
      ) : null}
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  repliesTo: PropTypes.string,
  isDeleted: PropTypes.bool,
};

export default React.memo(Header);
