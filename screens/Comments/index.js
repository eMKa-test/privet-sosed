import get from "lodash/get";
import React from "react";
import * as PropTypes from "prop-types";
import {
  FlatList, KeyboardAvoidingView, Platform, RefreshControl, View,
} from "react-native";
import {connect} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import {Divider} from "react-native-elements";
import Header from "../../components/header";
import HeaderMenu from "../../components/header/menu";
import {goBack} from "../../navigation/root";
import {idProp, keyExtractor} from "../../lib/utils";
import Loader from "../../components/loader";
import FirstLevelComment from "./FirstLevelComment";
import styles from "./styles";
import useComments, {FIRST_LVL} from "../../lib/hooks/useComments";
import {TRANSPARENT_REFRESH_CONFIG, WHITE} from "../../constants/Colors";
import MessageInput from "./MessageInput";
import RenderPostByType from "../../components/Post";
import getPost from "../../lib/api/activity/get-post";
import {
  initialState, reducer, pickHeaderTitle,
  REFRESH_CHILD, RESPONSE, BEFORE_RESPONSE, INPUT_FOCUS,
} from "./helpers";
import ConfirmModal from "../../components/modals/confirm";
import ConfirmModalContent from "../../components/modals/ConfirmModalContent";
import DropdownActionSheet from "../../components/actionSheets/Dropdown";
import Anchor from "../../components/dropdown/Anchor";
import useDropdown, {DROPDOWN, DELETE_ACTION, EDIT_ACTION} from "../../lib/hooks/useDropdown";
import {COMMENT, POST} from "../../constants/Vars";
import SinglePostCard from "./SinglePostCard";
import ListFooter from "./ListFooter";

const cb = () => {
};

const fetchSinglePost = async (postId, setPost) => {
  let post = null;
  try {
    post = await getPost(postId);
  } finally {
    setPost(post);
  }
};

const Wrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

function CommentsScreen(props) {
  const {myId} = props;
  const headerTitle = pickHeaderTitle(get(props, "route.params.postType"));
  const [post, setPost] = React.useState(null);
  const [comments, fetchNext, refresh] = useComments({
    id: get(props, "route.params.postId"),
    type: FIRST_LVL,
  });
  const [dropdown, dismiss, openDropdown, onDropdownSelect, onConfirmDelete, dropdownOptions, reset] = useDropdown();

  const [action, dispatch] = React.useReducer(reducer, initialState(), initialState);

  const onFocus = React.useCallback(() => {
    const postId = get(props, "route.params.postId");
    if (postId && !post) {
      fetchSinglePost(postId, setPost);
      fetchNext();
    }
  }, [props.route?.params, post]);

  useFocusEffect(onFocus);

  const changeActionByType = () => {
    switch (dropdown.abuseType) {
      case POST:
        return goBack;
      case COMMENT: {
        const {top_id: parentId} = dropdown.item;
        return parentId ? () => {
          dispatch({
            type: REFRESH_CHILD,
            parentId,
          });
        } : refresh;
      }
      default:
        return cb;
    }
  };

  const handleConfirmDelete = () => {
    const callback = changeActionByType();
    onConfirmDelete(callback);
  };

  const onSendMessage = React.useCallback(() => {
    if (action?.item?.id) {
      const {top_id: parentId, id} = action.item;
      if (parentId) {
        dispatch({
          type: REFRESH_CHILD,
          parentId,
        });
      } else {
        dispatch({
          type: REFRESH_CHILD,
          parentId: id,
        });
      }
    }
  }, [action]);

  const afterRefreshChild = React.useCallback(() => {
    dispatch({
      type: REFRESH_CHILD,
      parentId: null,
    });
  }, []);

  const onResponse = React.useCallback((comment) => {
    reset();
    dispatch({
      type: INPUT_FOCUS,
      inputFocus: true,
    });
    dispatch({
      type: BEFORE_RESPONSE,
      item: comment,
    });
    dispatch({
      type: RESPONSE,
      responseTo: comment,
    });
  }, []);

  const handleInputFocus = React.useCallback((inputFocus) => {
    dispatch({
      type: INPUT_FOCUS,
      inputFocus,
    });
  }, []);

  const handleResponseTo = React.useCallback((responseTo) => {
    dispatch({
      type: RESPONSE,
      responseTo,
    });
  }, []);

  const onPostDropdownPress = React.useCallback(() => {
    openDropdown(post, POST);
  }, [post]);

  return (
    <Wrapper
      enabled
      behavior="padding"
      style={styles.root}>
      <Header
        backArrow
        leftItem={(
          <HeaderMenu active={headerTitle} />
        )}
        rightItem={(
          <View style={styles.postDropdown}>
            <Anchor
              style={styles.headerAnchor}
              onPress={onPostDropdownPress}
              color={WHITE} />
          </View>
        )} />
      <FlatList
        refreshControl={(
          <RefreshControl
            tintColor={TRANSPARENT_REFRESH_CONFIG.tintColor}
            colors={TRANSPARENT_REFRESH_CONFIG.colors}
            style={TRANSPARENT_REFRESH_CONFIG.style}
            refreshing={false}
            onRefresh={refresh} />
        )}
        ListHeaderComponent={(
          <React.Fragment>
            {post ? (
              <SinglePostCard data={post}>
                <RenderPostByType
                  type={post?.type}
                  data={post} />
              </SinglePostCard>
            ) : null}
            {(comments?.refreshing) ? (
              <Loader
                containerStyle={styles.loader}
                active />
            ) : null}
            <Divider style={styles.postDivider} />
          </React.Fragment>
        )}
        data={comments.comments}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => (
          <Divider style={styles.commentDivider} />
        )}
        renderItem={({item}) => (
          <FirstLevelComment
            onResponse={onResponse}
            afterRefreshChild={afterRefreshChild}
            needRefresh={action?.parentId === item.id}
            comment={item}
            openDropdown={openDropdown} />
        )}
        ListFooterComponent={(
          <ListFooter
            loading={comments?.loading}
            fetchNext={fetchNext}
            canShowNext={!comments?.loading && (comments?.lastId !== -1) && !(comments?.lastCommentsLength < 10)} />
        )}
        ListFooterComponentStyle={styles.commentsFooterText} />
      <ConfirmModal
        visible={dropdown?.modal === DELETE_ACTION}
        dismiss={dismiss}
        onConfirm={handleConfirmDelete}
        title="Удаление комментария">
        <ConfirmModalContent headerActionText="Вы действительно хотите удалить свой комментарий?" />
      </ConfirmModal>
      <DropdownActionSheet
        open={dropdown?.modal === DROPDOWN}
        dismiss={dismiss}
        options={dropdownOptions(myId === get(dropdown, "item.user.id"))}
        onSelect={onDropdownSelect} />
      <MessageInput
        messageToEdit={(dropdown?.modal === EDIT_ACTION) && dropdown?.item}
        afterEdit={reset}
        onSendMessage={onSendMessage}
        responseTo={action?.responseTo}
        handleResponseTo={handleResponseTo}
        inputFocus={action?.inputFocus}
        handleInputFocus={handleInputFocus}
        postId={get(props, "route.params.postId")}
        refresh={refresh} />
    </Wrapper>
  );
}

CommentsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      postId: idProp,
    }),
  }),
  myId: idProp,
};

const mapStateToProps = (store) => ({
  myId: store.account?.id,
});

export default connect(mapStateToProps)(CommentsScreen);
