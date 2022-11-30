import React from "react";
import * as PropTypes from "prop-types";
import Paragraph from "../../../components/text/Paragraph";
import PhoneMask from "../../../components/inputs/PhoneMask";

function Phone(props) {
  const {value, onChange, hasError} = props;
  return (
    <React.Fragment>
      <Paragraph size={14}>Телефон</Paragraph>
      <PhoneMask
        value={value}
        onChange={onChange}
        hasError={hasError} />
    </React.Fragment>
  );
}

Phone.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
};

export default Phone;
