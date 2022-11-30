import React from "react";
import * as PropTypes from "prop-types";
import Paragraph from "../../../components/text/Paragraph";
import TextInput from "../../../components/auth/Input";

function Name(props) {
  const {value, onChange, hasError} = props;
  return (
    <React.Fragment>
      <Paragraph size={14}>Ф.И.О.</Paragraph>
      <TextInput
        value={value}
        onChangeText={onChange}
        error={hasError} />
    </React.Fragment>
  );
}

Name.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
};

export default React.memo(Name);
