import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import MultipleSelect from "../../../components/inputs/MultipleSelect";

function Interests(props) {
  const {value, onChange, interests} = props;
  return (
    <React.Fragment>
      {value && interests ? (
        <MultipleSelect
          label="Интересы"
          initialSelected={value}
          options={interests}
          disabled={false}
          afterSelect={onChange}
          placeholder="Укажите ваши интересы" />
      ) : null}
    </React.Fragment>
  );
}

Interests.propTypes = {
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onChange: PropTypes.func,
  interests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
};

const mapStateToProps = (state) => ({
  interests: state.vocs?.interests,
});

export default connect(mapStateToProps)(React.memo(Interests));
