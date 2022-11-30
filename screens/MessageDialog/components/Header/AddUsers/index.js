import React from "react";
import * as PropTypes from "prop-types";
import Modal from "react-native-modal";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {
  View, Text, FlatList, TouchableOpacity,
} from "react-native";
import {Divider} from "react-native-elements";
import styles from "./styles";
import CloseButton from "../../../../../components/buttons/close";
import Header from "../../../../../components/header";
import DismissKeyboard from "../../../../../components/DismissKeyboard";
import SearchInput from "../../../../../components/SearchSection";
import {idProp, keyExtractor} from "../../../../../lib/utils";
import {
  getUsers,
  addUsers,
  inviteNewUsers,
  reducer,
  initialState,
  loadUsers,
  loading,
  selectUsers,
  onSearch,
  reset,
} from "./helpers";
import UserCard from "./UserCard";
import Loader from "../../../../../components/loader";

function AddUsers(props) {
  const inset = useSafeAreaInsets();
  const {
    visible, dismiss, roomId, houseId,
  } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState());

  React.useEffect(() => {
    if (visible && houseId) {
      getUsers({room_id: roomId, houseId, p: 0}, (users) => {
        dispatch(loading());
        dispatch(loadUsers(users));
      });
    }
    return () => {
      dispatch(reset());
    };
  }, [visible]);

  const onSelect = React.useCallback((id) => {
    dispatch(selectUsers(id));
  }, []);

  const filterUsers = React.useCallback((q) => {
    dispatch(onSearch(q));
  }, []);

  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    if (state.loading) {
      return null;
    }
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const offset = Math.round(contentOffset.y);
    const height = Math.round(contentSize.height - layoutMeasurement.height);
    if (height === offset) {
      dispatch(loading());
      getUsers({room_id: roomId, houseId, p: state.p}, (users) => {
        dispatch(addUsers(users));
      });
    }
  }, []);

  const onSubmitRoom = React.useCallback(() => {
    inviteNewUsers({id: roomId, userIds: state.selectUsers}).then(() => {
      dismiss();
    });
  }, [state.selectUsers]);

  return (
    <DismissKeyboard>
      <Modal
        isVisible={visible}
        style={[styles.modal, {
          marginTop: inset.top,
          marginBottom: inset.bottom > 0 ? inset.bottom : 20,
        }]}
        animationType="fade"
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
                <Text style={styles.modalHeaderText}>Выбор собеседника</Text>
              </View>
            )} />
          <SearchInput onChange={filterUsers} />
          <FlatList
            data={state.q ? state.filteredUsers : state.users}
            keyExtractor={keyExtractor}
            onMomentumScrollEnd={onMomentumScrollEnd}
            ListFooterComponent={state.loading && state.users?.length > 0 ? (
              <Loader
                active
                containerStyle={styles.usersLoader} />
            ) : null}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            renderItem={({item}) => (
              <UserCard
                user={item?.user}
                checked={state.selectUsers.includes(item?.user?.id)}
                onPress={onSelect} />
            )} />
          <View style={styles.userListCreatePanel}>
            <TouchableOpacity
              onPress={onSubmitRoom}
              disabled={!state.canSubmit}
              style={[styles.userListCreateRoomButton, !state.canSubmit && styles.disabled]}
              activeOpacity={0.8}>
              <Text style={styles.userListCreateRoomButtonText}>Добавить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </DismissKeyboard>
  );
}

AddUsers.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  roomId: idProp,
  houseId: idProp,
};

export default React.memo(AddUsers);
