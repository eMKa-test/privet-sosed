import get from "lodash/get";
import React from "react";
import * as PropTypes from "prop-types";
import {
  Alert,
  KeyboardAvoidingView, Platform, ScrollView, View,
} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import styles from "./styles";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import {goBack} from "../../navigation/root";
import {idProp} from "../../lib/utils";
import Loader from "../../components/loader";
import {
  reducer, initialState, fetchAbuseOptions, CHOOSE, COMMENT, submitAbuse,
} from "./helpers";
import AbuseOptions from "./AbuseOptions";
import TextArea from "../../components/inputs/TextArea";
import OutlineButton from "../../components/buttons/outline";
import DefaultButton from "../../components/buttons/default";

const headerTitle = {label: "Пожаловаться"};

const Wrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

function AbuseScreen(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onFocus = React.useCallback(() => {
    fetchAbuseOptions(dispatch);
  }, []);

  useFocusEffect(onFocus);

  const choose = React.useCallback((chosen) => {
    dispatch({type: CHOOSE, chosen});
  }, []);

  const redirectBack = React.useCallback(() => {
    if (typeof goBack === "function") {
      goBack();
    }
  }, []);

  const submit = React.useCallback(() => {
    const abuseType = get(props, "route.params.abuseType");
    const id = get(props, "route.params.abuseId");
    const type = get(state, "chosen.id");
    if (id && type) {
      submitAbuse(abuseType, {id, type, note: get(state, "text", "")}, (msg) => {
        Alert.alert(null, String(msg).toString(), [{
          onPress: redirectBack,
        }]);
      });
    }
  }, [state, props.route.params?.postId]);

  return (
    <Wrapper
      enabled
      behavior="padding"
      style={styles.root}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu active={headerTitle} />
                )} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.abuseContent}>
        <Loader
          containerStyle={styles.loaderContainer}
          active={state?.loading} />
        <AbuseOptions
          options={state.options}
          chosen={state.chosen}
          setChosen={choose} />
        <TextArea
          label="Комментарий модератору"
          onInputChange={(text) => { dispatch({type: COMMENT, text}); }} />
        <View style={styles.footer}>
          <OutlineButton
            title="Отмена"
            fontSize={16}
            buttonStyle={styles.cancelButton}
            onPress={redirectBack} />
          <DefaultButton
            disabled={!get(state, "chosen.id")}
            title="Отправить"
            fontSize={16}
            buttonStyle={styles.submitButton}
            onPress={submit} />
        </View>
      </ScrollView>
    </Wrapper>
  );
}

AbuseScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      postId: idProp,
    }),
  }),
};

export default AbuseScreen;
