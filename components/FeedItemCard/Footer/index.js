import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";
import {idProp} from "../../../lib/utils";
import Paragraph from "../../text/Paragraph";
import styles from "../styles";
import ViewsIcon from "../../icons/views";
import {COMMENTS, UNKNOWN_ERROR} from "../../../constants/Vars";
import CommentsIcon from "../../icons/comments";
import Likes from "./Likes";
import {navigate} from "../../../navigation/root";

const likesKeys = ["id", "likes_cnt", "is_liked"];

function Footer(props) {
  if (isEmpty(props?.data)) {
    return null;
  }

  const {data = {}} = props;

  const {
    views = UNKNOWN_ERROR, comments_cnt: comments = UNKNOWN_ERROR, id, type,
  } = data;

  const openComments = React.useCallback(() => {
    if (id) {
      navigate(COMMENTS, {postId: id, postType: type});
    }
  }, [id]);

  return (
    <View style={styles.footer}>
      <View style={styles.footerElement}>
        <Likes initialState={pick(data, likesKeys)} />
        <TouchableOpacity onPress={openComments}>
          <View style={styles.footerElement}>
            <CommentsIcon size={18} />
            <Paragraph style={styles.comments}>{comments}</Paragraph>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.footerElement}>
        <ViewsIcon />
        <Paragraph style={styles.viewsCount}>
          {views}
        </Paragraph>
      </View>
    </View>
  );
}

Footer.propTypes = {
  data: PropTypes.shape({
    id: idProp,
  }),
};

export default React.memo(Footer, () => true);
