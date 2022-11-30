import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import Paragraph from "../../text/Paragraph";
import Span from "../../text/Span";
import OAuthConnect from "../oauth";
import styles from "../styles";
import DefaultButton from "../../buttons/default";
import LinkButton from "../../buttons/link";
import Input from "../Input";
import login from "../../../lib/api/login";
import restorePassword from "../../../lib/api/restorePassword";

function LoginForm(props) {
  const {
    goRegister,
    email, setEmail,
    password, setPassword,
    loading, setLoading,
    pwdVisible, setPwdVisible,
  } = props;
  const [restore, setRestore] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const setValue = (cb) => (v) => {
    setErrors({});
    cb(v);
  };

  return (
    <View style={styles.root}>
      <Paragraph
        center
        style={styles.title}>
        Войти с помощью эл. адреса
      </Paragraph>
      <Input
        autoCompleteType="email"
        keyboardType="email-address"
        placeholder="Адрес электронной почты"
        value={email}
        onChangeText={setValue(setEmail)}
        error={errors.username} />
      {!restore ? (
        <Input
          secureTextEntry={!pwdVisible}
          value={password}
          placeholder="Пароль"
          onChangeText={setValue(setPassword)}
          error={errors.password}
          iconName={pwdVisible ? "hide" : "show"}
          iconPress={() => setPwdVisible(!pwdVisible)} />
      ) : null}
      <DefaultButton
        disabled={loading}
        loading={loading}
        buttonStyle={styles.submitButton}
        onPress={async () => {
          const fn = restore ? restorePassword : login;
          setLoading(true);
          await fn({email, password}, setErrors);
          setLoading(false);
        }}
        title={restore ? "Восстановить" : "Войти"} />
      {!restore ? (
        <React.Fragment>
          <Paragraph center>или войдите через</Paragraph>
          <OAuthConnect />
        </React.Fragment>
      ) : null}
      <LinkButton
        style={styles.linkText}
        title={restore ? "Войти" : "Не помнишь пароль?"}
        onPress={() => setRestore(!restore)} />
      <View style={styles.row}>
        <Span style={styles.dimmed}>Нет аккаунта?&nbsp;</Span>
        <LinkButton
          title="Зарегистрироваться"
          style={styles.linkText}
          onPress={goRegister} />
      </View>
    </View>
  );
}

LoginForm.propTypes = {
  goRegister: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  pwdVisible: PropTypes.bool,
  setPwdVisible: PropTypes.func,
};

export default React.memo(LoginForm);
