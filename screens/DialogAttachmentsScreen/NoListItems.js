import React from "react";
import {View, Text} from "react-native";
import styles from "./styles";

function NoListItems() {
  return (
    <View style={styles.noItemsContainer}>
      <Text style={styles.noItemsTitle}>Список пуст</Text>
    </View>
  );
}

export default React.memo(NoListItems);
