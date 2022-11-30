import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import SwitchToggle from "@dooboo-ui/native-switch-toggle";
import Paragraph from "../../../components/text/Paragraph";
import {switchStyles} from "./styles";
import {ACCENT_COLOR, WHITE} from "../../../constants/Colors";

function SwitchOption(props) {
  const {label, initialState, onChange} = props;
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    if (typeof onChange === "function") {
      onChange(state);
    }
  }, [state]);

  React.useEffect(() => {
    setState(initialState);
  }, [initialState]);

  const toggle = React.useCallback(() => {
    setState((checked) => !checked);
  }, []);

  return (
    <View style={switchStyles.root}>
      <Paragraph
        size={14}
        noMargin>
        {label}
      </Paragraph>
      <SwitchToggle
        backgroundColorOn={ACCENT_COLOR}
        backgroundColorOff="rgba(155,178,195,.4)"
        circleColorOn={WHITE}
        circleColorOff={WHITE}
        containerStyle={switchStyles.switchContainer}
        circleStyle={switchStyles.circle}
        switchOn={state}
        duration={200}
        onPress={toggle} />
    </View>
  );
}

SwitchOption.propTypes = {
  label: PropTypes.string,
  initialState: PropTypes.bool,
  onChange: PropTypes.func,
};

export default React.memo(SwitchOption);
