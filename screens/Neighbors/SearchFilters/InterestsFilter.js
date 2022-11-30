import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import MultipleSelectField from "../../../components/inputs/SeparatedMultipleSelect/MultipleSelectField";

function InterestsFilter(props) {
  const {
    value, onChange, interests, openModal, label, placeholder,
  } = props;

  return (value && interests) ? (
    <MultipleSelectField
      label={label}
      initialSelected={value}
      options={interests}
      disabled={!interests}
      openModal={openModal}
      afterSelect={onChange}
      placeholder={placeholder} />
  ) : null;
}

InterestsFilter.propTypes = {
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onChange: PropTypes.func,
  interests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  openModal: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

const mapStateToProps = (state) => ({
  interests: state.vocs?.interests,
});

export default connect(mapStateToProps)(React.memo(InterestsFilter));
