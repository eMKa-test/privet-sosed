import React from "react";
import {useFocusEffect} from "@react-navigation/native";
import pick from "lodash/pick";
import memoize from "lodash/memoize";
import {View} from "react-native";
import Input from "../../../components/auth/Input";
import Paragraph from "../../../components/text/Paragraph";
import DefaultButton from "../../../components/buttons/default";
import styles from "../styles";
import updatePassword from "../../../lib/api/account/update-password";
import SuccessInfoBlock from "../../../components/infoBlocks/success";

const RESET = "RESET";
const OLD_PWD = "old";
const OLD_PWD_VISIBLE = "OLD_PWD_VISIBLE";
const NEW_PWD = "new";
const NEW_PWD_VISIBLE = "NEW_PWD_VISIBLE";
const NEW_PWD2 = "new2";
const NEW_PWD2_VISIBLE = "NEW_PWD2_VISIBLE";

const initialState = memoize(() => ({
  [OLD_PWD]: "",
  [OLD_PWD_VISIBLE]: false,
  [NEW_PWD]: "",
  [NEW_PWD_VISIBLE]: false,
  [NEW_PWD2]: "",
  [NEW_PWD2_VISIBLE]: false,
}));

const reducer = (state, action) => {
  if (action.type === RESET) {
    return initialState();
  }
  return {...state, [action.type]: action.value};
};

function Passwords() {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const [errors, setErrors] = React.useState(null);
  const [successMsg, setSuccessMsg] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const submit = React.useCallback(() => {
    successMsg(undefined);
    setLoading(true);
    updatePassword(
      pick(state, [OLD_PWD, NEW_PWD, NEW_PWD2]),
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
      <Paragraph size={14}>Старый пароль</Paragraph>
      <Input
        placeholder="Укажи текущий пароль"
        autoCompleteType="password"
        secureTextEntry={!state[OLD_PWD_VISIBLE]}
        value={state[OLD_PWD]}
        onChangeText={(value) => {
          setErrors(null);
          dispatch({type: OLD_PWD, value});
        }}
        error={errors?.old}
        iconName={state[OLD_PWD_VISIBLE] ? "hide" : "show"}
        iconPress={() => dispatch({type: OLD_PWD_VISIBLE, value: !state[OLD_PWD_VISIBLE]})} />
      <Paragraph size={14}>Новый пароль</Paragraph>
      <Input
        placeholder="Укажи новый пароль"
        secureTextEntry={!state[NEW_PWD_VISIBLE]}
        value={state[NEW_PWD]}
        onChangeText={(value) => {
          setErrors(null);
          dispatch({type: NEW_PWD, value});
        }}
        error={errors?.new}
        iconName={state[NEW_PWD_VISIBLE] ? "hide" : "show"}
        iconPress={() => dispatch({type: NEW_PWD_VISIBLE, value: !state[NEW_PWD_VISIBLE]})} />
      <Paragraph size={14}>Повторите пароль</Paragraph>
      <Input
        placeholder="Повтори новый пароль"
        secureTextEntry={!state[NEW_PWD2_VISIBLE]}
        value={state[NEW_PWD2]}
        onChangeText={(value) => {
          setErrors(null);
          dispatch({type: NEW_PWD2, value});
        }}
        error={errors?.new2}
        iconName={state[NEW_PWD2_VISIBLE] ? "hide" : "show"}
        iconPress={() => dispatch({type: NEW_PWD2_VISIBLE, value: !state[NEW_PWD2_VISIBLE]})} />
      <DefaultButton
        disabled={loading}
        loading={loading}
        title="Изменить пароль"
        buttonStyle={styles.submitButton}
        onPress={submit} />
    </React.Fragment>
  );
}

export default Passwords;
