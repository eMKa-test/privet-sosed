import get from "lodash/get";
import React from "react";
import * as PropTypes from "prop-types";
import {FlatList} from "react-native";
import {idProp, keyExtractor} from "../../../lib/utils";
import FeedItemCard from "../../../components/FeedItemCard";
import Loader from "../../../components/loader";
import DropdownActionSheet from "../../../components/actionSheets/Dropdown";
import ConfirmModalContent from "../../../components/modals/ConfirmModalContent";
import ConfirmModal from "../../../components/modals/confirm";
import {POST} from "../../../constants/Vars";
import styles from "./styles";
import RenderPostByType from "../../../components/Post";
import useDropdown, {DROPDOWN, DELETE_ACTION} from "../../../lib/hooks/useDropdown";

function SearchEventsList(props) {
  const {
    data, loading, myId, houseId, fetchNext, search,
  } = props;
  const [
    dropdown, dismiss, openDropdown, onDropdownSelect, onConfirmDelete, dropdownOptions,
  ] = useDropdown();

  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const delta = Math.round(contentOffset.y - (contentSize.height - layoutMeasurement.height));
    if (delta < -1 || loading) {
      return null;
    }
    const last = Array.from(data).pop();
    if (last && !loading) {
      fetchNext();
    }
  }, [data, loading]);

  const handleConfirmDelete = () => {
    onConfirmDelete(search);
  };

  const onPostDropdownPress = React.useCallback((item) => {
    openDropdown(item, POST);
  }, []);

  return (
    <React.Fragment>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={data}
        keyExtractor={keyExtractor}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ListFooterComponent={data?.length > 0 ? <Loader active={loading} /> : null}
        renderItem={({item}) => (
          <FeedItemCard
            showStreet={houseId !== item?.house?.name}
            openDropdown={onPostDropdownPress}
            data={item}>
            <RenderPostByType
              type={item?.type}
              data={item} />
          </FeedItemCard>
        )} />
      <ConfirmModal
        visible={dropdown?.modal === DELETE_ACTION}
        dismiss={dismiss}
        onConfirm={handleConfirmDelete}
        title="Удаление записи">
        <ConfirmModalContent headerActionText="Вы действительно хотите удалить данную запись?" />
      </ConfirmModal>
      <DropdownActionSheet
        open={dropdown?.modal === DROPDOWN}
        dismiss={dismiss}
        options={dropdownOptions(myId === get(dropdown, "item.user.id"))}
        onSelect={onDropdownSelect} />
    </React.Fragment>
  );
}

SearchEventsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
  })),
  loading: PropTypes.bool,
  fetchNext: PropTypes.func,
  myId: idProp,
  houseId: PropTypes.string,
  search: PropTypes.func,
};

export default SearchEventsList;
