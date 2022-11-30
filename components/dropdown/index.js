import React from "react";
import * as PropTypes from "prop-types";
import Anchor from "./Anchor";
import DropdownActionSheet from "../actionSheets/Dropdown";

function Dropdown(props) {
  const {
    options, onSelect, optionsHeader, disabled,
  } = props;
  const [visible, setVisible] = React.useState(false);

  const onToggle = (state) => React.useCallback(() => {
    setVisible(state);
  }, [setVisible]);

  return (
    <React.Fragment>
      <Anchor
        disabled={disabled}
        onPress={onToggle(true)} />
      <DropdownActionSheet
        open={visible}
        dismiss={onToggle(false)}
        optionsHeader={optionsHeader}
        options={options}
        onSelect={onSelect} />
    </React.Fragment>
  );
}

const option = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
});

Dropdown.propTypes = {
  options: PropTypes.arrayOf(option),
  onSelect: PropTypes.func,
  optionsHeader: PropTypes.node,
  disabled: PropTypes.bool,
};

export default React.memo(Dropdown);
