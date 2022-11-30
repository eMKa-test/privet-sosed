import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {Divider} from "react-native-elements";
import styles from "./styles";
import SearchSection from "../../components/SearchSection";
import Select from "../../components/inputs/Select";
import {keyExtractor} from "../../lib/utils";
import UserCard from "./UserCard";
import ListHeader from "./ListHeader";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import {
  SET_SELECTED,
  LOAD_HOUSES,
  SELECT_HOUSE,
  LOAD_USERS,
  HOUSES_LOADING,
  USERS_LOADING,
  ON_SEARCH,
  RESET,
  reducer,
  fetchHouses,
  initialState,
  fetchUsers, SET_ROOM_NAME,
} from "./helpers";
import {MESSAGES} from "../../constants/Vars";
import createRoom from "../../lib/api/chat-manage/create";
import {navigate} from "../../navigation/root";
import Loader from "../../components/loader";

const Wrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;
const headerTitle = {label: "Создание беседы"};

function CreateRoomScreen() {
  const [state, dispatch] = React.useReducer(reducer, initialState(), initialState);

  const onPress = React.useCallback((id) => {
    dispatch({type: SET_SELECTED, id});
  }, []);

  const onChangeRoomName = React.useCallback((roomName) => {
    dispatch({type: SET_ROOM_NAME, roomName});
  }, []);

  const onFocusScreen = React.useCallback(() => {
    dispatch({type: HOUSES_LOADING});
    fetchHouses((houses) => {
      dispatch({type: LOAD_HOUSES, houses});
    });
  }, []);

  useFocusEffect(onFocusScreen);

  const afterSelectHouse = React.useCallback((houseId) => {
    if (state.houseId === houseId) {
      return null;
    }
    dispatch({type: SELECT_HOUSE, houseId});
  }, [state.houseId]);

  React.useEffect(() => {
    if (!state.houseId) {
      return;
    }
    dispatch({type: USERS_LOADING});
    fetchUsers({
      houseId: state.houseId,
    }, (users) => {
      dispatch({type: LOAD_USERS, users});
    });
  }, [state.houseId]);

  const onSearchInput = React.useCallback((text) => {
    dispatch({type: ON_SEARCH, q: text});
  }, []);

  const onSubmitRoom = async () => {
    const newRoomParams = {
      title: state.roomName,
      userIds: state.selected,
      id: state.houseId,
    };
    try {
      const {id} = await createRoom(newRoomParams);
      dispatch({type: RESET});
      navigate(MESSAGES, {newRoomId: id});
    } catch (e) {
      Alert.alert(null, "Ошибка создания комнаты, попробуйте позже");
    }
  };

  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
    const delta = Math.round(contentOffset.y - (contentSize.height - layoutMeasurement.height));
    if (delta < -1 || state.usersLoading) {
      return null;
    }
    dispatch({type: USERS_LOADING});
    fetchUsers({
      houseId: state.houseId,
      fromId: state.fromId,
    }, (users) => {
      dispatch({type: LOAD_USERS, users});
    });
  }, [state.limit, state.houseId, state.fromId]);

  return (
    <Wrapper
      enable
      behavior="padding"
      style={{flex: 1}}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu active={headerTitle} />
                )} />
      <View style={styles.searchSection}>
        <Select
          disabled={state.houses.length === 0}
          afterSelect={afterSelectHouse}
          extendStyleForm={styles.selectHouse}
          options={state.houses}>
          {state.houses.length === 0 ? (
            <Text style={styles.roomModalNoHouses}>Нет доступных домов</Text>
          ) : null}
          {state.houses.length > 0 && !state.houseId ? (
            <Text style={styles.roomSelectDefault}>Выберите адрес</Text>
          ) : null}
        </Select>
        <SearchSection
          load={state.usersLoading}
          secondaryLoad={state.housesLoading}
          onChange={onSearchInput}
          extendStyles={styles.searchHouseInput} />
      </View>
      <FlatList
        style={{backgroundColor: "#f6f7fb"}}
        data={state.q ? state.filteredUsers : state.users}
        keyExtractor={keyExtractor}
        ListHeaderComponent={(
          <ListHeader
            len={state.users.length}
            loading={state.usersLoading} />
                )}
        ListFooterComponent={state.usersLoading && state.users.length > 0 ? (
          <Loader
            active
            containerStyle={styles.usersLoader} />
        ) : null}
        ItemSeparatorComponent={() => <Divider style={styles.userCardDivider} />}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({item: {user}}) => (
          <UserCard
            status={user.online}
            avatar={user.avatar}
            id={user.id}
            title={user.title}
            checked={state.selected.includes(user.id)}
            onPress={onPress} />
        )} />
      <View style={[styles.userListCreatePanel]}>
        <TextInput
          editable={state.selected.length > 1}
          placeholderTextColor="#565656"
          onChangeText={onChangeRoomName}
          value={state?.roomName}
          style={styles.userListCreatePanelRoomName}
          placeholder={state.selected.length > 1 ? "Введите название беседы" : ""} />
        <TouchableOpacity
          onPress={onSubmitRoom}
          disabled={!state.canSubmit}
          style={[styles.userListCreateRoomButton, !state.canSubmit && styles.disabled]}
          activeOpacity={0.8}>
          <Text style={styles.userListCreateRoomButtonText}>Начать беседу</Text>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
}

CreateRoomScreen.propTypes = {};

export default CreateRoomScreen;
