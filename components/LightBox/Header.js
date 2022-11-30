import React from "react";
import * as PropTypes from "prop-types";
import {View, TouchableOpacity, Platform} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {headerStyles} from "./styles";
import Counter from "./Counter";
import CloseIcon from "../icons/close";

function LightBoxHeader({page, length, dismiss}) {
  const inset = useSafeAreaInsets();
  return (
    <View style={[headerStyles.root, {marginTop: Platform.OS === "ios" ? inset.top : 0}]}>
      <Counter
        page={page}
        length={length} />
      <View style={headerStyles.panel}>
        <TouchableOpacity
          style={headerStyles.panelButton}
          onPress={dismiss}>
          <CloseIcon
            color="#ccc"
            size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

LightBoxHeader.propTypes = {
  page: PropTypes.number,
  length: PropTypes.number,
  dismiss: PropTypes.func,
};

export default React.memo(LightBoxHeader);
