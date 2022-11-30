import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import React from "react";
import {View} from "react-native";
import {bindActionCreators} from "redux";
import get from "lodash/get";
import {NEIGHBORS, BLACK_LIST} from "../../constants/Vars";
import indexStyles from "./styles";
import HeaderMenu from "../../components/header/menu";
import Header from "../../components/header";
import NeighborsList from "./NeighborsList";
import {getBlacklist} from "../../store/actions/blacklistActions";
import {getNeighbors} from "../../store/actions/neighborsActions";
import ConfirmModalContent from "../../components/modals/ConfirmModalContent";
import ConfirmModal from "../../components/modals/confirm";
import {blockUser, unBlockUser} from "../../lib/api/user/block";
import SearchInput from "../Search/SearchInput";
import SearchFilterModal from "../../components/modals/SearchFilters";
import useDebounce from "../../lib/hooks/useDebounce";
import DropdownActionSheet from "../../components/actionSheets/Dropdown";
import SearchFilters from "./SearchFilters";
import {idProp} from "../../lib/utils";
import {
  reducer,
  initialState,
  SET_ACTIVE_MENU_OPTION,
  SET_ACTION_USER,
  SET_FILTERS_MAIN_MODAL,
  SET_FILTER_TYPE_MODAL,
  SET_SEARCH_TEXT,
  SET_HOUSES_LIST,
  SET_SEARCH_BY_HOUSE,
  SET_SEARCH_BY_PROFESSIONS,
  FILTER_BY_HOUSE, FILTER_BY_PROFESSIONS, SET_SEARCH_BY_INTERESTS, FILTER_BY_INTERESTS,
} from "./helpers";
import {getVocs} from "../../store/actions/vocsActions";
import MultipleSelectModal from "../../components/inputs/SeparatedMultipleSelect/MultipleSelectModal";
import {MODAL_TIMING} from "../../constants/Layout";

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

const filters = {
  label: "Фильтры",
  filterTypes: {
    houses: {
      label: "Выберите дом",
    },
    professions: {
      label: "Профессии",
      placeholder: "Выберите профессию",
    },
    interests: {
      label: "Интересы",
      placeholder: "Выберите интересы",
    },
  },
};

const modalSwitchDelay = (MODAL_TIMING) + (MODAL_TIMING / 1.6);

