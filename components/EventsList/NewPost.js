import React from "react";
import * as PropTypes from "prop-types";
import {Image, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import styles from "./styles";
import {idProp, imageSource} from "../../lib/utils";
import Paragraph from "../text/Paragraph";
import {navigate} from "../../navigation/root";
import {NEW_POST} from "../../constants/Vars";
import Loader from "../loader";

function NewPost(props) {
  const {
    avatar, houseId, parentRoute, loading,
  } = props;

  const createPost = React.useCallback(() => {
    navigate(NEW_POST, {houseId, parentRoute});
  }, []);

  return (
    <View style={styles.newPost}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={imageSource(avatar)} />
        <TouchableOpacity
          style={styles.content}
          onPress={createPost}>
          <Paragraph
            noMargin
            color="#BBBBBB">
            Привет, сосед! Что нового?
          </Paragraph>
        </TouchableOpacity>
        {loading ? (
          <Loader
            containerStyle={{height: 20}}
            small
            active />
        ) : null}
      </View>
    </View>
  );
}

NewPost.propTypes = {
  avatar: PropTypes.string,
  houseId: idProp,
  parentRoute: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  avatar: state.account?.avatar,
});

export default connect(mapStateToProps)(React.memo(NewPost));
