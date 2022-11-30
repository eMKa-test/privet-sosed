import React from "react";
import {useFocusEffect} from "@react-navigation/native";
import pick from "lodash/pick";
import memoize from "lodash/memoize";
import {connect} from "react-redux";
import {View} from "react-native";
import * as PropTypes from "prop-types";
import Input from "../../../components/auth/Input";
import Paragraph from "../../../components/text/Paragraph";
import DefaultButton from "../../../components/buttons/default";
import styles from "../styles";
import updateEmail from "../../../lib/api/account/update-email";
import SuccessInfoBlock from "../../../components/infoBlocks/success";

const RESET = "RESET";
const EMAIL = "email";
const PWD = "password";
const PWD_VISIBLE = "PWD_VISIBLE";

const initialState = memoize(() => ({
  [EMAIL]: "",
  [PWD]: "",
  [PWD_VISIBLE]: false,
}));

const reducer = (state, action) => {
  if (action.type === RESET) {
    return initialState();
  }
  return {...state, [action.type]: action.value};
};

function Email({account}) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const [errors, setErrors] = React.useState(null);
  const [successMsg, setSuccessMsg] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const submit = React.useCallback(() => {
    setSuccessMsg(undefined);
    setLoading(true);
    updateEmail(
      pick(state, [EMAIL, PWD]),
      setErrors,
      setSuccessMsg,
      () => setLoading(false),
    );
  }, [state]);

  useFocusEffect(React.useCallback(() => {
    function onBlur() {
      dispatch({type: RESET});
      setSuccessMsg(undefined);
    }
    /**
         * onBlurEffect
         * срабатывает, когда пользователь уходит с экрана
         */
    return onBlur;
  }, []));

  return (
    <React.Fragment>
      {successMsg ? (
        <View style={styles.infoBlock}>
          <SuccessInfoBlock text={successMsg} />
        </View>
      ) : null}
      {account?.email ? (
        <Paragraph style={styles.description}>
          Твой e-mail:
          {" "}
          <Paragraph
            medium
            color="#8D8D8D">
            {account?.email}
          </Paragraph>
        </Paragraph>
      ) : null}
      <Paragraph style={styles.description}>
        Чтобы сменить почтовый адрес, предварительно отправьте на него ссылку для подтверждения.
      </Paragraph>
      <Paragraph size={14}>Новый адрес</Paragraph>
      <Input
        autoCompleteType="email"
        keyboardType="email-address"
        value={state[EMAIL]}
        onChangeText={(value) => {
          setErrors(null);
          dispatch({type: EMAIL, value});
        }}
        error={errors?.email} />
      <Paragraph size={14}>Пароль</Paragraph>
      <Input
        secureTextEntry={!state[PWD_VISIBLE]}
        value={state[PWD]}
        onChangeText={(value) => {
          setErrors(null);
          dispatch({type: PWD, value});
        }}
        error={errors?.password}
        iconName={state[PWD_VISIBLE] ? "hide" : "show"}
        iconPress={() => dispatch({type: PWD_VISIBLE, value: !state[PWD_VISIBLE]})} />
      <DefaultButton
        disabled={loading}
        loading={loading}
        title="Выслать ссылку"
        buttonStyle={styles.submitButton}
        onPress={submit} />
    </React.Fragment>
  );
}

Email.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

const mapStateToProps = (state) => ({
  account: state?.account,
});

export default connect(mapStateToProps, null)(React.memo(Email));
