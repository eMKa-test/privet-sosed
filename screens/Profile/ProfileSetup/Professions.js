import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import MultipleSelect from "../../../components/inputs/MultipleSelect";

function Professions(props) {
  const {value, onChange, professions} = props;

  return (
    <React.Fragment>
      {value && professions ? (
        <MultipleSelect
          label="Профессии"
          initialSelected={value}
          options={professions}
          disabled={false}
          afterSelect={onChange}
          placeholder="Укажите вашу профессию" />
      ) : null}
    </React.Fragment>
  );
}

Professions.propTypes = {
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onChange: PropTypes.func,
  professions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
};

const mapStateToProps = (state) => ({
  professions: state.vocs?.professions,
});

export default connect(mapStateToProps)(React.memo(Professions));
