import React from "react";
import * as PropTypes from "prop-types";
import {KeyboardAvoidingView, Platform, View} from "react-native";
import memoize from "lodash/memoize";
import uniqueId from "lodash/uniqueId";
import get from "lodash/get";
import {useFocusEffect} from "@react-navigation/native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import isEmpty from "lodash/isEmpty";
import {
  PRIVACY, PROFILE, SECURITY, SETUP, BLACK_LIST,
} from "../../constants/Vars";
import indexStyles from "../Neighbors/styles";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import Setup from "./Setup";
import Security from "./Security";
import Privacy from "./Privacy";
import ProfileSetup from "./ProfileSetup";
import {getMyAccount} from "../../store/actions/accountActions";
import BlackList from "./BlackList";

const menu = memoize(() => {
  const m = {
    [PROFILE]: {
      id: uniqueId("menu:option:"),
      label: "Профиль",
    },
    [SETUP]: {
      id: uniqueId("menu:option:"),
      label: "Доступ",
    },
    [SECURITY]: {
      id: uniqueId("menu:option:"),
      label: "Безопасность",
    },
    [PRIVACY]: {
      id: uniqueId("menu:option:"),
      label: "Приватность",
    },
    [BLACK_LIST]: {
      id: uniqueId("menu:option:"),
      label: "Черный список",
    },
  };
  return Object.entries(m)
    .map(([k, item]) => ({
      ...item,
      value: k,
    }));
});

const [
  initOption,
  // /* по умолчанию открываем на втором пункте меню */,
] = menu();

const switchView = (activeMenuOptionValue) => {
  switch (activeMenuOptionValue) {
    case PROFILE:
      return <ProfileSetup />;
    case SETUP:
      return <Setup />;
    case SECURITY:
      return <Security />;
    case PRIVACY:
      return <Privacy />;
    case BLACK_LIST:
      return <BlackList />;
    default:
      return null;
  }
};

const Wrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

function ProfileScreen(props) {
  const {account, fetchAccount, route} = props;
  const [activeMenuOption, setActiveMenuOption] = React.useState(initOption);
  const withoutHeader = get(route, "params.withoutHeader", false);

  const onFocus = React.useCallback(() => {
    if (isEmpty(account) && typeof fetchAccount === "function") {
      fetchAccount();
    }
  }, []);

  useFocusEffect(onFocus);

  const options = menu();

  return (
    <Wrapper
      enabled
      behavior="padding"
      style={indexStyles.root}>
      <Header
        backArrow
        leftItem={!withoutHeader
          ? (
            <HeaderMenu
              options={options}
              active={activeMenuOption}
              onSelect={setActiveMenuOption} />
          ) : (
            <View style={{paddingVertical: 12}} />
          )} />
      {switchView(activeMenuOption?.value)}
    </Wrapper>
  );
}

ProfileScreen.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  route: PropTypes.shape({
    withoutHeader: PropTypes.bool,
  }),
  fetchAccount: PropTypes.func,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchAccount: getMyAccount,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
