import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import React from "react";
import {View} from "react-native";
import {bindActionCreators} from "redux";
import indexStyles from "./styles";
import BlackList from "./BlackList";
import {getBlacklist} from "../../../store/actions/blacklistActions";
import ConfirmModalContent from "../../../components/modals/ConfirmModalContent";
import ConfirmModal from "../../../components/modals/confirm";
import {unBlockUser} from "../../../lib/api/user/block";
import SearchInput from "../../Search/SearchInput";
import useDebounce from "../../../lib/hooks/useDebounce";
import {idProp} from "../../../lib/utils";
import {
  reducer,
  initialState,
  SET_ACTION_USER,
  SET_SEARCH_TEXT,
  SET_HOUSES_LIST,
} from "./helpers";
import {getVocs} from "../../../store/actions/vocsActions";

async function actionAsync(id, fn, callback) {
  let res;
  try {
    if (id) {
      res = await fn(id);
    }
  } finally {
    if (typeof callback === "function") {
      callback(res);
    }
  }
}

function BlackListScreen(props) {
  const {
    fetchBlackList, fetchVocs, loading,
    houses, lastNeighborId, lastNeighborBlacklistId,
  } = props;

  const [state, dispatch] = React.useReducer(reducer, initialState(), initialState);
  const {actionUser, searchText} = state;

  const debouncedSearch = useDebounce(searchText, 150);

  const setSearchText = React.useCallback((text) => {
    dispatch({type: SET_SEARCH_TEXT, searchText: text});
  }, []);

  const setHousesList = React.useCallback((listOfHouses) => {
    dispatch({type: SET_HOUSES_LIST, housesList: listOfHouses});
  }, []);

  const fetchActiveList = React.useCallback((params = {}) => {
    fetchBlackList({
      blacklist: 1,
      q: searchText,
      lastNeighborId,
      ...params,
    });
  }, [searchText]);

  const fetchNextActiveList = React.useCallback((params = {}) => {
    if (lastNeighborBlacklistId !== -1) {
      fetchActiveList({...params});
    }
  }, [fetchActiveList, lastNeighborId, lastNeighborBlacklistId]);

  const refreshActiveList = React.useCallback(() => {
    fetchActiveList({refresh: true});
  }, [fetchActiveList]);

  useFocusEffect(React.useCallback(() => {
    refreshActiveList();
  }, [debouncedSearch]));

  const closeModal = React.useCallback(() => {
    dispatch({type: SET_ACTION_USER, actionUser: null});
  }, []);

  const onMount = () => {
    const list = [{id: 0, label: "Выберите дом"}];
    houses.map((item) => list.push({id: item.house.id, label: item.house.name}));
    setHousesList(list);
    fetchVocs();
  };

  React.useEffect(onMount, []);

  const onAction = React.useCallback((user) => {
    dispatch({type: SET_ACTION_USER, actionUser: user});
  }, []);

  const onConfirm = React.useCallback(() => {
    actionAsync(
      actionUser?.id,
      unBlockUser,
      () => {
        closeModal();
        refreshActiveList();
      },
    );
  }, [actionUser]);

  const onMomentumScrollEnd = (data) => (React.useCallback(({nativeEvent}) => {
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const delta = Math.round(contentOffset.y - (contentSize.height - layoutMeasurement.height));
    if (delta < -1 || loading) {
      return null;
    }
    const last = Array.from(data).pop();
    if (last && !loading) {
      fetchNextActiveList({fromId: last.user.id});
    }
  }, [data, loading]));

  return (
    <View style={indexStyles.root}>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        loading={loading} />
      <BlackList
        onAction={onAction}
        loading={loading}
        refreshActiveList={refreshActiveList}
        onMomentumScrollEnd={onMomentumScrollEnd} />
      <ConfirmModal
        visible={Boolean(actionUser)}
        dismiss={closeModal}
        onConfirm={onConfirm}
        title="Разблокировка пользователя">
        <ConfirmModalContent
          headerText={actionUser?.title}
          headerActionText="Вы действительно хотите разблокировать пользователя:" />
      </ConfirmModal>
    </View>
  );
}

BlackListScreen.propTypes = {
  fetchBlackList: PropTypes.func,
  fetchVocs: PropTypes.func,
  loading: PropTypes.bool,
  houses: PropTypes.arrayOf(PropTypes.shape({id: idProp})),
  lastNeighborId: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  lastNeighborBlacklistId: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
};

const mapStateToProps = (store) => ({
  houses: store?.homes,
  loading: store?.common?.loading,
  lastNeighborId: store?.neighbors?.lastNeighborId,
  lastNeighborBlacklistId: store?.blacklist?.lastNeighborBlacklistId,
  fullProfessionsList: store.vocs?.professions,
  fullInterestsList: store.vocs?.interests,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchBlackList: getBlacklist,
  fetchVocs: getVocs,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BlackListScreen);
