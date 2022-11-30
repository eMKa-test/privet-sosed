import get from "lodash/get";
import isEqual from "lodash/isEqual";
import React, {useEffect, useCallback} from "react";
import * as PropTypes from "prop-types";
import {FlatList, RefreshControl} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {useFocusEffect} from "@react-navigation/native";
import {idProp, keyExtractor} from "../../lib/utils";
import FeedItemCard from "../FeedItemCard";
import Loader from "../loader";
import {TRANSPARENT_REFRESH_CONFIG} from "../../constants/Colors";
import {getPosts} from "../../store/actions/postActions";
import DropdownActionSheet from "../actionSheets/Dropdown";
import ConfirmModalContent from "../modals/ConfirmModalContent";
import ConfirmModal from "../modals/confirm";
import {POST} from "../../constants/Vars";
import styles from "./styles";
import NewPost from "./NewPost";
import RenderPostByType from "../Post";
import useDropdown, {DROPDOWN, DELETE_ACTION} from "../../lib/hooks/useDropdown";
import Paragraph from "../text/Paragraph";
import NoHouse from "../noHouse";

function EventsList(props) {
  const {
    type, liked, loading, posts, fetchPosts, myId, houseId, lastHouseIdForFeedFetch, parentRoute, needRefresh, dwellings, loadedPosts,
  } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const [
    dropdown, dismiss, openDropdown, onDropdownSelect, onConfirmDelete, dropdownOptions,
  ] = useDropdown();

  const _fetchPosts = React.useCallback((params, id = houseId) => {
    if (type == null || typeof fetchPosts !== "function") {
      return;
    }
    fetchPosts({
      type,
      id,
      liked,
      ...params,
    });
  }, [houseId, type, liked]);

  useEffect(() => {
    _fetchPosts({reset: true});
  }, [type, liked]);

  useFocusEffect(React.useCallback(() => {
    if (!isEqual(lastHouseIdForFeedFetch, houseId) || posts?.length < 1 || needRefresh) {
      _fetchPosts({reset: true});
    }
  }, [type, liked, houseId, lastHouseIdForFeedFetch, posts?.length, needRefresh]));

  const refresh = React.useCallback(() => {
    setRefreshing(true);
    _fetchPosts({refresh: true});
  }, [type, liked, houseId]);

  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const delta = Math.round(contentOffset.y - (contentSize.height - layoutMeasurement.height));
    if (delta < -1 || loading) {
      return null;
    }
    const last = Array.from(posts).pop();
    if (last && !loading) {
      _fetchPosts({lastId: last.id});
    }
  }, [type, liked, posts?.length, houseId]);

  useEffect(() => {
    if (!loading) {
      setRefreshing(false);
    }
  }, [loading]);

  const handleConfirmDelete = () => {
    onConfirmDelete(refresh);
  };

  const onPostDropdownPress = React.useCallback((item) => {
    openDropdown(item, POST, parentRoute);
  }, []);

  const renderItem = useCallback(({item}) => (
    <FeedItemCard
      parentRoute={parentRoute}
      openDropdown={onPostDropdownPress}
      data={item}>
      <RenderPostByType
        type={item?.type}
        data={item} />
    </FeedItemCard>
  ), [parentRoute, onPostDropdownPress]);

  if (dwellings === 0) {
    return <NoHouse />;
  }

  return (
    <React.Fragment>
      <FlatList
        ListHeaderComponent={(
          <React.Fragment>
            <NewPost
              loading={refreshing || (loading && posts?.length === 0)}
              houseId={houseId}
              parentRoute={parentRoute} />
            {loadedPosts && posts.length === 0 ? (
              <Paragraph
                size={18}
                center>
                Нет постов
              </Paragraph>
            ) : null}
          </React.Fragment>
        )}
        refreshControl={(
          <RefreshControl
            tintColor={TRANSPARENT_REFRESH_CONFIG.tintColor}
            colors={TRANSPARENT_REFRESH_CONFIG.colors}
            style={TRANSPARENT_REFRESH_CONFIG.style}
            refreshing={false}
            onRefresh={refresh} />
        )}
        contentContainerStyle={styles.flatListContainer}
        data={posts /* .filter((p) => p.images?.length) */}
        keyExtractor={keyExtractor}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ListFooterComponent={posts?.length > 0 ? <Loader active={loading} /> : null}
        renderItem={renderItem} />
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

EventsList.propTypes = {
  type: PropTypes.number,
  liked: PropTypes.bool,
  loading: PropTypes.bool,
  fetchPosts: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
  })),
  myId: idProp,
  houseId: idProp,
  lastHouseIdForFeedFetch: idProp,
  parentRoute: PropTypes.string.isRequired,
  needRefresh: PropTypes.bool,
  dwellings: PropTypes.number,
};

const mapStateToProps = (store) => ({
  posts: store?.posts.posts,
  loadedPosts: store?.posts.loadedPosts,
  loading: store?.common?.loading,
  myId: store.account?.id,
  lastHouseIdForFeedFetch: store?.common?.lastHouseIdForFeedFetch,
  dwellings: store.account?.dwellings_approved,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchPosts: getPosts,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
