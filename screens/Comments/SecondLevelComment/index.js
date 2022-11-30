import React, {useCallback} from "react";
import * as PropTypes from "prop-types";
import {Image, TouchableOpacity, View} from "react-native";
import get from "lodash/get";
import {idProp, imageSource} from "../../../lib/utils";
import {COMMENT, MESSAGE_WAS_DELETED, UNKNOWN_ERROR} from "../../../constants/Vars";
import styles from "./styles";
import Header from "../Header";
import Footer from "../Footer";
import {deletedUserIcon} from "../../../assets";
import Paragraph from "../../../components/text/Paragraph";
import {TEXT_GREY_COLOR} from "../../../constants/Colors";
import ParsedContent from "../../../components/ParsedContent";
import AttachedImages from "../AttachedImages";
import AttachedFiles from "../../../components/AttachedFiles";
import RenderLink from "../../../components/RenderLink";
import redirectRoProfile from "../../../lib/redirectToProfile";

function SecondLevelComment(props) {
  if (!props?.comment) {
    return null;
  }

  const {comment, openDropdown, onResponse} = props;
  const {
    user, parent, created_time: createdTime, edited_time: editedTime,
    liked, likes_cnt: likesCount, is_deleted: isDeleted, parent_id: parentId,
    top_id: postId, images, files,
  } = props?.comment;
  const linkInfo = get(comment, "attached_link", UNKNOWN_ERROR);

  const onDropdownPress = React.useCallback(() => {
    openDropdown(comment, COMMENT);
  }, [comment]);

  const repliesTo = React.useCallback(() => {
    if ((parentId !== postId) && parent?.user?.title) {
      return `ответил ${get(parent, "user.title", "")}`;
    }
    return "";
  }, []);

  const redirectToProfile = useCallback(() => redirectRoProfile(user?.id), [user?.id]);

  return (
    <TouchableOpacity
      style={styles.root}
      disabled={isDeleted}
      onPress={redirectToProfile}
      onLongPress={onDropdownPress}>
      <Image
        style={styles.avatar}
        source={isDeleted ? deletedUserIcon : imageSource(user?.avatar)} />
      <View style={styles.commentBody}>
        <Header
          title={get(user, "title", "")}
          repliesTo={repliesTo()}
          isDeleted={isDeleted}
          onDropdownPress={onDropdownPress} />
        {!isDeleted ? (
          <React.Fragment>
            <ParsedContent data={comment} />
            <RenderLink
              withPreview={false}
              delta={0}
              linkInfo={linkInfo} />
            <AttachedImages images={images} />
            <AttachedFiles files={files} />
          </React.Fragment>
        ) : (
          <Paragraph
            color={TEXT_GREY_COLOR}
            size={14}
            noMargin>
            {MESSAGE_WAS_DELETED}
          </Paragraph>
        )}
        <Footer
          onResponse={onResponse}
          comment={comment}
          isDeleted={isDeleted}
          createdTime={createdTime}
          editedTime={editedTime}
          liked={liked}
          likesCount={likesCount} />
      </View>
    </TouchableOpacity>
  );
}

SecondLevelComment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      title: PropTypes.string,
      avatar: PropTypes.string,
    }),
    html: PropTypes.string,
    created_time: PropTypes.string,
    edited_time: PropTypes.string,
    liked: PropTypes.bool,
    likes_cnt: PropTypes.number,
    last_user: PropTypes.shape({
      title: PropTypes.string,
    }),
    comments_cnt: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.shape({
      id: idProp,
      name: PropTypes.string,
    })),
    files: PropTypes.arrayOf(PropTypes.shape({
      id: idProp,
      name: PropTypes.string,
    })),
  }),
  openDropdown: PropTypes.func,
  onResponse: PropTypes.func,
};

export default React.memo(SecondLevelComment);
