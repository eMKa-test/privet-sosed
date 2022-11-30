import React from "react";
import * as PropTypes from "prop-types";
import Paragraph from "../../../components/text/Paragraph";
import Input from "../../../components/auth/Input";

function Proposals(props) {
  const {value, onChange, hasError} = props;
  return (
    <React.Fragment>
      <Paragraph size={14}>Мои предложения</Paragraph>
      <Input
        placeholder="Чем могу помочь, чему могу научить"
        value={value}
        onChangeText={onChange}
        error={hasError} />
    </React.Fragment>
  );
}

Proposals.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
};

export default React.memo(Proposals);
