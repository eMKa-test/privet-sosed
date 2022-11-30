import React from "react";
import {View} from "react-native";
import Paragraph from "../../../components/text/Paragraph";
import styles from "./styles";
import {TEXT_COLOR} from "../../../constants/Colors";

const EmptySearchResult = () => (
  <View style={styles.background}>
    <Paragraph
      color={TEXT_COLOR}
      size={14.5}
      noMargin>
      По данному запросу соседей не найдено
    </Paragraph>
  </View>
);

export default React.memo(EmptySearchResult);
