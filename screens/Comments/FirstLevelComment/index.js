import React, {useCallback} from "react";
import * as PropTypes from "prop-types";
import {Image, TouchableOpacity, View} from "react-native";
import get from "lodash/get";
import {Divider} from "react-native-elements";
import {idProp, imageSource} from "../../../lib/utils";
import styles from "./styles";
import Header from "../Header";
import Footer from "../Footer";
import Replies from "../Replies";
import {COMMENT, MESSAGE_WAS_DELETED, UNKNOWN_ERROR} from "../../../constants/Vars";
import {deletedUserIcon} from "../../../assets";
import Paragraph from "../../../components/text/Paragraph";
import {TEXT_GREY_COLOR} from "../../../constants/Colors";
import useComments, {SECOND_LVL} from "../../../lib/hooks/useComments";
import SecondLevelComment from "../SecondLevelComment";
import Loader from "../../../components/loader";
import ParsedContent from "../../../components/ParsedContent";
import AttachedImages from "../AttachedImages";
import AttachedFiles from "../../../components/AttachedFiles";
import redirectRoProfile from "../../../lib/redirectToProfile";
import ShowNext from "./ShowNext";
import RenderLink from "../../../components/RenderLink";
import HtmlTail from "../../../components/ParsedContent/Html";

function FirstLevelComment(props) {
  if (!props?.comment) {
    return null;
  }

  const {
    openDropdown, comment, afterRefreshChild, needRefresh, onResponse,
  } = props;

  const {
    id, user, created_time: createdTime, edited_time: editedTime, liked,
    last_comment_id: lastCommentId, likes_cnt: likesCount, last_user: lastUser, comments_cnt: commentsCount,
    is_deleted: isDeleted, media, files,
  } = comment;

  const [discussion, fetchNext, refresh] = useComments({
    id,
    type: SECOND_LVL,
  });
  const [discussionCount, setDiscussionCount] = React.useState(0);
  const linkInfo = get(comment, "attached_link", UNKNOWN_ERROR);

  React.useEffect(() => {
    setDiscussionCount(commentsCount);
  }, []);

  React.useEffect(() => {
    if (needRefresh) {
      refresh(afterRefreshChild);
    }
    if (discussionCount > 0 && discussionCount !== commentsCount) {
      setDiscussionCount(commentsCount);
      refresh(afterRefreshChild);
    }
    if (commentsCount > 0 && discussion.lastId === -1) {
      refresh(afterRefreshChild);
    }
  }, [needRefresh, commentsCount, lastCommentId]);

  const onDropdownPress = React.useCallback(() => {
    openDropdown(comment, COMMENT);
  }, [comment]);

  const handleFetchNext = React.useCallback(() => {
    fetchNext();
    if (discussion.lastId === -1) {
      refresh(afterRefreshChild);
    }
  }, [discussion?.id, afterRefreshChild]);

  const redirectToProfile = useCallback(() => redirectRoProfile(user?.id), [user?.id]);

  const {loading} = discussion;
  const hasLastId = discussion.lastId !== -1;

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.commentWrapper}
        disabled={isDeleted}
        onPress={redirectToProfile}
        onLongPress={onDropdownPress}>
        <Image
          style={styles.avatar}
          source={isDeleted ? deletedUserIcon : imageSource(user?.avatar)} />
        <View style={styles.commentBody}>
          {!isDeleted ? (
            <Header title={get(user, "title", "")} />
          ) : null}
          {!isDeleted ? (
            <React.Fragment>
              <ParsedContent data={comment} />
              <HtmlTail data={comment} />
              <RenderLink
                withPreview={false}
                delta={0}
                linkInfo={linkInfo} />
              <AttachedImages images={media} />
              <AttachedFiles files={files} />
            </React.Fragment>
          ) : (
            <Paragraph
              style={styles.deleteMessage}
              color={TEXT_GREY_COLOR}
              size={14}
              noMargin>
              {MESSAGE_WAS_DELETED}
            </Paragraph>
          )}
          <Footer
            onResponse={onResponse}
            comment={comment}
            createdTime={createdTime}
            editedTime={editedTime}
            liked={liked}
            likesCount={likesCount}
            isDeleted={isDeleted} />
        </View>
      </TouchableOpacity>
      <View style={styles.repliesSection}>
        {lastUser && (commentsCount > 0) && !loading && hasLastId && !(discussion?.comments?.length > 0) && (
          <Replies
            lastUserName={lastUser.title}
            commentsCount={commentsCount}
            fetchFirstComments={handleFetchNext} />
        )}
        {(discussion?.comments?.length > 0) && (
          <React.Fragment>
            {discussion.comments.map((c) => (
              <React.Fragment key={c.id}>
                <Divider style={styles.commentDivider} />
                <SecondLevelComment
                  comment={c}
                  onResponse={onResponse}
                  openDropdown={openDropdown} />
              </React.Fragment>
            ))}
            {!loading && hasLastId && !(discussion.lastCommentsLength < 10) ? (
              <ShowNext fetchNext={fetchNext()} />
            ) : null}
          </React.Fragment>
        )}
        <Loader
          containerStyle={styles.loader}
          active={discussion.loading} />
      </View>
    </View>
  );
}

FirstLevelComment.propTypes = {
  comment: PropTypes.shape({
    id: idProp,
    is_deleted: PropTypes.bool,
    user: PropTypes.shape({
      title: PropTypes.string,
      avatar: PropTypes.string,
    }),
    html: PropTypes.string,
    created_time: PropTypes.string,
    edited_time: PropTypes.string,
    last_comment_id: idProp,
    liked: PropTypes.bool,
    likes_cnt: PropTypes.number,
    last_user: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({
      title: PropTypes.string,
    })]),
    comments_cnt: PropTypes.number,
    media: PropTypes.arrayOf(PropTypes.shape({
      id: idProp,
      name: PropTypes.string,
    })),
    files: PropTypes.arrayOf(PropTypes.shape({
      id: idProp,
      name: PropTypes.string,
    })),
  }),
  openDropdown: PropTypes.func,
  afterRefreshChild: PropTypes.func,
  onResponse: PropTypes.func,
  needRefresh: PropTypes.bool,
};

export default React.memo(FirstLevelComment);
