import React from "react";
import * as PropTypes from "prop-types";
import {Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
  noFilterResults: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 25,
    paddingHorizontal: 40,
    backgroundColor: "#fff",
  },
});

const text = {
  rooms: "По данному запросу беседы не найдены",
  neighbours: "По данному запросу соседи не найдены",
};

function NoFilterResults({filterType}) {
  return (
    <Text style={styles.noFilterResults}>
      {text[filterType]}
    </Text>
  );
}

NoFilterResults.propTypes = {
  filterType: PropTypes.string.isRequired,
};

export default React.memo(NoFilterResults);
