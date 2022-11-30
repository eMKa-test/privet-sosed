import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  Text, View,
} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import Modal from "react-native-modal";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import get from "lodash/get";
import {bindActionCreators} from "redux";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import SearchInput from "./SearchInput";
import styles from "./styles";
import useSearch from "../../lib/hooks/useSearch";
import {idProp} from "../../lib/utils";
import SearchEventsList from "./SearchEventsList";
import NoResult from "./NoResult";
import useDebounce from "../../lib/hooks/useDebounce";
import CloseButton from "../../components/buttons/close";
import SelectFilter from "./SelectFilter";
import DropdownActionSheet from "../../components/actionSheets/Dropdown";
import {MODAL_TIMING} from "../../constants/Layout";
import {getHomes} from "../../store/actions/homesActions";
import getTags from "../../lib/api/activity/get-tags";
import {store} from "../../store";
import {setSearchHashtag, setSearchTagId} from "../../store/actions/commonActions";

const FILTER_BY_HOUSE = "FILTER_BY_HOUSE";
const FILTER_BY_POST_TYPE = "FILTER_BY_POST_TYPE";
const FILTER_BY_TAG = "FILTER_BY_TAG";

const animationOutTiming = MODAL_TIMING / 1.6;

const screenHeading = {label: "Поиск"};

const filters = {
  label: "Фильтры",
  filterTypes: {
    postType: {
      label: "Тип новости",
      types: [
        {id: 0, label: "Выберите тип"},
        {id: 1, label: "Пост"},
        {id: 2, label: "Событие"},
        {id: 3, label: "Объявление"},
        {id: 4, label: "Опрос"},
      ],
    },
    tags: {
      label: "Выберите тему",
    },
  },
};

async function fetchTags(callback) {
  const list = [{id: "", label: "Выберите тему"}];
  try {
    const tags = await getTags();
    tags.map((item) => list.push({id: item.id, label: item.title}));
  } catch (e) {
    // ...
  } finally {
    callback(list);
  }
}

function SearchScreen(props) {
  const [selectModal, setSelectModal] = React.useState(false);
  const [optionsModalType, setOptionsModalType] = React.useState("");
  const [tagsList, setTagsList] = React.useState([]);
  const [state, search, refresh, fetchNext, setSearchText, setSearchHouse, setSearchType, setSearchTag] = useSearch();
  const {
    data, q, loading, type, houseId, postType, tagId,
  } = state;
  const {
    myId, fetchHomes, feedTagId, feedHashtag,
  } = props;

  const debouncedSearch = useDebounce(q, 150);

  const inset = useSafeAreaInsets();

  useFocusEffect(React.useCallback(() => {
    if (typeof fetchHomes === "function") {
      fetchHomes();
    }
    if (q === "") {
      refresh();
    }
  }, [q]));

  const onMount = () => {
    fetchTags(setTagsList);
  };

  React.useEffect(onMount, []);

  React.useEffect(() => {
    if (feedTagId && (feedTagId?.id !== tagId?.id)) {
      setSearchTag(feedTagId);
      store.dispatch(setSearchTagId(null));
    }
    if (feedHashtag && (feedHashtag !== q)) {
      setSearchText(feedHashtag);
      store.dispatch(setSearchHashtag(null));
    }
  }, [feedTagId, feedHashtag]);

  React.useEffect(() => {
    if (q !== "") {
      search();
    }
  }, [debouncedSearch]);

  React.useEffect(() => {
    search();
  }, [postType, tagId]);

  const handleOpenOptionsModal = (filterType) => {
    setSelectModal(false);
    setTimeout(() => {
      setOptionsModalType(filterType);
    }, 300);
  };

  const handleBackToSelectModal = () => {
    setOptionsModalType("");
    setTimeout(() => {
      setSelectModal(true);
    }, 300);
  };

  return (
    <View style={styles.root}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu active={screenHeading} />
                )} />
      <SearchInput
        searchText={q}
        setSearchText={setSearchText}
        setModal={setSelectModal}
        loading={loading} />
      { data.length !== 0 ? (
        <SearchEventsList
          data={data}
          type={type}
          myId={myId}
          loading={loading}
          fetchNext={fetchNext}
          search={search} />
      ) : (<NoResult />)}
      <Modal
        useNativeDriver
        animationOutTiming={animationOutTiming}
        animationInTiming={MODAL_TIMING}
        hideModalContentWhileAnimating
        style={[styles.modal, {
          marginTop: inset.top,
          marginBottom: inset.bottom > 0 ? inset.bottom : 20,
        }]}
        onBackButtonPress={() => setSelectModal(false)}
        onBackdropPress={() => setSelectModal(false)}
        isVisible={selectModal}>
        <View style={styles.modalContent}>
          <Header
            isModal
            leftItem={(
              <View style={styles.modalHeader}>
                <CloseButton onPress={() => setSelectModal(false)} />
                <Text style={styles.modalHeaderText}>{filters?.label}</Text>
              </View>
                        )} />
          <View style={styles.modalBody}>
            <SelectFilter
              label={get(filters, "filterTypes.postType.label")}
              defaultValue={get(filters, "filterTypes.postType.types[0].label")}
              currentValue={postType?.label || get(filters, "filterTypes.postType.types[0].label")}
              handleOpenOptionsModal={() => handleOpenOptionsModal(FILTER_BY_POST_TYPE)} />
            <SelectFilter
              label={get(filters, "filterTypes.tags.label")}
              defaultValue={get(filters, "filterTypes.tags.label")}
              currentValue={tagId?.label || get(filters, "filterTypes.tags.label")}
              handleOpenOptionsModal={() => handleOpenOptionsModal(FILTER_BY_TAG)} />
          </View>
        </View>
      </Modal>
      <DropdownActionSheet
        open={optionsModalType === FILTER_BY_POST_TYPE}
        dismiss={handleBackToSelectModal}
        options={get(filters, "filterTypes.postType.types")}
        onSelect={setSearchType} />
      <DropdownActionSheet
        open={optionsModalType === FILTER_BY_TAG}
        dismiss={handleBackToSelectModal}
        options={tagsList}
        onSelect={setSearchTag} />
    </View>
  );
}

SearchScreen.propTypes = {
  myId: idProp,
  fetchHomes: PropTypes.func.isRequired,
  feedTagId: PropTypes.shape({
    id: idProp,
    title: PropTypes.string,
  }),
  feedHashtag: PropTypes.string,
};

const mapStateToProps = (reduxStore) => ({
  myId: reduxStore.account?.id,
  feedTagId: reduxStore.common.searchTagId,
  feedHashtag: reduxStore.common.searchHashtag,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchHomes: getHomes,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
