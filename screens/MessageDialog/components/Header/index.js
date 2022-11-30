import React from "react";
import * as PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import {TouchableOpacity, View} from "react-native";
import Dropdown from "../../../../components/actionSheets/DropdownDivider";
import DropdownActionUser from "../../../../components/actionSheets/Dropdown";
import {
  DIALOG_ADD_USERS,
  DIALOG_ATTACHMENTS,
  DIALOG_CLEAR,
  DIALOG_DELETE,
  DIALOG_INFO,
  DIALOG_LEAVE,
  DIALOG_SEARCH_MSG,
  initialConfirm,
  modalOptions,
  modalOptionsUser,
  fetchUserAction,
} from "./helpers";
import ConfirmModal from "../../../../components/modals/Confirm/index";
import styles from "../../styles";
import CheckboxIcon from "../../../../components/icons/checkbox";
import Paragraph from "../../../../components/text/Paragraph";
import WrapHeaderDialog from "./DialogHeader";
import DialogHeader from "./DialogHeader/DialogHeader";
import {idProp} from "../../../../lib/utils";
import {goBack, navigate} from "../../../../navigation/root";
import {DIALOG_ATTACHMENTS_SCREEN} from "../../../../constants/Vars";
import SearchMessage from "../SearchMessage";
import {fetchDialogAction} from "../../api";
import {
  reducer,
  initialState,
  menu,
  confirm,
  addUsers,
  deleteChat,
  info,
  actionUser,
  reset,
  editModal,
} from "./reducer";
import AddUsers from "./AddUsers";
import DialogInfo from "./DialogInfo";
import {MODAL_TIMING} from "../../../../constants/Layout";
import EditRoomModal from "../../../../components/modals/ChangeInfoConfirm";

const bottomActions = [DIALOG_DELETE, DIALOG_LEAVE, DIALOG_CLEAR];
const modalActions = [DIALOG_INFO, DIALOG_ATTACHMENTS, DIALOG_ADD_USERS, DIALOG_SEARCH_MSG];

