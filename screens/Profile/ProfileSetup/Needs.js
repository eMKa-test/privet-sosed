import React from "react";
import * as PropTypes from "prop-types";
import Paragraph from "../../../components/text/Paragraph";
import Input from "../../../components/auth/Input";

function Needs(props) {
  const {value, onChange, hasError} = props;
  return (
    <React.Fragment>
      <Paragraph size={14}>Мои потребности</Paragraph>
      <Input
        placeholder="В чем нуждаюсь, чему хотел бы научиться"
        value={value}
        onChangeText={onChange}
        error={hasError} />
    </React.Fragment>
  );
}

Needs.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
};

export default React.memo(Needs);
