import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import get from "lodash/get";
import memoize from "lodash/memoize";
import {WebView} from "react-native-webview";
import styles from "./styles";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import {UNKNOWN_ERROR} from "../../constants/Vars";
import Fade from "../../components/AnimateWrappers/Fade";
import {BASE_URL} from "../../constants/Config";

const arr = [
  `${BASE_URL}/terms-of-use?is_app=1`,
  `${BASE_URL}/privacy?is_app=1`,
  `${BASE_URL}/content-terms?is_app=1`,
];

const checkUrl = memoize((url) => {
  return arr.includes(url);
});

function StaticWebview({route}) {
  const [loading, setLoading] = React.useState(true);
  const wvRef = React.useRef();
  const label = get(route, "params.label", UNKNOWN_ERROR);
  const page = get(route, "params.page", UNKNOWN_ERROR);
  const uri = `${BASE_URL}/${page}?is_app=1`;

  const changeState = React.useCallback((state) => {
    if (state.url !== uri && !checkUrl(state.url)) {
      const {current} = wvRef;
      current.stopLoading();
    }
  }, []);

  return (
    <View style={styles.root}>
      <Header
        backArrow
        leftItem={<HeaderMenu active={{label}} />} />
      <View style={styles.wvContainer}>
        <Fade
          withLoader
          initialValue={0}
          duration={400}
          depProp={loading}>
          <React.Fragment>
            <WebView
              onLoadEnd={() => setLoading(false)}
              ref={wvRef}
              sharedCookiesEnabled
              style={styles.webview}
              onNavigationStateChange={changeState}
              source={{uri}} />
          </React.Fragment>
        </Fade>
      </View>
    </View>
  );
}

StaticWebview.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  }),
};

export default React.memo(StaticWebview);
