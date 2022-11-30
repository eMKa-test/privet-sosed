import React from "react";
import * as PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Anchor from "./Anchor";
import Options from "./Options";

function HeaderMenu(props) {
  const {options, active, onSelect} = props;
  const [visible, setVisible] = React.useState(false);
  if (isEmpty(options)) {
    return (
      <Anchor title={active.label} />
    );
  }
  return (
    <React.Fragment>
      <Anchor
        select={options?.length > 1}
        title={active?.label}
        setVisible={setVisible} />
      <Options
        active={active}
        onSelect={onSelect}
        visible={visible}
        setVisible={setVisible}
        options={options} />
    </React.Fragment>
  );
}

const option = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
});

HeaderMenu.propTypes = {
  options: PropTypes.arrayOf(option),
  active: option,
  onSelect: PropTypes.func,
};

export default React.memo(HeaderMenu);
