import React from "react";
import * as PropTypes from "prop-types";
import Input from "../../../components/auth/Input";
import Paragraph from "../../../components/text/Paragraph";

function Title(props) {
  const {value, onChange, hasError} = props;
  return (
    <React.Fragment>
      <Paragraph size={14}>Отображаемое имя</Paragraph>
      <Input
        value={value}
        onChangeText={onChange}
        error={hasError} />
    </React.Fragment>
  );
}

Title.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  hasError: PropTypes.string,
};

export default React.memo(Title);
