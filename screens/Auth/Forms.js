import React from "react";
import * as PropTypes from "prop-types";
import {ScrollView} from "react-native";
import LoginForm from "../../components/auth/Login";
import RegisterForm from "../../components/auth/Register";
import styles from "./styles";
import Heading from "../../components/text/Heading";

function Forms(props) {
  const {tabIdx, goRegister} = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [pwdVisible, setPwdVisible] = React.useState(false);
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Heading
        h3
        h3Style={styles.title}>
        Привет, сосед!
      </Heading>
      {tabIdx === 0 ? (
        <LoginForm
          loading={loading}
          setLoading={setLoading}
          email={email}
          setEmail={setEmail}
          password={password}
          pwdVisible={pwdVisible}
          setPwdVisible={setPwdVisible}
          setPassword={setPassword}
          goRegister={goRegister} />
      ) : (
        <RegisterForm
          loading={loading}
          setLoading={setLoading}
          email={email}
          setEmail={setEmail}
          password={password}
          pwdVisible={pwdVisible}
          setPwdVisible={setPwdVisible}
          setPassword={setPassword} />
      )}
    </ScrollView>
  );
}

Forms.propTypes = {
  tabIdx: PropTypes.number.isRequired,
  goRegister: PropTypes.func.isRequired,
};

export default React.memo(Forms);
