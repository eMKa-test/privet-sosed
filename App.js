import "react-native-gesture-handler";
import "moment/locale/ru";
import get from "lodash/get";
import React from "react";
import * as PropTypes from "prop-types";
import {Provider} from "react-redux";
import {Keyboard, Platform, StatusBar} from "react-native";
import {SplashScreen} from "expo";
import * as Font from "expo-font";
import {PersistGate} from "redux-persist/es/integration/react";
import moment from "moment";
import {Asset} from "expo-asset";
import {NavigationContainer} from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import createNavigation from "./navigation/createNavigation";
import {persistor, store, sagaMiddleware} from "./store";
import {MAIN, WELCOME} from "./constants/Vars";
import {fonts, images} from "./assets";
import {navigationRef} from "./navigation/root";
import {setKeyboardVisibility} from "./store/actions/commonActions";
import ContextProviders from "./providers";
import init from "./lib/init";
import rootSaga from "./store/sagas";
import theme from "./theme";
import request from "./lib/request";

moment.locale("ru");

const fakeFn = () => {
  // nothing
};

console.sendError = function onerror(message) {
  const body = {errorThrown: message};
  if (__DEV__) {
    console.warn(body);
  } else {
    request("log/add", {body})
      .then(fakeFn)
      .catch(fakeFn);
  }
};

async function bootstrapAppAsync(setLoadingComplete) {
  SplashScreen.preventAutoHide();
  try {
    // предзагрузка шрифтов
    await Font.loadAsync({
      ...fonts,
    });
    // предзагрузка картинок
    await Asset.loadAsync([
      ...images,
    ]);
  } catch (e) {
    // Сбрасываем пост об ошибке на сервер, когда будет маршрут
    console.sendError(`bootstrapAppAsync ${e.message}`);
  } finally {
    sagaMiddleware.run(rootSaga);
    setLoadingComplete(true);
    SplashScreen.hide();
  }

  init();
}

async function onBeforeLift(setInitialRouteName) {
  const state = store.getState();
  const welcome = get(state, "common.welcome", false);

  const showEvent = Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
  Keyboard.addListener(showEvent, () => {
    store.dispatch(setKeyboardVisibility(true));
  });
  Keyboard.addListener("keyboardDidHide", () => {
    store.dispatch(setKeyboardVisibility(false));
  });

  if (welcome) {
    // при первом запуске отображать приветствие
    return setInitialRouteName(WELCOME);
  }

  return setInitialRouteName(MAIN);
}

WebBrowser.maybeCompleteAuthSession();

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialRouteName, setInitialRouteName] = React.useState(WELCOME);

  React.useEffect(() => {
    bootstrapAppAsync(setLoadingComplete);
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }

  const AppNavigation = createNavigation(initialRouteName);
  return (
    <Provider store={store}>
      <PersistGate
        onBeforeLift={() => onBeforeLift(setInitialRouteName)}
        persistor={persistor}>
        {Platform.OS === "ios" ? <StatusBar barStyle="light-content" /> : null}
        <ContextProviders>
          <NavigationContainer
            ref={navigationRef}
            theme={theme}>
            <AppNavigation />
          </NavigationContainer>
        </ContextProviders>
      </PersistGate>
    </Provider>
  );
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};

export default App;
