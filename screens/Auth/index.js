import memoize from "lodash/memoize";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import React from "react";
import {
  View, TouchableOpacity, KeyboardAvoidingView, Platform,
} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {SvgXml} from "react-native-svg";
import {LinearGradient} from "expo-linear-gradient";
import Span from "../../components/text/Span";
import styles from "./styles";
import Forms from "./Forms";
import logo from "../../assets/svg/h_logo.svg";
import {GRADIENT} from "../../constants/Colors";
import Footer from "./Footer";

const Wrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

const selectTab = (idx, setTab) => () => setTab(idx);

const textStyles = (idx) => memoize((tab) => ({
  color: tab === idx ? "#fff" : undefined,
  fontSize: 20,
}));

const buttonStyles = (idx) => memoize((tab) => ([styles.tab, {
  backgroundColor: tab === idx ? "transparent" : "#FFFFFF",
}]));

function AuthScreen() {
  const [tab, setTab] = React.useState(1);
  const insets = useSafeAreaInsets();
  return (
    <Wrapper
      enabled
      behavior="padding"
      style={styles.root}>
      <LinearGradient
        start={GRADIENT.start}
        end={GRADIENT.end}
        colors={GRADIENT.colors}>
        <View
          style={[styles.topBar, {
            paddingTop: insets.top + 8,
          }]}>
          <View style={styles.logo}>
            <SvgXml
              xml={logo}
              width={45.76}
              height={44} />
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            disabled={tab === 0}
            style={buttonStyles(1)(tab)}
            onPress={selectTab(0, setTab)}>
            <Span style={textStyles(1)(tab)}>
              Вход
            </Span>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={tab === 1}
            style={buttonStyles(0)(tab)}
            onPress={selectTab(1, setTab)}>
            <Span style={textStyles(0)(tab)}>
              Регистрация
            </Span>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <Forms
        goRegister={selectTab(1, setTab)}
        tabIdx={tab} />
      <Footer />
    </Wrapper>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // ...
}, dispatch);

export default connect(null, mapDispatchToProps)(AuthScreen);
