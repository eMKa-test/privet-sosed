import React from "react";
import {View} from "react-native";
import Paragraph from "../../../components/text/Paragraph";
import styles from "./styles";
import {TEXT_COLOR} from "../../../constants/Colors";

const NoResult = () => (
  <View style={styles.root}>
    <Paragraph
      color={TEXT_COLOR}
      size={14.5}
      noMargin>
      Нет ни одной новости
    </Paragraph>
  </View>
);

export default React.memo(NoResult);
