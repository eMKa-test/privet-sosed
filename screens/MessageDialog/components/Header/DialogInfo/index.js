import React from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import {
  View, Text, TouchableOpacity, ScrollView,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Modal from "react-native-modal";
import styles from "./styles";
import Header from "../../../../../components/header";
import CloseButton from "../../../../../components/buttons/close";
import {idProp} from "../../../../../lib/utils";
import Loader from "../../../../../components/loader";
import {
  initialState,
  reducer,
  loading,
  loadUsers,
  reset,
  getUsers,
  addUsers,
  btmLoading,
  renderTabs,
} from "./helpers";
import HeaderInfo from "./HeaderInfo";
import Paragraph from "../../../../../components/text/Paragraph";
import UserItem from "./UserItem";
import {MODAL_TIMING} from "../../../../../constants/Layout";
import {navigate} from "../../../../../navigation/root";
import {USER_PAGE_SCREEN} from "../../../../../constants/Vars";

const animationOutTiming = MODAL_TIMING / 1.6;

function DialogInfo(props) {
  const {
    visible, dismiss, roomInfo, openAction, openEditModal,
  } = props;
  const inset = useSafeAreaInsets();
  const isOwner = get(roomInfo, "is_owner", false);
  const isAdmin = get(roomInfo, "is_admin", false);

  const [tab, setTab] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState());

  React.useEffect(() => {
    if (visible) {
      dispatch(loading());
      getUsers({id: roomInfo?.room_id, p: 0}, (users) => {
        dispatch(loadUsers(users));
      });
    }
    return () => {
      dispatch(reset());
    };
  }, [show]);

  React.useEffect(() => {
    if (show) {
      dispatch(loading());
      getUsers({id: roomInfo?.room_id, p: 0, adminOnly: tab === 1}, (users) => {
        dispatch(loadUsers(users));
      });
    }
  }, [tab]);

  const changeTab = React.useCallback((idx) => {
    setTab(idx);
  }, []);

  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    if (state.loading) {
      return null;
    }
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const offset = Math.round(contentOffset.y);
    const height = Math.round(contentSize.height - layoutMeasurement.height);
    if (height === offset) {
      dispatch(btmLoading());
      getUsers({id: roomInfo?.room_id, p: state.p, adminOnly: tab === 1}, (users) => {
        dispatch(addUsers(users));
      });
    }
  }, [tab, state.p]);

  const modalRendered = React.useCallback(() => {
    setShow(true);
  }, []);

  const modalHided = React.useCallback(() => {
    setShow(false);
  }, []);

  const openUserPage = React.useCallback((userId) => {
    dismiss();
    setTimeout(() => {
      navigate(USER_PAGE_SCREEN, {userId});
    }, MODAL_TIMING);
  }, []);

  return (
    <Modal
      useNativeDriver
      isVisible={visible}
      style={[styles.modal, {
        marginTop: inset.top,
        marginBottom: inset.bottom > 0 ? inset.bottom : 20,
      }]}
      onModalShow={modalRendered}
      onModalHide={modalHided}
      animationInTiming={MODAL_TIMING}
      animationOutTiming={animationOutTiming}
      hideModalContentWhileAnimating
      onRequestClose={dismiss}
      onBackButtonPress={dismiss}
      onBackdropPress={dismiss}>
      <View style={styles.modalContent}>
        <Header
          isModal
          leftItem={(
            <View style={styles.modalHeader}>
              <CloseButton onPress={dismiss} />
              <Text style={styles.modalHeaderText}>Информация</Text>
            </View>
          )} />
        <View style={styles.modalBody}>
          <View style={styles.roomHeader}>
            <HeaderInfo
              openEditModal={openEditModal}
              isAdmin={roomInfo?.is_admin}
              room={roomInfo?.room}
              usersCount={roomInfo?.room?.users_cnt} />
          </View>
          <View style={styles.tabsContainer}>
            {renderTabs(roomInfo?.room?.type).map((el, idx) => (
              <TouchableOpacity
                key={el}
                style={[styles.tab, tab === idx && styles.activeTab]}
                onPress={() => changeTab(idx)}>
                <Paragraph
                  style={styles.tabButton}
                  noMargin
                  color="#1a1a1a"
                  size={15}>
                  {el}
                </Paragraph>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView
            onMomentumScrollEnd={onMomentumScrollEnd}>
            {state.loading
              ? (
                <Loader
                  active
                  containerStyle={styles.infoLoader} />
              ) : (
                <UserItem
                  openUserPage={openUserPage}
                  openAction={openAction}
                  isOwner={isOwner}
                  isAdmin={isAdmin}
                  p={state.p}
                  users={state.users} />
              )}
            {state.btmLoading ? (
              <Loader
                active
                containerStyle={styles.infoLoader} />
            ) : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

DialogInfo.propTypes = {
  visible: PropTypes.bool.isRequired,
  roomInfo: PropTypes.shape({
    room_id: idProp,
  }),
  dismiss: PropTypes.func.isRequired,
  openAction: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

export default React.memo(DialogInfo);
