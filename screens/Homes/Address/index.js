import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import Dropdown from "../../../components/dropdown";
import AddressText from "./AddressText";
import OptionsHeader from "./OptionsHeader";
import Icon from "./HouseConfirmIcon";
import {HOUSE_FEED} from "../../../constants/Vars";
import {navigate} from "../../../navigation/root";

function Address(props) {
  const {
    disabled, setAction, data, dropdownOptions,
  } = props;

  const {status} = data;
  if (!status) {
    return null;
  }

  const onSelect = React.useCallback(({action}) => {
    if (typeof setAction === "function") {
      setAction({type: action, item: data});
    }
  }, [setAction, data]);

  const onPress = React.useCallback(() => {
    navigate(HOUSE_FEED, {houseId: data?.house?.id, houseLabel: data?.house?.name});
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.dropdownToggler}>
        <Dropdown
          onSelect={onSelect}
          optionsHeader={<OptionsHeader data={data} />}
          options={dropdownOptions} />
      </View>
      <TouchableOpacity
        disabled={disabled || (status !== 3)}
        onPress={onPress}>
        <View style={styles.addressRow}>
          <View style={styles.addressIcon}>
            <Icon status={status} />
          </View>
          <View style={styles.address}>
            <AddressText data={data} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

Address.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
  }).isRequired,
  setAction: PropTypes.func,
  disabled: PropTypes.bool,
  dropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
};

export default React.memo(Address);
