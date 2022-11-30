import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";
import React from "react";
import * as PropTypes from "prop-types";
import {
  Alert, Image, KeyboardAvoidingView, Platform, ScrollView, View,
} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {connect} from "react-redux";
import styles from "./styles";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import {goBack} from "../../navigation/root";
import {idProp, imageSource} from "../../lib/utils";
import TextArea from "../../components/inputs/TextArea";
import Select from "../../components/inputs/Select";
import {
  reducer, initialState, beforeSubmitFormatDate, submitKeys, deleteVideoLink,
  INIT, LOAD_HOUSES, TEXT, SUBMITTING, DONE, POST_TYPE, ADD_FILE, REMOVE_FILE,
  HOUSE_SELECT, FILE_IDS, LOAD_TAGS, TAG_SELECT, TAG_IDS, LOAD_EDIT, REMOVE_EDIT_FILE, ADD_LINK_FILE,
  REMOVE_LINK_FILE, VIDEO_IDS,
} from "./helpers";
import {
  fetchHouses, fetchFiles, changePost, createPost, fetchTags,
} from "./api";
import Loader from "../../components/loader";
import DefaultButton from "../../components/buttons/default";
import PostType from "./PostType";
import AttachFile from "./AttachFile";
import FilesList from "./FilesList";
import TypeHelperSwitch from "./TypeHelperSwitch";
import MultipleSelect from "../../components/inputs/MultipleSelect";
import {EVENT_FINISH_TIME, EVENT_START_TIME} from "./Event/helpers";
import {POLL_FINISH_TIME} from "./Poll/helpers";
import {NEW_POST_PLACEHOLDER} from "../../constants/Vars";

const attachType = "new-post";
const Wrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

