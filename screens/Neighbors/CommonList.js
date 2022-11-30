import React from "react";
import * as PropTypes from "prop-types";
import {FlatList, RefreshControl} from "react-native";
import {Divider} from "react-native-elements";
import {neighborsListStyles} from "./styles";
import {TRANSPARENT_REFRESH_CONFIG} from "../../constants/Colors";
import UserItem from "./UserItem";
import EmptySearchResult from "./EmptySearchResult";
import Loader from "../../components/loader";

function CommonList(props) {
  const {
    data, loading, refreshLoading, refreshActiveList, onAction, onMomentumScrollEnd,
  } = props;

  const handleMomentumScrollEnd = onMomentumScrollEnd(data);

  return (data?.length < 1) ? (
    <EmptySearchResult />
  ) : (
    <FlatList
      contentContainerStyle={neighborsListStyles.flatlist}
      refreshControl={(
        <RefreshControl
          tintColor={TRANSPARENT_REFRESH_CONFIG.tintColor}
          colors={TRANSPARENT_REFRESH_CONFIG.colors}
          style={TRANSPARENT_REFRESH_CONFIG.style}
          refreshing={refreshLoading}
          onRefresh={refreshActiveList} />
            )}
      keyExtractor={(item, idx) => String(item?.user?.id || idx)}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      data={data}
      renderItem={({item}) => (
        <UserItem
          data={item}
          onAction={() => onAction(item?.user, item?.is_blocked)} />
      )}
      ItemSeparatorComponent={() => <Divider style={neighborsListStyles.divider} />}
      ListFooterComponent={(data?.length > 0) ? <Loader active={loading} /> : null} />
  );
}

CommonList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  loading: PropTypes.bool,
  refreshLoading: PropTypes.bool,
  refreshActiveList: PropTypes.func,
  onAction: PropTypes.func,
  onMomentumScrollEnd: PropTypes.func,
};

export default React.memo(CommonList);
