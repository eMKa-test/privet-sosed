import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";

import styles from "./styles";
import Logo from "./Logo";
import Guys from "./Guys";
import Paragraph from "../text/Paragraph";
import Heading from "../text/Heading";

function Welcome({children = null}) {
  return (
    <View style={styles.root}>
      <View style={styles.topBlock}>
        <Logo />
        <Guys />
      </View>
      <View style={styles.bottomBlock}>
        <View style={styles.bottomText}>
          <Heading
            h4
            center>
            Общайся с новыми соседями всей страны.
          </Heading>
          <Paragraph center>
            Всегда стоит знать людей, живущих рядом.&nbsp;
            Если вы недавно поселились в доме, теперь познакомиться стало намного проще.
          </Paragraph>
        </View>
        <View style={styles.children}>
          {children}
        </View>
      </View>
    </View>
  );
}

Welcome.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element]),
};

export default React.memo(Welcome);
