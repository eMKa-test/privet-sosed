import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {useFocusEffect} from "@react-navigation/native";
import styles from "../styles";
import DropdownActionSheet from "../../../components/actionSheets/Dropdown";
import {getMyAccount} from "../../../store/actions/accountActions";
import Settings from "./GeneralSettings";
import updatePrivacy from "../../../lib/api/account/update-privacy";
import SuccessInfoBlock from "../../../components/infoBlocks/success";
import formPrivacy from "../../../lib/api/account/form-privacy";

function Privacy(props) {
  const {account, fetchAccount} = props;
  const [open, setOpen] = useState(null);
  const [successMsg, setSuccessMsg] = useState(undefined);
  const [formOptions, setOptions] = useState(null);

  useEffect(() => {
    formPrivacy().then((res) => {
      setOptions(res);
    }).catch(console.error);
  }, [account?.privacy]);

  const onFocus = React.useCallback(() => {
    formPrivacy().then((res) => {
      setOptions(res);
    }).catch(console.error);
    return () => {
      if (typeof fetchAccount === "function") {
        fetchAccount();
      }
    };
  }, []);

  useFocusEffect(onFocus);

  const dismiss = useCallback(() => setOpen(null), []);

  const onSelect = useCallback((option, name, currentValue) => {
    const result = option.map((opt, i) => ({
      ...opt, label: opt.title, id: i, isSelected: currentValue === opt.value, key: {[name]: opt.value},
    }));
    setOpen(result);
  }, []);

  const onDropdownSelect = useCallback(({key}) => {
    const body = {...key};
    updatePrivacy(body, (msg) => {
      setSuccessMsg(msg);
      fetchAccount();
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.block}>
        {successMsg ? (
          <View style={styles.infoBlock}>
            <SuccessInfoBlock text={successMsg} />
          </View>
        ) : null}
        <Settings
          options={formOptions}
          onSelect={onSelect}
          dismiss={dismiss} />
      </View>
      {open ? (
        <DropdownActionSheet
          open={Boolean(open)}
          dismiss={dismiss}
          options={open}
          onSelect={onDropdownSelect} />
      ) : null}
    </ScrollView>
  );
}

Privacy.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  fetchAccount: PropTypes.func,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchAccount: getMyAccount,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Privacy));
