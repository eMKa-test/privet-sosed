import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity} from "react-native";
import Loader from "../../../components/loader";
import styles from "../styles";
import Paragraph from "../../../components/text/Paragraph";

function ListFooter({loading, canShowNext, fetchNext}) {
  return (
    <React.Fragment>
      <Loader
        containerStyle={styles.loader}
        active={loading} />
      {canShowNext && (
        <TouchableOpacity onPress={fetchNext}>
          <Paragraph
            size={15}
            medium
            noMargin>
            Показать следующие комментарии
          </Paragraph>
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
}

ListFooter.propTypes = {
  loading: PropTypes.bool,
  canShowNext: PropTypes.bool,
  fetchNext: PropTypes.func,
};

export default React.memo(ListFooter);
