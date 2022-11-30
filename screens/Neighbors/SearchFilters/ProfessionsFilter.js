import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import MultipleSelectField from "../../../components/inputs/SeparatedMultipleSelect/MultipleSelectField";

function ProfessionsFilter(props) {
  const {
    value, onChange, professions, openModal, label, placeholder,
  } = props;

  return (value && professions) ? (
    <MultipleSelectField
      label={label}
      initialSelected={value}
      options={professions}
      disabled={!professions}
      openModal={openModal}
      afterSelect={onChange}
      placeholder={placeholder} />
  ) : null;
}

ProfessionsFilter.propTypes = {
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onChange: PropTypes.func,
  professions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  openModal: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

const mapStateToProps = (state) => ({
  professions: state.vocs?.professions,
});

export default connect(mapStateToProps)(React.memo(ProfessionsFilter));
