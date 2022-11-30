import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {View, TouchableOpacity, useWindowDimensions} from "react-native";
import {messageActions} from "../../../store/actions/messagesActions";
import styles from "./styles";
import Avatar from "../Avatar";
import FavMsg from "./FavoriteMessages";
import FavoriteFilledIcon from "../../icons/favoriteFilled";
import {idProp} from "../../../lib/utils";

function FavoriteList({data, fetchMessages, me}) {
  const {width} = useWindowDimensions();
  const myMsg = me?.id === data?.user?.id;

  const onPress = (msgID) => {
    fetchMessages({mode: "remove", ids: msgID});
  };

  return (
    <View
      style={[styles.root,
        {maxWidth: width, flexDirection: myMsg ? "row-reverse" : "row"},
      ]}>
      {!myMsg && (
        <Avatar
          size={40}
          room={data} />
      )}
      <View style={[styles.favMsgContainer, {maxWidth: width / 1.5}]}>
        <FavMsg
          myMsg={myMsg}
          data={data} />
      </View>
      <TouchableOpacity
        style={styles.favoriteToggler}
        onPress={() => onPress(data.id)}>
        <FavoriteFilledIcon />
      </TouchableOpacity>
    </View>
  );
}

FavoriteList.propTypes = {
  data: PropTypes.shape({
    id: idProp,
  }),
  fetchMessages: PropTypes.func.isRequired,
  me: PropTypes.shape({
    id: idProp,
  }),
};

const mapStateToProps = (store) => ({
  me: store.account,
});

export default connect(
  mapStateToProps,
  {fetchMessages: messageActions},
)(React.memo(FavoriteList));
