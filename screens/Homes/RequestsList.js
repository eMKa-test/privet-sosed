import React from "react";
import * as PropTypes from "prop-types";
import {FlatList, RefreshControl} from "react-native";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Address from "./Address";
import {NEW_ADDR_REQUESTS} from "../../constants/Vars";
import ConfirmModal from "../../components/modals/confirm";
import ConfirmModalContent from "../../components/modals/ConfirmModalContent";
import {
  confirmModalState, dropdownOptions, initialState, keyExtractor, requestsActions,
} from "./helpers";
import {getRequests} from "../../store/actions/newAddrRequestsActions";
import {TRANSPARENT_REFRESH_CONFIG} from "../../constants/Colors";
import ListHeader from "./ListHeader";

function RequestsList(props) {
  const {
    fetchRequests, requests = [], loading, redirectHome,
  } = props;
  const [action, setAction] = React.useState(initialState);

  const closeModal = React.useCallback(() => {
    setAction(initialState);
  }, []);

  const onConfirm = React.useCallback(() => {
    const fn = requestsActions[action?.type];
    const id = get(action, "item.id", -1);
    if (id !== -1 && typeof fn === "function") {
      fn(id, () => {
        setAction(initialState);
        fetchRequests();
      });
    }
  }, [action]);

  React.useEffect(() => {
    if (isEmpty(requests) && typeof redirectHome === "function") {
      redirectHome();
    }
  }, [requests]);

  return (
    <FlatList
      refreshControl={(
        <RefreshControl
          tintColor={TRANSPARENT_REFRESH_CONFIG.tintColor}
          colors={TRANSPARENT_REFRESH_CONFIG.colors}
          style={TRANSPARENT_REFRESH_CONFIG.style}
          refreshing={loading}
          onRefresh={fetchRequests} />
            )}
      data={requests}
      keyExtractor={keyExtractor}
      ListHeaderComponent={<ListHeader refreshing={loading} />}
      renderItem={({item}) => (
        <Address
          dropdownOptions={dropdownOptions(item.status, NEW_ADDR_REQUESTS)}
          disabled={item.id === get(action, "item.id")}
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
            headerActionText="Вы действительно хотите удалить запрос на добавление адреса:"
            headerText={`${get(action, "item.text", "Ошибка")}`} />
        </ConfirmModal>
            )} />
  );
}

RequestsList.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  fetchRequests: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  redirectHome: PropTypes.func,
};

const mapStateToProps = (store) => ({
  requests: store?.newAddrRequests,
  loading: store?.common?.loading,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchRequests: getRequests,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(RequestsList));
