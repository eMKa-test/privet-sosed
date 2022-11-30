import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import Paragraph from "../../text/Paragraph";
import OAuthConnect from "../oauth";
import Span from "../../text/Span";
import DefaultButton from "../../buttons/default";
import LinkButton from "../../buttons/link";
import {navigate} from "../../../navigation/root";
import {POLICY, RULES} from "../../../constants/Vars";
import register from "../../../lib/api/register";
import styles from "../styles";
import Input from "../Input";

function RegisterForm(props) {
  const {
    email, setEmail,
    password, setPassword,
    loading, setLoading,
    pwdVisible, setPwdVisible,
  } = props;
  const [password2, setPassword2] = React.useState("");
  const [pwd2Visible, setPwd2Visible] = React.useState(false);

  const [errors, setErrors] = React.useState({});

  const setValue = (cb) => (v) => {
    setErrors({});
    if (typeof cb === "function") {
      cb(v);
    }
  };

  return (
    <View style={styles.root}>
      <Paragraph
        center
        style={styles.title}>
        Моментальная регистрация
      </Paragraph>
      <Input
        autoCompleteType="email"
        keyboardType="email-address"
        placeholder="Адрес электронной почты"
        value={email}
        onChangeText={setValue(setEmail)}
        error={errors.email} />
      <Input
        secureTextEntry={!pwdVisible}
        value={password}
        placeholder="Пароль"
        onChangeText={setValue(setPassword)}
        error={errors.password}
        iconName={pwdVisible ? "hide" : "show"}
        iconPress={() => setPwdVisible(!pwdVisible)} />
      <Input
        autoCompleteType="off"
        secureTextEntry={!pwd2Visible}
        value={password2}
        placeholder="Повторите пароль"
        onChangeText={setValue(setPassword2)}
        error={errors.password2}
        iconName={pwd2Visible ? "hide" : "show"}
        iconPress={() => setPwd2Visible(!pwd2Visible)} />
      <DefaultButton
        disabled={loading}
        loading={loading}
        style={styles.submitButton}
        title="Продолжить регистрацию"
        onPress={async () => {
          setLoading(true);
          await register({email, password, password2}, setErrors);
          setLoading(false);
        }} />
      <Paragraph center>или зарегистрируйтесь через</Paragraph>
      <OAuthConnect />
      <View style={styles.row}>
        <Span style={styles.dimmed}>Нажимая Зарегистрироваться,&nbsp;</Span>
        <Span style={styles.dimmed}>ты принимаешь наши&nbsp;</Span>
        <LinkButton
          style={styles.linkText}
          title="Условия использования"
          onPress={() => navigate(RULES)} />
        <Span style={styles.dimmed}>&nbsp;и наше&nbsp;</Span>
        <LinkButton
          style={styles.linkText}
          title="Положение о конфиденциальности"
          onPress={() => navigate(POLICY)} />
      </View>
    </View>
  );
}

RegisterForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  pwdVisible: PropTypes.bool,
  setPwdVisible: PropTypes.func,
};

export default React.memo(RegisterForm);
