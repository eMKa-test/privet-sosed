import React from "react";
import * as PropTypes from "prop-types";
import {Text} from "react-native";
import styles from "./styles";
import {navigate} from "../../navigation/root";
import {SEARCH} from "../../constants/Vars";
import {store} from "../../store";
import {setSearchHashtag} from "../../store/actions/commonActions";

function Hashtag({href}) {
  return (
    <Text
      style={styles.link}
      onPress={() => {
        if (href) {
          store.dispatch(setSearchHashtag(href));
          navigate(SEARCH);
        }
      }}>
      {href}
    </Text>
  );
}

Hashtag.propTypes = {
  href: PropTypes.string,
};

export default Hashtag;
