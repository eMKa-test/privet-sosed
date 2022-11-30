import React from "react";
import * as PropTypes from "prop-types";
import {Image, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import profileSetupStyles from "./styles";
import {imageSource} from "../../../lib/utils";
import {getMyAccount} from "../../../store/actions/accountActions";
import EditRoomModal from "../../../components/modals/ChangeInfoConfirm";

function Avatar(props) {
  const {imageSrc, fetchAccount} = props;
  const [type, openModal] = React.useState(null);

  const afterFetch = React.useCallback(() => {
    fetchAccount();
    openModal(null);
  }, [fetchAccount]);

  return (
    <View style={profileSetupStyles.avatar}>
      <TouchableOpacity onPress={() => openModal("image")}>
        <Image
          style={profileSetupStyles.avatarImage}
          source={imageSource(imageSrc)} />
      </TouchableOpacity>
      <EditRoomModal
        typeAvatar="userAvatar"
        afterFetch={afterFetch}
        type={type}
        dismiss={() => openModal(null)} />
    </View>
  );
}

Avatar.propTypes = {
  imageSrc: PropTypes.string,
  fetchAccount: PropTypes.func,
};

const mapStateToProps = (state) => ({
  imageSrc: state.account?.avatar,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchAccount: getMyAccount,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Avatar));