function MessagesDialogHeader(props) {
  const {
    roomInfo, afterSelect, onSubmitSearch, closeSearch, refreshRoom,
    searchLoading, searchMsgOpen, openSearch,
  } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const haveCustomAvatar = roomInfo?.room?.image?.thumbs && roomInfo?.is_admin;

  const dismissConfirm = React.useCallback(() => {
    dispatch(reset());
  }, []);

  const handleSelect = React.useCallback(async ({action}) => {
    const {room_id: roomId} = roomInfo;
    if (bottomActions.includes(action)) {
      dispatch(menu(false));
      setTimeout(() => {
        dispatch(confirm(initialConfirm(action, roomId)));
      }, 40);
    } else if (modalActions.includes(action)) {
      // TODO: modals | screens of dialog
      switch (action) {
        case DIALOG_ATTACHMENTS:
          return navigate(DIALOG_ATTACHMENTS_SCREEN, {roomId});
        case DIALOG_SEARCH_MSG:
          return openSearch(true);
        case DIALOG_ADD_USERS:
          return dispatch(addUsers(true));
        case DIALOG_INFO:
          return dispatch(info(true));
        default:
          break;
      }
    } else {
      afterSelect(action);
    }
    // eslint-disable-next-line camelcase
  }, [roomInfo?.room_id]);

  const handleConfirmDelete = React.useCallback(async () => {
    let {action} = state.confirmOpen;
    const {id} = state.confirmOpen;
    if (state.deleteRoom) {
      action = DIALOG_DELETE;
    }
    dispatch(reset());
    await fetchDialogAction(action, {id});
    if (action === DIALOG_DELETE) {
      return goBack();
    }
    afterSelect(action);
  }, [state.confirmOpen, state.deleteRoom]);

  const deleteRoom = React.useCallback(() => {
    dispatch(deleteChat(!state.deleteRoom));
  }, [state.deleteRoom]);

  const closeAddUsers = React.useCallback(() => {
    dispatch(addUsers(false));
  }, []);

  const openMenu = React.useCallback(() => {
    dispatch(menu(true));
  }, []);

  const closeMenu = React.useCallback(() => {
    dispatch(menu(false));
  }, []);

  const closeInfo = React.useCallback(() => {
    dispatch(info(false));
  }, []);

  const openUserAction = React.useCallback((item) => {
    dispatch(info(false));
    setTimeout(() => {
      dispatch(actionUser(item));
    }, MODAL_TIMING);
  }, []);

  const closeUserAction = React.useCallback(() => {
    dispatch(actionUser(null));
    setTimeout(() => {
      dispatch(info(true));
    }, MODAL_TIMING);
  }, []);

  const afterselectUserAction = React.useCallback(({action}) => {
    const {user: {id: userId}} = state.actionModal;
    const params = {id: roomInfo.room_id};
    if (action === "kickUser") {
      params.userIds = userId;
    } else {
      params.userId = userId;
    }
    fetchUserAction(action, params, closeUserAction);
  }, [state.actionModal]);

  const openEditModal = React.useCallback((type) => {
    dispatch(info(false));
    setTimeout(() => {
      dispatch(editModal(type));
    }, MODAL_TIMING);
  }, []);

  const closeEditModal = React.useCallback(() => {
    dispatch(editModal(null));
    setTimeout(() => {
      dispatch(info(true));
    }, MODAL_TIMING);
  }, []);

  const afterFetch = React.useCallback(() => {
    refreshRoom();
    closeEditModal();
  }, [roomInfo?.room_id]);

  return (
    <React.Fragment>
      {!isEmpty(roomInfo) ? (
        <React.Fragment>
          <Dropdown
            onSelect={handleSelect}
            dismiss={closeMenu}
            open={state.menuOpen}
            options={modalOptions(roomInfo)} />
          <ConfirmModal
            visible={Boolean(state.confirmOpen)}
            dismiss={dismissConfirm}
            type={state.confirmOpen?.action}
            onConfirm={handleConfirmDelete}
            title={state.confirmOpen?.title}>
            <React.Fragment>
              {state.confirmOpen?.action === "leave" ? (
                <TouchableOpacity onPress={deleteRoom}>
                  <View style={styles.configRow}>
                    <CheckboxIcon
                      squared
                      checked={state.deleteRoom} />
                    <Paragraph
                      size={18}
                      style={styles.configRowLabel}>
                      Удалить беседу
                    </Paragraph>
                  </View>
                </TouchableOpacity>
              ) : null}
            </React.Fragment>
          </ConfirmModal>
        </React.Fragment>
      ) : null}
      <AddUsers
        houseId={roomInfo?.room?.house_id}
        roomId={roomInfo?.room_id}
        visible={state.addUsersOpen}
        dismiss={closeAddUsers} />
      <DialogInfo
        openEditModal={openEditModal}
        openAction={openUserAction}
        roomInfo={roomInfo}
        visible={state.infoOpen}
        dismiss={closeInfo} />
      <DropdownActionUser
        openAction={openUserAction}
        onSelect={afterselectUserAction}
        dismiss={closeUserAction}
        open={Boolean(state.actionModal)}
        options={modalOptionsUser(state.actionModal)} />
      <EditRoomModal
        typeAvatar="groupAvatar"
        afterFetch={afterFetch}
        canDeleteAva={haveCustomAvatar}
        roomId={roomInfo?.room_id}
        roomName={roomInfo?.room?.name}
        type={state.editRoom}
        dismiss={closeEditModal} />
      {searchMsgOpen ? (
        <SearchMessage
          searchLoading={searchLoading}
          onSubmitSearch={onSubmitSearch}
          dismiss={closeSearch} />
      ) : null}
      <WrapHeaderDialog>
        {roomInfo?.room ? (
          <DialogHeader
            openMenu={openMenu}
            item={roomInfo} />
        ) : null}
      </WrapHeaderDialog>
    </React.Fragment>
  );
}

MessagesDialogHeader.propTypes = {
  roomInfo: PropTypes.shape({
    room_id: idProp,
  }),
  afterSelect: PropTypes.func,
  onSubmitSearch: PropTypes.func,
  searchMsgOpen: PropTypes.bool,
  refreshRoom: PropTypes.func,
  closeSearch: PropTypes.func,
  openSearch: PropTypes.func,
  searchLoading: PropTypes.bool,
};

export default React.memo(MessagesDialogHeader);