function NewPostScreen(props) {
  const {route, avatar} = props; // houseId
  const {houseId, parentRoute} = route.params || {};
  const [state, dispatch] = React.useReducer(reducer, initialState(route.params?.houseId), initialState);
  const inputRef = React.useRef();
  const typeHelperRef = React.useRef();
  const editMode = route?.params?.post;
  const headerTitle = {label: editMode ? "Редактирование записи" : "Новая запись"};

  const onFocus = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    dispatch({type: INIT});
    setTimeout(() => { // таймаут запроса из-за тормозов анимации перехода
      fetchFiles(houseId, (files) => {
        files.forEach((file) => {
          dispatch({type: ADD_FILE, file});
        });
        dispatch({type: DONE});
      });
      if (!houseId) {
        fetchHouses((houses) => {
          dispatch({type: LOAD_HOUSES, houses, withoutHouseId: editMode});
        });
      }
      if (state.tags.length < 1) {
        fetchTags((tagsList) => {
          dispatch({type: LOAD_TAGS, tagsList});
        });
      }
    }, 150);
    if (editMode) {
      dispatch({type: LOAD_EDIT, post: route?.params?.post});
    }
  }, [houseId]);

  useFocusEffect(onFocus);

  const navigation = useNavigation();

  const redirectBack = React.useCallback((params) => {
    if (typeof goBack === "function") {
      navigation.navigate(parentRoute, params);
    }
  }, []);

  const selectPostType = React.useCallback((postType) => {
    dispatch({type: POST_TYPE, postType});
  }, []);

  const afterUpload = React.useCallback((err, file, type) => {
    if (!err && file) {
      if (type === "link") {
        return dispatch({type: ADD_LINK_FILE, file});
      }
      dispatch({type: ADD_FILE, file});
    }
    if (err) {
      setTimeout(() => {
        Alert.alert("Ошибка", err);
      }, 300);
    }
  }, [state]);

  const removeFile = React.useCallback((fileId) => {
    dispatch({type: REMOVE_FILE, fileId});
  }, []);

  const removeOtherFile = React.useCallback((fileId, type) => {
    if (type === "link") {
      return deleteVideoLink({houseId, videoId: fileId}, (success) => {
        if (success) {
          dispatch({type: REMOVE_LINK_FILE, fileId});
        }
      });
    }
    dispatch({type: REMOVE_EDIT_FILE, fileId});
  }, []);

  const onHouseSelect = React.useCallback((id) => {
    dispatch({type: HOUSE_SELECT, id});
  }, []);

  const onTagSelect = React.useCallback((tagIds) => {
    dispatch({type: TAG_SELECT, tagIds});
  }, []);

  const changeText = React.useCallback((text) => {
    dispatch({type: TEXT, text});
  }, []);

  const submit = React.useCallback(() => {
    dispatch({type: SUBMITTING});
    let body = pick(state, submitKeys);
    const {
      files, tagIds, payload, editFiles, linkVideos,
    } = state;
    const {current: ref} = typeHelperRef;
    if (ref) {
      body = {...body, ...ref};
    }
    if (!isEmpty(files)) {
      body[FILE_IDS] = files.reduce((acc, f) => {
        if (f?.id) {
          return acc.concat(f.id);
        }
        return acc;
      }, []);
    }
    if (!isEmpty(linkVideos)) {
      body[VIDEO_IDS] = linkVideos.reduce((acc, f) => {
        if (f?.id) {
          return acc.concat(f.id);
        }
        return acc;
      }, []);
    }
    if (!isEmpty(tagIds)) {
      body[TAG_IDS] = tagIds.concat([]);
    }
    if (!isEmpty(payload)) {
      dispatch({type: DONE});
    }
    if ((EVENT_START_TIME in body) && (typeof (body[EVENT_START_TIME]) === "object")) {
      body[EVENT_START_TIME] = beforeSubmitFormatDate(body[EVENT_START_TIME]);
    }
    if ((EVENT_FINISH_TIME in body) && (typeof (body[EVENT_FINISH_TIME]) === "object")) {
      body[EVENT_FINISH_TIME] = beforeSubmitFormatDate(body[EVENT_FINISH_TIME]);
    }
    if ((POLL_FINISH_TIME in body) && (typeof (body[POLL_FINISH_TIME]) === "object")) {
      body[POLL_FINISH_TIME] = beforeSubmitFormatDate(body[POLL_FINISH_TIME]);
    }
    if (typeof body?.options === "object") {
      const formatOptions = [];
      for (const key in body.options) {
        if ({}.hasOwnProperty.call(body.options, key)) {
          formatOptions.push(body.options[key]);
        }
      }
      body.options = formatOptions;
    }
    if (editMode) {
      body.post_id = editMode?.id;
      if (!isEmpty(editFiles)) {
        const editFilesIds = editFiles.map((item) => item?.id);
        if (!isEmpty(files)) {
          body[FILE_IDS].push(...editFilesIds);
        } else {
          body[FILE_IDS] = editFilesIds;
        }
      }
    }
    const callbacks = [(msg) => {
      // onError
      Alert.alert(null, msg, [{
        onPress: () => dispatch({type: DONE}),
      }]);
    }, () => {
      // onSuccess
      dispatch({type: DONE});
      redirectBack({refresh: true});
    }];
    const fn = editMode ? changePost : createPost;
    if (typeof fn === "function") {
      fn(body, ...callbacks).catch(console.warn);
    }
  }, [state]);

  return (
    <Wrapper
      enabled
      behavior="padding"
      style={styles.root}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu active={headerTitle} />
        )} />
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              style={styles.avatar}
              source={imageSource(avatar)} />
            <View style={styles.input}>
              <TextArea
                initialValue={state?.text}
                inputRef={inputRef}
                placeholder={NEW_POST_PLACEHOLDER}
                placeholderColor="#BBBBBB"
                noBorders
                onInputChange={changeText} />
            </View>
          </View>
          <Loader
            containerStyle={styles.loader}
            active={state?.loading} />
          {state.houses?.length > 1 ? (
            <View style={styles.containerPadding}>
              <Select
                disabled={Boolean(editMode)}
                initialSelected={state?.id}
                afterSelect={onHouseSelect}
                label="Выберите дом"
                options={state.houses} />
            </View>
          ) : null}
          {state.tags?.length > 0 ? (
            <View style={styles.containerPadding}>
              <MultipleSelect
                initialSelected={state.tagIds}
                afterSelect={onTagSelect}
                disabled={state.tags?.length < 1 || state?.tagIds?.length > 2}
                label="Тематика"
                placeholder="Выберите тематику"
                options={state.tags} />
            </View>
          ) : null}
          <PostType
            initial={state?.type}
            afterSelect={selectPostType} />
          <TypeHelperSwitch
            initialValue={state?.editedPost}
            typeHelperRef={typeHelperRef}
            postType={state?.type} />
          <View style={styles.containerPadding}>
            <FilesList
              linkVideos={state?.linkVideos}
              editFiles={state?.editFiles}
              files={state?.files}
              afterDelete={removeFile}
              afterDeleteOther={removeOtherFile} />
          </View>
          <View style={styles.footer}>
            <AttachFile
              parentId={route.params?.houseId}
              afterUpload={afterUpload}
              type={attachType} />
            {state?.editedPost ? (
              <View style={styles.editPostButtonsContainer}>
                <DefaultButton
                  buttonTitleStyle={styles.cancelEditButtonTitle}
                  buttonStyle={styles.cancelEditButton}
                  fontSize={16}
                  title="Отмена"
                  onPress={goBack} />
                <DefaultButton
                  buttonStyle={styles.submitEditButton}
                  fontSize={16}
                  title="Сохранить"
                  onPress={submit} />
              </View>
            ) : (
              <DefaultButton
                buttonStyle={styles.submitButton}
                disabled={state?.submitting}
                fontSize={16}
                loading={state?.submitting}
                title="Добавить"
                onPress={submit} />
            )}
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
}

NewPostScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      houseId: idProp,
      post: PropTypes.shape({
        id: idProp,
        comment: PropTypes.arrayOf(PropTypes.object),
      }),
      parentRoute: PropTypes.string.isRequired,
    }),
  }),
  avatar: PropTypes.string,
};

const mapStateToProps = (state) => ({
  avatar: state.account?.avatar,
});

export default connect(mapStateToProps)(NewPostScreen);
