import React from "react";
import get from "lodash/get";
import memoize from "lodash/memoize";
import * as PropTypes from "prop-types";
import {DIMMED_COLOR, TEXT_COLOR} from "../../../constants/Colors";
import Span from "../../../components/text/Span";
import styles from "./styles";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const getColor = memoize((status) => (status === 3 ? "#3977ea" : TEXT_COLOR));

function OptionsHeader({data}) {
  return (
    <React.Fragment>
      <Span
        style={[styles.dropdownOptionsHeaderText, {
          color: getColor(data?.status),
        }]}>
        {get(data, "status_text", UNKNOWN_ERROR)}
      </Span>
      <Span>&nbsp;</Span>
      <Span
        style={[styles.dropdownOptionsHeaderText, {
          color: DIMMED_COLOR,
        }]}>
        {get(data, "created_time", UNKNOWN_ERROR)}
      </Span>
    </React.Fragment>
  );
}

OptionsHeader.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(OptionsHeader);
