import React from "react";
import {ScrollView, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {Divider} from "react-native-elements";
import styles from "../styles";
import Paragraph from "../../../components/text/Paragraph";
import getSessions from "../../../lib/api/security/get-sessions";
import SessionItem from "./SessionItem";
import getLoginHistory from "../../../lib/api/security/get-login-history";
import sessionItemStyles from "./styles";
import TransparentButton from "../../../components/buttons/transparent";
import closeAllSessions from "../../../lib/api/security/close-all-sessions";
import Loader from "../../../components/loader";

const fetchPayload = async (callback) => {
  let sessions = [], history = [];
  try {
    [sessions, history] = await Promise.all([getSessions(), getLoginHistory()]);
  } finally {
    callback({sessions, history});
  }
};

const LOAD = "LOAD";

const initialState = {
  history: [],
  sessions: [],
};

const reducer = (state, action) => {
  if (action.type === LOAD) {
    const {history = [], sessions = []} = action.payload;
    return {
      history,
      sessions,
    };
  }
  return state;
};

function Security() {
  const [loading, setLoading] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fetchData = React.useCallback(() => {
    setLoading(true);
    fetchPayload((payload) => {
      dispatch({type: LOAD, payload});
      setLoading(false);
    });
  }, []);

  useFocusEffect(fetchData);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Loader
        active={loading}
        containerStyle={styles.loader} />
      <View style={styles.block}>
        <View style={styles.blockTitle}>
          <Paragraph
            noMargin
            size={16}>
            Активные сессии
          </Paragraph>
        </View>
        <View style={styles.blockContent}>
          <Paragraph style={styles.description}>
            Все текущие активные сесиии. Вы можете в любой момент прекратить эту активность.
          </Paragraph>
          {Array.isArray(state?.sessions) ? state.sessions.map((item, idx) => (
            <React.Fragment key={String(idx)}>
              <SessionItem data={item} />
              {idx !== state.sessions.length - 1 ? (
                <Divider style={sessionItemStyles.divider} />
              ) : null}
            </React.Fragment>
          )) : null}
          <TransparentButton
            color="#1a1a1a"
            buttonStyle={styles.linkButton}
            titleStyle={styles.linkButtonText}
            title="Завершить все сеансы"
            onPress={async () => {
              try {
                await closeAllSessions();
              } finally {
                fetchData();
              }
            }} />
        </View>
      </View>
      <View style={styles.block}>
        <View style={styles.blockTitle}>
          <Paragraph
            noMargin
            size={16}>
            История активности
          </Paragraph>
        </View>
        <View style={styles.blockContent}>
          <Paragraph style={styles.description}>
            История активности показывает информацию о том, с каких устройств
            и в какое время Вы входили на сайт.
          </Paragraph>
          {Array.isArray(state?.history) ? state.history.map((item, idx) => (
            <React.Fragment key={String(idx)}>
              <SessionItem data={item} />
              {idx !== state.history.length - 1 ? (
                <Divider style={sessionItemStyles.divider} />
              ) : null}
            </React.Fragment>
          )) : null}
        </View>
      </View>
    </ScrollView>
  );
}

export default React.memo(Security);
