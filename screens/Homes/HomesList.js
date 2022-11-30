import React from "react";
import * as PropTypes from "prop-types";
import {FlatList, RefreshControl} from "react-native";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {connect} from "react-redux";
import Address from "./Address";
import {UPLOAD_DOCS} from "../../constants/Vars";
import ConfirmModal from "../../components/modals/confirm";
import ConfirmModalContent from "../../components/modals/ConfirmModalContent";
import {
  dropdownOptions, initialState, homesActions, headerActionText, headerText, getInfo, keyExtractor, confirmModalState,
} from "./helpers";
import {TRANSPARENT_REFRESH_CONFIG} from "../../constants/Colors";
import ListHeader from "./ListHeader";
import {navigate} from "../../navigation/root";
import {idProp} from "../../lib/utils";

function HomesList(props) {
  const {fetchHomes, homes = [], loading} = props;
  const [action, setAction] = React.useState(initialState);

  React.useEffect(() => {
    if (action?.type === UPLOAD_DOCS && !isEmpty(action?.item)) {
      navigate(UPLOAD_DOCS, {data: action.item});
      setAction(initialState);
    }
  }, [action?.type]);

  const closeModal = React.useCallback(() => {
    setAction(initialState);
  }, []);

  const onConfirm = React.useCallback(() => {
    const fn = homesActions[action?.type];
    if (typeof fn === "function") {
      fn(get(action, "item.id", -1), () => {
        setAction(initialState);
        fetchHomes();
      });
    }
  }, [action]);

  return (
    <FlatList
      refreshControl={(
        <RefreshControl
          tintColor={TRANSPARENT_REFRESH_CONFIG.tintColor}
          colors={TRANSPARENT_REFRESH_CONFIG.colors}
          style={TRANSPARENT_REFRESH_CONFIG.style}
          refreshing={loading}
          onRefresh={fetchHomes} />
      )}
      data={homes}
      keyExtractor={keyExtractor}
      ListHeaderComponent={<ListHeader refreshing={loading} />}
      renderItem={({item}) => (
        <Address
          dropdownOptions={dropdownOptions(item.status)}
          disabled={item.id === action?.item?.id}
          data={item}
          setAction={setAction} />
      )}
      ListFooterComponent={(
        <ConfirmModal
          visible={confirmModalState(action?.type)}
          dismiss={closeModal}
          onConfirm={onConfirm}
          title="Подтверждение удаления">
          <ConfirmModalContent
            headerActionText={headerActionText(action?.type)}
            headerText={headerText(action?.item)}
            info={getInfo(action?.type)} />
        </ConfirmModal>
      )} />
  );
}

HomesList.propTypes = {
  homes: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
  })),
  fetchHomes: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (store) => ({
  homes: store?.homes,
  loading: store?.common?.loading,
});

export default connect(mapStateToProps)(HomesList);
