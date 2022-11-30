import React from "react";
import PropTypes from "prop-types";
import {Platform, Text, View} from "react-native";
import Loader from "../../components/loader";
import styles from "./styles";

ListHeader.propTypes = {
  refreshing: PropTypes.bool,
};

function ListHeader({refreshing}) {
  return (
    <React.Fragment>
      {Platform.OS === "ios" && (
        <Loader active={refreshing} />
      )}
    </React.Fragment>
  );
}

export default React.memo(ListHeader);
