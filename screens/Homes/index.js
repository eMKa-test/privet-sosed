import memoize from "lodash/memoize";
import React from "react";
import {View} from "react-native";
import * as PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import uniqueId from "lodash/uniqueId";
import isEmpty from "lodash/isEmpty";
import {useFocusEffect, CommonActions} from "@react-navigation/native";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import AddButton from "../../components/buttons/add";
import {getHomes} from "../../store/actions/homesActions";
import HomesList from "./HomesList";
import styles from "./styles";
import {
  CREATE_HOUSE, HOMES, HOUSE_FEED, NEW_ADDR_REQUESTS, UPLOAD_DOCS,
} from "../../constants/Vars";
import {getRequests} from "../../store/actions/newAddrRequestsActions";
import RequestsList from "./RequestsList";
import {navigate} from "../../navigation/root";
import {TabNavigationContext} from "../../providers/tabNavigationProvider";

const menu = memoize((requests) => {
  const m = {
    [HOMES]: {
      id: uniqueId("menu:option:"),
      label: "Дома",
    },
  };
  if (!isEmpty(requests)) {
    m[NEW_ADDR_REQUESTS] = {
      id: uniqueId("menu:option:"),
      label: "Запросы",
    };
  }
  return Object.entries(m).map(([k, item]) => ({...item, value: k}));
});

const [initOption] = menu();

const HomesScreen = (props) => {
  const {
    route, fetchHomes, fetchRequests, newAddrRequests = [], navigation,
  } = props;
  const [activeMenuOption, setActiveMenuOption] = React.useState(initOption);
  const {params, setParams} = React.useContext(TabNavigationContext);

  const fetchAll = React.useCallback(() => {
    if (typeof fetchHomes === "function") {
      fetchHomes();
    }
    if (typeof fetchRequests === "function") {
      fetchRequests();
    }
  }, []);

  const options = menu(newAddrRequests);

  useFocusEffect(React.useCallback(() => {
    if (params && params?.houseId) {
      setTimeout(() => {
        navigate(HOUSE_FEED, {houseId: params?.houseId, houseLabel: params?.houseLabel});
      }, 10);
    } else if (params?.addHouse) {
      setTimeout(() => {
        navigate(CREATE_HOUSE);
      }, 10);
    } else if (route.params?.newAddr && typeof fetchRequests === "function") {
      fetchRequests();
    } else {
      fetchAll();
    }
    return () => {
      setParams(null);
    };
  }, [params]));

  React.useEffect(() => {
    if (route.params?.newAddr && newAddrRequests.length > 0) {
      navigation.dispatch(CommonActions.setParams({newAddr: false}));
      setActiveMenuOption(options[1]);
    }
  }, []);

  React.useEffect(() => {
    if (!isEmpty(route.params?.data)) {
      const {data} = route.params;
      navigation.dispatch(CommonActions.setParams({data: null}));
      if (!isEmpty(data)) {
        fetchHomes();
        setTimeout(() => {
          navigate(UPLOAD_DOCS, {data});
        }, 300);
      }
    }
  }, [route.params?.data]);

  return (
    <View style={styles.root}>
      <Header
        leftItem={(
          <HeaderMenu
            options={options}
            active={activeMenuOption}
            onSelect={setActiveMenuOption} />
        )}
        rightItem={(
          <AddButton onPress={() => navigate(CREATE_HOUSE)} />
        )} />
      {activeMenuOption.value === HOMES ? (
        <HomesList fetchHomes={fetchAll} />
      ) : (
        <RequestsList redirectHome={() => setActiveMenuOption(options[0])} />
      )}
    </View>
  );
};

HomesScreen.propTypes = {
  newAddrRequests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  fetchHomes: PropTypes.func.isRequired,
  fetchRequests: PropTypes.func.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      newAddr: PropTypes.bool,
      addHouse: PropTypes.bool,
      data: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }),
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }),
};

const mapStateToProps = (store) => ({
  newAddrRequests: store.newAddrRequests,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchHomes: getHomes,
  fetchRequests: getRequests,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomesScreen);
