import React from "react";
import PropTypes from "prop-types";
import {Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {GRADIENT} from "../../constants/Colors";
import styles from "./styles";
import CloseButton from "../buttons/close";

function ModalHeader(props) {
  const {title, onClose} = props;
  return (
    <LinearGradient
      style={styles.roomModalLinearGradient}
      start={GRADIENT.start}
      end={GRADIENT.end}
      colors={GRADIENT.colors}>
      <React.Fragment>
        {typeof onClose === "function" ? (
          <View style={{paddingLeft: 10}}>
            <CloseButton onPress={onClose} />
          </View>
        ) : null}
        <Text style={styles.modalTitle}>{title}</Text>
      </React.Fragment>
    </LinearGradient>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default React.memo(ModalHeader);