function NeighborsScreen(props) {
  const {
    fetchFullList, fetchBlackList, fetchVocs, loading,
    houses, lastNeighborId, lastNeighborBlacklistId, fullProfessionsList,
    fullInterestsList,
  } = props;

  const [state, dispatch] = React.useReducer(reducer, initialState(), initialState);
  const {
    menuOptions, activeMenuOption, actionUser, filtersMainModal,
    filterTypeModal, searchText, housesList, searchByHouse,
    currentProfList, currentInterestsList,
  } = state;

  const debouncedSearch = useDebounce(searchText, 150);

  const setActiveMenuOption = React.useCallback((activeMenu) => {
    dispatch({type: SET_ACTIVE_MENU_OPTION, activeMenuOption: activeMenu});
  }, []);

  const setSearchText = React.useCallback((text) => {
    dispatch({type: SET_SEARCH_TEXT, searchText: text});
  }, []);

  const setHousesList = React.useCallback((listOfHouses) => {
    dispatch({type: SET_HOUSES_LIST, housesList: listOfHouses});
  }, []);

  const setSearchHouse = React.useCallback((house) => {
    dispatch({type: SET_SEARCH_BY_HOUSE, searchByHouse: house});
  }, []);

  const setCurrentProfList = React.useCallback((professions) => {
    dispatch({type: SET_SEARCH_BY_PROFESSIONS, currentProfList: professions});
  }, []);

  const setCurrentInterestsList = React.useCallback((interests) => {
    dispatch({type: SET_SEARCH_BY_INTERESTS, currentInterestsList: interests});
  }, []);

  const fetchActiveList = React.useCallback((params = {}) => {
    if (activeMenuOption.value === NEIGHBORS && typeof fetchFullList === "function") {
      fetchFullList({
        blacklist: 0,
        q: searchText,
        lastNeighborId,
        houseId: searchByHouse?.id,
        professions: currentProfList,
        interests: currentInterestsList,
        ...params,
      });
    }
    if (activeMenuOption.value === BLACK_LIST && typeof fetchBlackList === "function") {
      fetchBlackList({
        blacklist: 1,
        q: searchText,
        lastNeighborId,
        houseId: searchByHouse?.id,
        professions: currentProfList,
        ...params,
      });
    }
  }, [searchText, activeMenuOption, searchByHouse, currentProfList, currentInterestsList]);

  const fetchNextActiveList = React.useCallback((params = {}) => {
    if (lastNeighborId !== -1 && activeMenuOption.value === NEIGHBORS) {
      fetchActiveList({...params});
    }
    if (lastNeighborBlacklistId !== -1 && activeMenuOption.value === BLACK_LIST) {
      fetchActiveList({...params});
    }
  }, [fetchActiveList, lastNeighborId, lastNeighborBlacklistId, activeMenuOption]);

  const refreshActiveList = React.useCallback(() => {
    fetchActiveList({refresh: true});
  }, [fetchActiveList]);

  useFocusEffect(React.useCallback(() => {
    refreshActiveList();
  }, [debouncedSearch, activeMenuOption, searchByHouse, currentProfList, currentInterestsList]));

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

  const onAction = React.useCallback((user, is_blocked) => {
    dispatch({type: SET_ACTION_USER, actionUser: {...user, is_blocked}});
  }, []);

  const onConfirm = React.useCallback(() => {
    actionAsync(
      actionUser?.id,
      actionUser?.is_blocked ? unBlockUser : blockUser,
      () => {
        closeModal();
        if (typeof fetchFullList === "function") {
          refreshActiveList();
        }
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

  const setFiltersMainModal = React.useCallback((mainModal) => {
    dispatch({type: SET_FILTERS_MAIN_MODAL, filtersMainModal: mainModal});
  }, []);

  const setFilterTypeModal = React.useCallback((filterType) => {
    dispatch({type: SET_FILTER_TYPE_MODAL, filterTypeModal: filterType});
  }, []);

  const openFilterTypeModal = React.useCallback((filterType) => {
    setFiltersMainModal(false);
    setTimeout(() => {
      setFilterTypeModal(filterType);
    }, modalSwitchDelay);
  }, []);

  const backToFilterMainModal = React.useCallback(() => {
    setFilterTypeModal("");
    setTimeout(() => {
      setFiltersMainModal(true);
    }, modalSwitchDelay);
  }, []);

  return (
    <View style={indexStyles.root}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu
            active={activeMenuOption}
            onSelect={setActiveMenuOption} />
        )} />
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        setModal={setFiltersMainModal}
        loading={loading} />
      <NeighborsList
        onAction={onAction}
        loading={loading}
        refreshActiveList={refreshActiveList}
        onMomentumScrollEnd={onMomentumScrollEnd} />
      <SearchFilterModal
        title={filters.label}
        selectModal={filtersMainModal}
        setSelectModal={setFiltersMainModal}>
        <SearchFilters
          filters={filters}
          housesList={housesList}
          currentHouse={searchByHouse}
          openFilterTypeModal={openFilterTypeModal}
          currentProfList={currentProfList}
          setCurrentProfList={setCurrentProfList}
          currentInterestsList={currentInterestsList}
          setCurrentInterestsList={setCurrentInterestsList} />
      </SearchFilterModal>
      <ConfirmModal
        visible={Boolean(actionUser)}
        dismiss={closeModal}
        onConfirm={onConfirm}
        title={`${actionUser?.is_blocked ? "Разблокировка" : "Блокировка"} пользователя`}>
        <ConfirmModalContent
          headerText={actionUser?.title}
          headerActionText={
              `Вы действительно хотите ${
                  actionUser?.is_blocked ? "разблокировать" : "заблокировать"
              } пользователя:`
          } />
      </ConfirmModal>
      <DropdownActionSheet
        open={filterTypeModal === FILTER_BY_HOUSE}
        dismiss={backToFilterMainModal}
        options={housesList}
        onSelect={setSearchHouse} />
      <MultipleSelectModal
        open={filterTypeModal === FILTER_BY_PROFESSIONS}
        label={get(filters, "filterTypes.professions.label")}
        dismiss={backToFilterMainModal}
        initialSelected={currentProfList}
        options={fullProfessionsList}
        afterSelect={setCurrentProfList} />
      <MultipleSelectModal
        open={filterTypeModal === FILTER_BY_INTERESTS}
        label={get(filters, "filterTypes.interests.label")}
        dismiss={backToFilterMainModal}
        initialSelected={currentInterestsList}
        options={fullInterestsList}
        afterSelect={setCurrentInterestsList} />
    </View>
  );
}

NeighborsScreen.propTypes = {
  fetchFullList: PropTypes.func,
  fetchBlackList: PropTypes.func,
  fetchVocs: PropTypes.func,
  loading: PropTypes.bool,
  houses: PropTypes.arrayOf(PropTypes.shape({id: idProp})),
  lastNeighborId: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  lastNeighborBlacklistId: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  fullProfessionsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  fullInterestsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
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
  fetchFullList: getNeighbors,
  fetchBlackList: getBlacklist,
  fetchVocs: getVocs,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NeighborsScreen);
