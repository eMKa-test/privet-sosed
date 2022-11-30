import React from "react";
import get from "lodash/get";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import likeComment from "../../../lib/api/activity/like-comment";
import {idProp} from "../../../lib/utils";
import LikesFilledIcon from "../../../components/icons/likesFilled";
import Paragraph from "../../../components/text/Paragraph";
import {COMMENT_GREY_COLOR, COMMENT_ORANGE_COLOR} from "../../../constants/Colors";

const LIKE = "LIKE";
const LOAD = "LOAD";

const likeCommentAsync = async (id, dispatch) => {
  let likes, liked;
  try {
    const res = await likeComment(id);
    likes = get(res, "likes_cnt", 0);
    liked = get(res, "liked", false);
  } finally {
    dispatch({type: LOAD, likes, liked});
  }
};

const initialState = (likes, liked) => ({likes, liked, disabled: false});

const reducer = (state, action) => {
  switch (action.type) {
    case LIKE:
      return {...state, disabled: true};
    case LOAD:
      return {
        ...state,
        disabled: false,
        likes: action.likes,
        liked: action.liked,
      };
    default:
      return state;
  }
};

function Likes(props) {
  const {commentId, likesCount = 0, liked = false} = props;
  const [state, dispatch] = React.useReducer(reducer, initialState(likesCount, liked));

  const handleLike = React.useCallback(() => {
    dispatch({type: LIKE});
    likeCommentAsync(commentId, dispatch);
  }, []);

  return (
    <TouchableOpacity
      disabled={state?.disabled}
      onPress={handleLike}>
      <View style={styles.rightSide}>
        <LikesFilledIcon active={state?.liked} />
        <Paragraph
          size={13}
          color={state?.liked ? COMMENT_ORANGE_COLOR : COMMENT_GREY_COLOR}
          noMargin>
          {` ${state.likes}`}
        </Paragraph>
      </View>
    </TouchableOpacity>
  );
}

Likes.propTypes = {
  commentId: idProp,
  likesCount: PropTypes.number,
  liked: PropTypes.bool,
};

export default React.memo(Likes, () => true);
