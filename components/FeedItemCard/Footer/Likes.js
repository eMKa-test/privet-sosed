import React from "react";
import get from "lodash/get";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import styles from "../styles";
import LikesIcon from "../../icons/likes";
import Paragraph from "../../text/Paragraph";
import likePost from "../../../lib/api/activity/like-post";
import {idProp} from "../../../lib/utils";

const LIKE = "LIKE";
const LOAD = "LOAD";

const likePostAsync = async (id, dispatch) => {
  let likes, liked;
  try {
    const res = await likePost(id);
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
  const {id, likes_cnt: likes = 0, is_liked: liked = false} = props.initialState;
  const [state, dispatch] = React.useReducer(reducer, initialState(likes, liked));

  const handleLike = React.useCallback(() => {
    dispatch({type: LIKE});
    likePostAsync(id, dispatch);
  }, []);

  return (
    <TouchableOpacity
      disabled={state?.disabled}
      onPress={handleLike}>
      <View style={styles.footerElement}>
        <LikesIcon
          size={18}
          filled={state?.liked} />
        <Paragraph style={styles.likes}>{state.likes}</Paragraph>
      </View>
    </TouchableOpacity>
  );
}

Likes.propTypes = {
  initialState: PropTypes.shape({
    id: idProp,
    likes_cnt: PropTypes.number,
    is_liked: PropTypes.bool,
  }),
};

export default React.memo(Likes, () => true);
