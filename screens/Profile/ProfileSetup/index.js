import React from "react";
import * as PropTypes from "prop-types";
import {ScrollView, View} from "react-native";
import {connect} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import {Divider} from "react-native-elements";
import {bindActionCreators} from "redux";
import styles from "../styles";
import profileSetupStyles from "./styles";
import Paragraph from "../../../components/text/Paragraph";
import Avatar from "./Avatar";
import Title from "./Title";
import {
  INIT, NAME, PHONE, TITLE, SEX, BDAY, BMONTH, BYEAR, B_DATE, CAN_TXT, NEED_TXT, PROFESSION_IDS, INTEREST_IDS,
  initialState, reducer,
} from "./helpers";
import Name from "./Name";
import Phone from "./Phone";
import Sex from "./Sex";
import Birthday from "./Birthday";
import Professions from "./Professions";
import Interests from "./Interests";
import Proposals from "./Proposals";
import Needs from "./Needs";
import {getVocs} from "../../../store/actions/vocsActions";
import DefaultButton from "../../../components/buttons/default";
import updateAccount from "../../../lib/api/account/update";
import SuccessInfoBlock from "../../../components/infoBlocks/success";
import {getMyAccount} from "../../../store/actions/accountActions";
import Loader from "../../../components/loader";

function ProfileSetup(props) {
  const {
    account, fetchVocs, fetchAccount, loading: sagaLoading,
  } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState(), initialState);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [successMsg, setSuccessMsg] = React.useState(undefined);

  const scrollRef = React.useRef();

  const onFocus = React.useCallback(() => {
    if (typeof fetchVocs === "function") {
      fetchVocs();
    }
    dispatch({type: INIT, payload: account});
    return () => {
      // reset reducer state
      dispatch({type: INIT, payload: {}});
    };
  }, [dispatch, account, fetchVocs]);

  useFocusEffect(onFocus);

  const onChange = (key) => React.useCallback((value) => {
    setErrors({});
    setSuccessMsg(undefined);
    dispatch({type: key, value});
  }, [dispatch, key]);

  const onSubmit = React.useCallback(() => {
    setLoading(true);
    updateAccount(state, setErrors, (msg) => {
      if (msg) {
        setSuccessMsg(msg);
        if (scrollRef.current) {
          setTimeout(() => {
            scrollRef.current.scrollTo({y: 0, animated: true});
          }, 150);
        }
      }
    }, () => {
      if (typeof fetchAccount === "function") {
        fetchAccount();
      }
      setLoading(false);
    });
  }, [state]);

  return (
    <ScrollView
      ref={scrollRef}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.scrollView}>
      <Loader
        active={loading || sagaLoading}
        containerStyle={styles.loader} />
      <View style={styles.block}>
        <View style={styles.blockTitle}>
          <Paragraph
            noMargin
            size={16}>
            Профиль
          </Paragraph>
        </View>
        <View style={styles.blockContent}>
          {successMsg ? (
            <View style={styles.infoBlock}>
              <SuccessInfoBlock text={successMsg} />
            </View>
          ) : null}
          <Avatar />
          <Title
            hasError={errors[TITLE]}
            onChange={onChange(TITLE)}
            value={state[TITLE]} />
          <Name
            hasError={errors[NAME]}
            onChange={onChange(NAME)}
            value={state[NAME]} />
          <Phone
            hasError={errors[PHONE]}
            onChange={onChange(PHONE)}
            value={state[PHONE]} />
          <Sex
            value={state[SEX]}
            onChange={onChange(SEX)} />
          <Birthday
            value={new Date(state[BYEAR], state[BMONTH] - 1, state[BDAY])}
            onChange={onChange(B_DATE)} />
          <Divider style={profileSetupStyles.divider} />
          <Professions
            value={state[PROFESSION_IDS]}
            onChange={onChange(PROFESSION_IDS)} />
          <Interests
            value={state[INTEREST_IDS]}
            onChange={onChange(INTEREST_IDS)} />
          <Proposals
            hasError={errors[CAN_TXT]}
            value={state[CAN_TXT]}
            onChange={onChange(CAN_TXT)} />
          <Needs
            hasError={errors[NEED_TXT]}
            value={state[NEED_TXT]}
            onChange={onChange(NEED_TXT)} />
          <DefaultButton
            disabled={loading}
            loading={loading}
            buttonStyle={profileSetupStyles.submitButton}
            title="Сохранить"
            onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
}

ProfileSetup.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avatar: PropTypes.string,
  }),
  fetchVocs: PropTypes.func,
  fetchAccount: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.common?.loading,
  account: state.account,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchVocs: getVocs,
  fetchAccount: getMyAccount,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ProfileSetup));
